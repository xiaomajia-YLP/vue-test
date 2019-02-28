<template>
  <div class='app-container'>
    <x-form
      :model="formValidate"
      :rules="ruleValidate"
    >
      <x-form-item
        label="用户名"
        prop="name"
      >
        <x-input></x-input>
      </x-form-item>
    </x-form>
  </div>
</template>
<script>
import xForm from "../components/x-form/x-form";
import xFormItem from "../components/x-form/x-form-item";
import xInput from "../components/x-input/x-input";

export default {
  data() {
    return {
      formValidate: {},
      ruleValidate: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    xForm,
    xFormItem,
    xInput
  },
  methods: {}
};
</script>
<style lang='less' scoped>
</style>
