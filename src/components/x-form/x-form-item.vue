<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Emitter from "../../mixins/emitter.js";
import AsyncValidator from "async-validator";
export default {
  name: "iFormItem",
  mixins: [Emitter],
  inject: ["form"],
  props: {
    // 单个表单组件的标签文本
    label: {
      type: String,
      default: ""
    },
    // 对应表单域 Form 组件 model 里的字段
    prop: {
      type: String
    }
  },
  data() {
    return {
      validateState: "", // 校验状态
      validateMessage: "" // 校验不通过时的提示信息
    };
  },
  computed: {
    // 从表单数据对象中获取 当前input的数据
    fieldValue() {
      return this.form.model[this.prop];
    }
  },
  // 组件渲染时，将实例缓存到form中
  mounted() {
    // 若没有传入prop，则无需校验，也就不用缓存
    if (this.prop) {
      this.dispatch("xForm", "on-form-item-add", this);
    }
    this.setRules();
  },
  // 组件销毁时，将实例从缓存中移除
  beforeDestroy() {
    this.dispatch("xForm", "on-form-item-remove", this);
  },
  methods: {
    // 监听 input 的change/blur事件
    setRules() {
      this.$on("on-input-change", this.onFieldChange);
      this.$on("on-input-blur", this.onFieldBlur);
    },
    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    getRules() {
      let rules = this.form.rules;
      rules = rules ? rules[this.prop] : [];
      return [].concat(rules || []);
    },
    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilterdRule(trigger) {
      const rule = this.getRules();
      return rule.filter(
        rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = function() {}) {
      let rule = this.getFilterdRule(trigger);

      if (!rule || rule.length === 0) {
        return true;
      }

      // 设置状态为校验中
      this.validateState = "校验中...";

      // 以下为 async-validator 库的调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";

        callback(this.validateMessage);
      });
    },
    onFieldChange() {
      this.validate("change");
    },
    onFieldBlur() {
      this.validate("blur");
    }
  }
};
</script>