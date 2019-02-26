<template>
  <div class="container">
    <!-- button -->
    <x-button size="default" color="warn" @on-click="handleClick()" >
      <x-icon icon="search"></x-icon>
      搜索
    </x-button>
    <!-- ref -->
    <com-a ref="box"></com-a>
    <com-b></com-b>
  </div>
</template>
<script>
import xButton from '../components/x-button/x-button';
import xIcon from '../components/x-icon/x-icon';
import comA from '../components/com/comA';
import comB from '../components/com/comB';
export default {
  data() {
    return {
      title: 'Test.vue的title'
    };
  },
  methods: {
    handleClick(){
      console.log(1111111111);
    },
    
  },
  components: {
    xButton,
    xIcon,
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
    const box = this.$refs.box;
  },
};
</script>
<style lang="less" scoped>
</style>