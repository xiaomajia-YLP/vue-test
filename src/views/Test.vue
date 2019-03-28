<template>
  <div>
    <x-component :render="render"></x-component>
  </div>
</template>
<script>
import xComponent from "../components/functionalRender/x-component.vue";
export default {
  data() {
    return {
      render: h => {
        return h(
          "div",
          {
            style: {
              color: "red"
            }
          },
          "自定义内容"
        );
      }
    };
  },
  components: {
    xComponent
  },
  methods: {}
};
</script>
<style lang='less' scoped>
</style>

