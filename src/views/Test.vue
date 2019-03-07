<template>
  <div>
    <!-- <com-c></com-c> -->
  </div>
</template>
<script>
import comC from "../components/com/comC";

import Vue from 'vue';
const AlertComponent = Vue.extend({
  template: '<div>{{message}}</div>',
  data(){
    return {
      message: 'xiaomajia'
    }
  }
})

const component = new AlertComponent().$mount();
console.log(component);

document.body.appendChild(component.$el)


export default {
  data() {
    return {};
  },
  components: {
    comC
  },
  methods: {}
};
</script>
<style lang='less' scoped>
</style>
