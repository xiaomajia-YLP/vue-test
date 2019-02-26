<template>
  <div class='app-container'>
    <img
      :src="app.userInfo.pic"
      class="user-pic"
      alt=""
    >
    <div class="user-name">{{app.userInfo.name}}</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        users: {}
      }
    },
    inject: ['app'],
    methods: {
      functionName (params) {
        
      }
    },
    mounted() {
      this.users = this.app.userInfo
    },
  }
</script>
<style lang='less' scoped>
.user-pic {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}
.user-name {
  font-size: 16px;
  line-height: 1;
  padding: 10px 0;
}
</style>
