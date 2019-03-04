<template>
  <div class="cont-c">
    <div>组件C</div>
    <com-a></com-a>
  </div>
</template>
<script>
import comA from "./comA";
import { findComponentDownward } from "../../utils/assist.js";
export default {
  name: "comC",
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: {
    comA
  },
  mounted() {
    const comA = findComponentDownward(this, "comA");
    if (comA) {
      console.log("this is comC:"+comA.name);
    }
  }
};
</script>
<style lang='less' scoped>
.cont-c {
  padding: 15px;
  background-color: #fd8fd8;
}
</style>
