<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">User</router-link>|
      <router-link to="/game">Game</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/form">Form</router-link>|
      <router-link to="/test">Test</router-link>
    </div>
    <div id="nav">
      <router-link to="/display">Display</router-link><!-- |
      <router-link to="/game">Game</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/form">Form</router-link>|
      <router-link to="/test">Test</router-link> -->
    </div>
    <router-view />
  </div>
</template>
<script>
import mixins_user from './mixins/user.js';
export default {
  mixins: [mixins_user],
  data(){
    return {
    }
  },
  provide() {
    return {
      app: this
    }
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
  padding-top: 20px;
}
#nav {
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
