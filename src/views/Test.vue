<template>
  <div class="container">
    <x-button size="default" color="warn" @click="test()">修改</x-button>
    <x-button disabled></x-button>
  </div>
</template>
<script>
import xButton from '../components/x-button/x-button';
export default {
  data() {
    return {
      obj: {
        a: 1
      }
    };
  },
  methods: {
      test(){
          this.obj.a = 3
          this.obj.a = 2
          
      }
  },
  components: {
    xButton
  },
  watch: {
    obj: {
      handler: function(newVal, oldVal) {
        console.log(newVal.a);
      },
      deep: true, // 如果不加 deep: true，我们只能监听 obj 的改变，并不会触发handler回调
      immediate: true
      // 添加 immediate: true 配置，其会立即以 obj 的当前值触发回调
      // 不加只会打印2,3,4,5...  加了之后1,2,3,4,5...
    }
  }
};
</script>
<style lang="less" scoped>
</style>