<!-- 单独使用的CheckBox -->
<template>
  <label>
    <span>
      <input
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="handleChange"
      />
    </span>
    <slot></slot>
  </label>
</template>
<script>
import Emitter from '../../mixins/emitter.js';

export default {
  name: "xCheckbox",
  mixins: [Emitter],
  props: {
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
      currentValue: this.value
    };
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw 'Value should be trueValue or falseValue.';
      }
    }
  },
  methods: {
    handleChange(event) {
      if (this.disabled) {
        return false;
      }

      const checked = event.target.checked;
      this.currentValue = checked;
      
      const value = checked ? this.trueValue : this.falseValue;
      this.$emit("on-change", value);
      this.$emit("input", value);

      // 在 change 事件触发时，向 Form 派发一个事件，即可使用 Form 组件来做数据校验
      this.dispatch("xFormItem", "on-input-change", value);
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    }
  }
};
</script>
<style lang='less' scoped>
</style>
