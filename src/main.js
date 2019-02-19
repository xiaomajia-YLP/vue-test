import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 如果是非线上环境:
if (process.env.NODE_ENV !== 'production') {
  // 加载 VConsole
  var VConsole = require('vconsole/dist/vconsole.min.js');
  var vConsole = new VConsole();
  // 使用 performance 开启性能追踪
  Vue.config.performance = true; 
}

// Vue.config.errorHandler = function (err, vm, info) {
//   let { 
//       message, // 异常信息
//       name, // 异常名称
//       script,  // 异常脚本url
//       line,  // 异常行号
//       column,  // 异常列号
//       stack  // 异常堆栈信息
//   } = err;
//   console.error('异常信息:'+name+ ':' +message);
//   console.error('line:'+line+',column:'+column);
//   console.error('info:'+info);
  
//   // vm为抛出异常的 Vue 实例
//   // info为 Vue 特定的错误信息，比如错误所在的生命周期钩子
// }
// Vue.prototype.$throw = function (error) {
//   errorHandler(error,this)
// };

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')