<template>
  <div> 组件B</div>
</template>
<script>
  export default {
    name: 'comB',
    provide: {
      name: 'Spencer Reid'
    },
    inject: ['nick'],
    mounted() {
      console.log('B----'+this.nick);
      this.$on('on-message', this.showMessage);
    },
    methods: {
      showMessage (text) {
        console.log(text);
      }
    },
  }
</script>
<style lang='less' scoped>
</style>
