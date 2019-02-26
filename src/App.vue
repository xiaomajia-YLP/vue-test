<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/test">Test</router-link>|
      <router-link to="/user">User</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data(){
    return {
      userInfo: {}
    }
  },
  provide() {
    return {
      app: this
    }
  },
  methods: {
    getUserInfo(){
    this.userInfo = {
      id: '10129',
      name: '小马甲',
      gender: '0',
      pic: 'http://img.mp.sohu.com/upload/20170801/e0b1ca9516344dcfbb90d6456fbbefd1_th.png',
    }
  },
  },
  mounted() {
    this.getUserInfo()
  },
}
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
