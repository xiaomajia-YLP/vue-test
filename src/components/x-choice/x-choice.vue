<template>
  <label>
    <input class="choice" v-if="group" type="checkbox" :disabled="disabled" :value="label" @change="handleChange" v-model="model" />
    <input class="choice" v-else type="checkbox" :disabled="disabled" :value="currentValue" @change="handleChange" />
    <span class="c_label">
      <slot></slot>
    </span>
  </label>
</template>
<script>
import { findComponentUpward } from "../../utils/assist.js";
// import Emitter from "../../mixins/emitter.js";

export default {
  name: "xChoicebox",
  // mixins: [Emitter],
  props: {
    imgClass: {
      type: String,
      default: ''
    },
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
        // this.dispatch("xFormItem", "on-input-change", value);
      }
    }
  },
  mounted() {
    // 判断父级是否有 CheckboxGroup 组件
    this.parent = findComponentUpward(this, "xChoiceboxGroup");

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
label {
  position: relative;
  display: inline-block;
}
.c_label {
  width: 100%;
  height: 100%;
  display: inline-block;
}
.choice {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
}
.choice + .c_label {
  background-color: #ddd;
  color: #333;
}
.choice:checked + .c_label {
  background-color: rgb(177, 15, 241);
  color: #fff;
}
</style>
