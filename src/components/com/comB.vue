<template>
  <div class="container">
    <button @click="increase()">组件B button</button>
    <p>count: {{count}}</p>
    <p>finalDeg: {{finalDeg}}</p>
  </div>
</template>
<script>
export default {
  name: "comB",
  props: {},
  data() {
    return {
      // num: 1,
      // deg: 180,
      count: 0,
      finalDeg: 0
    };
  },
  methods: {
    increase() {
      this.$EventBus.$emit("increased", {
        // num: this.num,
        // deg: this.deg
      });
    }
  },
  created() {},
  mounted() {
    this.$EventBus.$on("decreased", ({ num, deg }) => {
      this.$nextTick(() => {
        this.count -= num;
        this.finalDeg -= deg;
      });
    });
  }
};
</script>
<style lang="less" scoped>
</style>