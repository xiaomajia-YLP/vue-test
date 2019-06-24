<template>
  <div class="container">
    <button @click="decrease()">组件A button</button>
  </div>
</template>
<script>
export default {
  name: "comA",
  props: {},
  data() {
    return {
      num: 1,
      deg: 180
    };
  },
  methods: {
    decrease(){
      this.$EventBus.$emit('decreased', {
        num: this.num,
        deg: this.deg
      })
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
</style>