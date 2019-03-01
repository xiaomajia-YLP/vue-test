<template>
  <input
    :type="type"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
    class="x-input"
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
.x-input {
    display: inline-block;
    width: 100%;
    height: 28px;
    line-height: 1.2;
    padding: 2px 7px;
    font-size: 14px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}
</style>
