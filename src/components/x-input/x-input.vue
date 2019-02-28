<template>
  <input
    :type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>
<script>
import Emitter from "../../mixins/emitter.js";
export default {
  name: "xInput",
  mixins: [Emitter],
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    }
  },
  methods: {
    handleInput(e) {
      const value = e.target.value;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('xFormItem', 'on-input-change', value);
    },
    handleBlur(e) {
      this.dispatch('xFormItem', 'on-input-blur', this.currentValue);
    }
  }
};
</script>
<style lang='less' scoped>
</style>
