<template>
  <div>
    <h3>动态渲染 .vue 文件的组件—— Display</h3>

    <x-display :code="code"></x-display>
  </div>
</template>
<script>
import xDisplay from "../components/x-display/x-display";
import defaultCode from "./default-code.js";

// import Vue from 'vue';
// const AlertComponent = Vue.extend({
//   template: '<div>{{message}}</div>',
//   data(){
//     return {
//       message: 'xiaomajia'
//     }
//   }
// })

// // const component = new AlertComponent({ el: '#app' })
// const component = new AlertComponent().$mount();
// // console.log(component);

// document.body.appendChild(component.$el)

export default {
  data() {
    return {
      code: defaultCode
    };
  },
  components: {
    xDisplay
  },
  methods: {}
};
</script>

