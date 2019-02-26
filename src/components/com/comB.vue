<template>
  <div> </div>
</template>
<script>
  export default {
    provide: {
      name: 'Spencer Reid'
    },
    inject: ['nick'],
    mounted() {
      console.log('B----'+this.nick)
    },
  }
</script>
<style lang='less' scoped>
</style>
