<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "xFrom",
  props: {
    // 表单控件绑定的数据对象
    model: {
      type: Object
    },
    // 表单验证规则
    rules: {
      type: Object
    }
  },
  provide() {
    return {
      form: this
    };
  },
  data() {
    return {
      fields: [] // 缓存所有 FormItem 实例
    };
  },
  created() {
    // form-item 组件渲染时，将实例缓存到form中
    this.$on("on-form-item-add", field => {
      if (field) this.fields.push(field);
    });
    // form-item 组件销毁时，将实例从缓存中移除
    this.$on("on-form-item-remove", field => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  methods: {}
};
</script>

