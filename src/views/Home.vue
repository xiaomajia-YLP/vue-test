<template>
  <ul class="puzzle-warp">
    <li
      :class="{'puzzle': true, 'puzzle-empty': !puzzle}"
      v-for="(puzzle, index) in puzzles"
      :key="index"
      v-text="puzzle"
    ></li>
  </ul>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      puzzles: Array.from({ length: 15 }, (value, index) => index + 1)
    }
  },

}
</script>
<style lang="less" scoped>
ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.puzzle-warp {
  width: 360px;
  height: 360px;
  background-color: #ccc;
}
.puzzle {
  width: 90px;
  height: 90px;
  float: left;
  border: 1px solid #999;
  background-color: rgb(241, 180, 65);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

