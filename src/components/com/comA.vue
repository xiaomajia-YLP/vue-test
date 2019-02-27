<template>
<div class="box" @click="handleClick">组件A</div>
</template>
<script>
  export default {
    name: 'comA',
    inject: ['nick'],
    mounted() {
      console.log('A----'+this.nick);
    },
    methods: {
      handleClick(){
        
      }
    },
  }
</script>
<style lang='less' scoped>
</style>
