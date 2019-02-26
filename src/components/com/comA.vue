<template>
<div class="box">
  <div class="item">44444</div>
  <div class="item">44444</div>
  <div class="item">44444</div>
  <div class="item">44444</div>
</div>
</template>
<script>
  export default {
    inject: ['nick'],
    mounted() {
      console.log('A----'+this.nick);
      
    },
  }
</script>
<style lang='less' scoped>
</style>
