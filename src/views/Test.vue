<template>
  <div>
    <heading level="1">这是一个title1</heading>
    <heading level="2">这是一个title2</heading>
    <heading level="3">这是一个title3</heading>
    <heading level="4">这是一个title4</heading>
    <heading level="5">这是一个title5</heading>
    <heading level="6">这是一个title6</heading>
  </div>
</template>
<script>
import box from "../components/render/render.js";
import heading from "../components/render/heading.js";
export default {
  data() {
    return {
      is_show: true
    };
  },
  components: {
    box,
    heading
  },
  methods: {}
};
</script>
<style lang='less' scoped>
</style>

