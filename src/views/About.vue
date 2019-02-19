<template>
  <div class="about">
    <ul
      ref="list"
      id="list"
    >
      <li
        v-for="(item, i) in arr"
        :key="i"
      >{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data: function () {  
    return {
      arr: []
    }
  },
  methods: {
    // 方法一： async await
    async getData(){
      this.arr = [1,2,3];
      await this.$nextTick();
      this.$refs.list.getElementsByTagName('li')[0].innerHTML = 'hello';
    },
    // // 方法二： nextTick callback
    // getData(){
    //   this.arr = [1,2,3]
    //   this.$nextTick(()=>{
    //     this.$refs.list.getElementsByTagName('li')[0].innerHTML = 'hello';
    //   })
    // },
    // // 方法三： MutationObserver 
    // getData(){
    //   // 传入回调函数进行实例化
    //   var observer = new MutationObserver(mutations => {
    //     mutations.forEach((mutation, i) => {
    //       console.log(mutation);
    //       mutation.addedNodes[0].textContent = '------'+ i +'------'
    //     })
    //   });
    //   // 选择目标节点
    //   var target = document.querySelector('#list');
    //   // 配置观察选项
    //   var config = { 
    //     attributes: false, // 是否观察属性的变动
    //     childList: true, // 是否观察子节点的变动（指新增，删除或者更改）
    //     characterData: false // 是否观察节点内容或节点文本的变动
    //   };
    //   // 传入目标节点和观察选项
    //   observer.observe(target, config);
    //   this.arr = [1,2,3]
    //   // 停止观察
    //   // observer.disconnect();
    // }
  },
  mounted() {
    this.getData()
  },
}
</script>
<style lang="less" scoped>
li {
  text-align: left;
}
</style>

