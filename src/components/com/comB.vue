<template>
  <div class="cont-b">
    <div>组件B</div>
  </div>
</template>
<script>
import { findComponentUpward } from "../../utils/assist.js";
export default {
  name: "comB",
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    const comA = findComponentUpward(this, "comA");
    if (comA) {
      console.log("this is comB:" + comA.name);
    }
  }
};
</script>
<style lang='less' scoped>
.cont-b {
  padding: 15px;
  background-color: #8dd2fa;
}
</style>
