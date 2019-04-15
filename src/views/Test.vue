<template>
  <div class='app-container'>
    <x-checkbox-group v-model="hobby">
      <x-checkbox class="checkbox" label="电影">电影</x-checkbox>
      <x-checkbox class="checkbox" label="动漫">动漫</x-checkbox>
      <x-checkbox class="checkbox" label="绘画">绘画</x-checkbox>
    </x-checkbox-group>
  </div>
</template>
<script>
import xCheckbox from "../components/x-choice/x-choice";
import xCheckboxGroup from "../components/x-choice/x-choice-group";

export default {
  data() {
    return {
      hobby:[]
    };
  },
  components: {
    xCheckbox,
    xCheckboxGroup
  },
  methods: {
    handleSubmit() {

    },
    handleReset() {
    }
  }
};
</script>
<style lang='less' scoped>
.form-button {
  justify-content: center;
}
.checkbox {
  vertical-align: middle;
  line-height: 34px;
  margin-right: 5px;
  width: 50px;
}
</style>

