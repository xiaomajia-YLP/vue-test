<template>
  <div class="cont-a">
    <div>组件A</div>
    <com-b></com-b>
  </div>
</template>
<script>
import comB from "./comB";
export default {
  name: "comA",
  props: {},
  data() {
    return {
      name: "Spencer Reid"
    };
  },
  methods: {
    sayHi() {
      console.log("component-a: function sayhi");
    }
  },
  components: {
    comB
  }
};
</script>
<style lang='less' scoped>
.cont-a {
  padding: 15px;
  background-color: #f3d490;
}
</style>
