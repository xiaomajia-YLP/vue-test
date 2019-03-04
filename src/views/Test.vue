<template>
  <div class='app-container'>
    <x-form
      :model="formValidate"
      :rules="ruleValidate"
      ref="form"
    >
      <x-form-item
        label="用户名"
        prop="name"
      >
        <x-input v-model="formValidate.name"></x-input>
      </x-form-item>
      <x-form-item
        label="邮箱"
        prop="email"
      >
        <x-input v-model="formValidate.email"></x-input>
      </x-form-item>
      <x-form-item
        label="密码"
        prop="password1"
      >
        <x-input
          v-model="formValidate.password1"
          type="password"
        ></x-input>
      </x-form-item>
      <x-form-item
        label="地址"
        prop="address"
      >
        <x-input v-model="formValidate.address"></x-input>
      </x-form-item>
      <x-form-item
        class="form-button"
      >
        <x-button
          color="success"
          icon="check-circle"
          @on-click="handleSubmit"
        >提交</x-button>
        <x-button
          color="default"
          icon="info-circle"
          @click.native="handleReset"
        >重置</x-button>
      </x-form-item>
    </x-form>

  </div>
</template>
<script>
import xFormItem from "../components/x-form/x-form-item";
import xForm from "../components/x-form/x-form";
import xInput from "../components/x-input/x-input";
import xButton from "../components/x-button/x-button";

export default {
  data() {
    return {
      formValidate: {
        name: "",
        email: ""
      },
      ruleValidate: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        password1: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { min: 6, max: 13, message: "长度在 6 到 13 个字符", trigger: "blur" }
        ],
        address: [
          { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    xForm,
    xFormItem,
    xInput,
    xButton
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validated(valid => {
        if (valid) {
          console.log("验证通过");
        } else {
          console.error("表单校验失败");
        }
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
<style lang='less' scoped>
.form-button {
  justify-content: center;
}
</style>
