<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        @change="handleChange"
        v-model="model"
      />
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :value="currentValue"
        @change="handleChange"
      />
    </span>
    <slot></slot>
  </label>
</template>
<script>
import { findComponentUpward } from "../../utils/assist.js";
import Emitter from "../../mixins/emitter.js";

export default {
  name: "xCheckbox",
  mixins: [Emitter],
  props: {
    label: {
      type: [String, Number, Boolean]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data() {
    return {
      model: [],
      group: false,
      parent: null,
      currentValue: this.value
    };
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw "Value should be trueValue or falseValue.";
      }
    }
  },
  methods: {
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    },
    handleChange(event) {
      if (this.disabled) {
        return false;
      }

      const checked = event.target.checked;
      this.currentValue = checked;

      const value = this.checked ? this.trueValue : this.falseValue;
      this.$emit("input", value);

      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit("on-change", value);
        // 在 change 事件触发时，向 Form 派发一个事件，即可使用 Form 组件来做数据校验
        this.dispatch("xFormItem", "on-input-change", value);
      }
    }
  },
  mounted() {
    // 判断父级是否有 CheckboxGroup 组件
    this.parent = findComponentUpward(this, "xCheckboxGroup");

    if (this.parent) {
      this.group = true;
    }

    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }
  }
};
</script>
<style lang='less' scoped>
</style>
