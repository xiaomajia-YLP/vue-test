<template>
  <div>
    <ul class="puzzle-warp">
      <li
        :class="{'puzzle': true, 'puzzle-empty': !puzzle}"
        v-for="(puzzle, index) in puzzles"
        :key="index"
        v-text="puzzle"
      ></li>
    </ul>
    <button class="puzzle-reset-btn">重置游戏</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import utils from '../utils/utils.js'
console.log(utils);

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
  methods: {
    // 重置，随机乱序
    resetPuzzle(){
      let arr = utils.shuffle(this.puzzles)
      arr.push('')
      this.puzzles = arr
    },
    // 设置数组的值
    setPuzzle(index, num){
      let curNum = this.puzzles[index]
            
      this.$set(this.puzzles, index + num, curNum)
      this.$set(this.puzzles, index, '')
    },
    // 移动滑块
    move(index){
      let puzzles = this.puzzles

      // 获取点击位置上下左右的值
      let left = this.puzzles[index - 1],
          right = this.puzzles[index + 1],
          top = this.puzzles[index - 4],
          bottom = this.puzzles[index + 4]

      // 和为空的位置交换
      if (left === '' && index % 4) {
        this.setPuzzle(index, -1)
      } else if (right === '' && 3 !== index % 4) {
        this.setPuzzle(index, 1)
      } else if (top === '') {
        this.setPuzzle(index, -4)
      } else if (bottom === '') {
        this.setPuzzle(index, 4)
      }
    },
    // 判断是否成功
    judgeSuccess(){
      let puzzles = this.puzzles;
      if (puzzles[15] === '') {
        let newPuzzles = puzzles.slice(0, 15)
        let isPass = newPuzzles.every((v, i)=>{
          return v === i + 1
        })
        if (isPass) {
          alert('congratulations!')
        }
      }

    }
  },
  created() {
  },
  mounted() {
    this.resetPuzzle()
  },
}
</script>
<style lang="less" scoped>
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.puzzle-warp {
  width: 360px;
  height: 360px;
  border: 1px solid #999;
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
.puzzle-empty {
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3) inset;
  background-color: #efefef;
}
.puzzle-reset-btn {
  width: 90%;
  height: 40px;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>

