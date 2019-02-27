<template>
  <div class="container">
    <!-- button -->
    <button @click="handleClick">触发事件</button>
    <!-- ref -->
    <com-a ref="box"></com-a>
    <com-b @on-click="test"></com-b>
  </div>
</template>
<script>
import comA from '../components/com/comA';
import comB from '../components/com/comB';

import Emitter from '../mixins/emitter.js';

export default {
  mixins: [Emitter],
  name: 'test',
  data() {
    return {
      title: 'Test.vue的title'
    };
  },
  methods: {
    handleClick(){
      console.log(22222222222);
      this.broadcast('comB', 'on-message', '111', '222');
    },
    test(...msg){
      console.log(msg);
    }
  },
  components: {
    comA,
    comB
  },
  provide:{
    nick: 'JJ'
  },
  watch: {
    // obj: {
    //   handler: function(newVal, oldVal) {
    //     console.log(newVal.a);
    //   },
    //   deep: true, // 如果不加 deep: true，我们只能监听 obj 的改变，并不会触发handler回调
    //   immediate: true
    //   // 添加 immediate: true 配置，其会立即以 obj 的当前值触发回调
    //   // 不加只会打印2,3,4,5...  加了之后1,2,3,4,5...
    // }
  },
  mounted() {
    
    
  },
};
</script>
<style lang="less" scoped>
</style>