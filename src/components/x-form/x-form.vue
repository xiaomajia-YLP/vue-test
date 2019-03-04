<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "xForm",
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
  methods: {
    // 公开方法：全部重置数据
    resetFields() {
      this.fields.forEach(field => {
        field.resetField();
      });
    },
    // 公开方法：全部校验数据，支持 Promise
    validated(callback) {
      return new Promise(reslove => {
        
        let valid = true;
        let count = 0;

        this.fields.forEach(field => {
          field.validate("", errors => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
              // 全部完成
              reslove(valid);
              if (typeof callback === "function") {
                callback(valid);
              }
            }
          });
        });
      });
    }
  },
  created() {
    console.log("--- x-form: created ---");
    // form-item 组件渲染时，将实例缓存到form中
    this.$on("on-form-item-add", (field) => {
      if (field) this.fields.push(field);
    });
    // form-item 组件销毁时，将实例从缓存中移除
    this.$on("on-form-item-remove", (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  mounted() {
    console.log("--- x-form: mounted ---");
  }
};
</script>

