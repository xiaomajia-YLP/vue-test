<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
import { findComponentsDownward } from "../../utils/assist.js";
import Emitter from "../../mixins/emitter.js";

export default {
  name: "xCheckboxGroup",
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentValue: this.value,
      children: []
    };
  },
  watch: {
    value(val) {
      this.updateModel(true);
    }
  },
  methods: {
    updateModel(update) {
      this.children = findComponentsDownward(this, "xCheckbox");
      if (this.children) {
        const { value } = this;
        this.children.forEach(child => {
          child.model = value;
          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            child.group = true;
          }
        });
      }
    },
    change(data) {
      this.currentValue = data;
      this.$emit("on-change", data);
      this.$emit("input", data);
      this.dispatch("xFormItem", "on-input-change", data);
    }
  },
  mounted() {
    this.updateModel(true);
  }
};
</script>
<style lang='less' scoped>
</style>
