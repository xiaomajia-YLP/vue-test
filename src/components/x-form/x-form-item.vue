<template>
  <div class="x-form-item">
    <label
      v-if="label"
      :class="{ 'x-form-item-label-required': isRequired, 'x-form-item-label': true }"
    >{{ label }}</label>
    <div>
      <slot></slot>
      <div
        v-if="validateState === 'error'"
        class="x-form-item-message"
      >{{ validateMessage }}</div>
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
      isRequired: false, // 是否为必填
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
  methods: {
    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    getRules() {
      let rules = this.form.rules;
      rules = rules ? rules[this.prop] : [];
      return [].concat(rules || []);
    },

    // 监听 input 的change/blur事件
    setRules() {
      const rules = this.getRules();

      if (rules.length) {
        rules.every(rule => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required;
        });
      }

      this.$on("on-input-change", this.onFieldChange);
      this.$on("on-input-blur", this.onFieldBlur);
    },

    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilterdRule(trigger) {
      const rule = this.getRules();
      return rule.filter(
        rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },

    // 重置数据
    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      this.form.model[this.prop] = this.initialValue;
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
  },
  // 组件渲染时，将实例缓存到form中
  mounted() {
    // 若没有传入prop，则无需校验，也就不用缓存
    console.log("---------- x-form-item: mounted ------------");

    if (this.prop) {
      console.log("x-form-item ===" + this.prop);
      this.dispatch("xForm", "on-form-item-add", this);

      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue;

      this.setRules();
    }
  },
  // 组件销毁时，将实例从缓存中移除
  beforeDestroy() {
    this.dispatch("xForm", "on-form-item-remove", this);
  }
};
</script>
<style lang="less" scoped>
.x-form-item {
  display: flex;
  align-items: center;
  line-height: 1;
  margin-bottom: 10px;
}
.x-form-item-label {
  margin-right: 5px;
  min-width: 80px;
  text-align: right;
}
.x-form-item-label-required:before {
  content: "*";
  color: red;
}
.x-form-item-message {
  color: red;
}
</style>
