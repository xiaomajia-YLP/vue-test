<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>
      <input type="text" v-model="firstName" >
      <br>
      <br>
      <input type="text" v-model="lastName" >
      <br>
      <br>
      <input type="text" v-model="others" >
      <br>
      <br>
      <span>{{ fullName }}</span>
      <br>
      <br>
      <span>{{ fullName2 }}</span>
    </div>
  </div>
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
      firstName: '',
      lastName: '',
      fullName2: '',
      others: ''
    }
  },
  
  // 使用 computed
  computed: {
    fullName() {
      console.log(111111111111);
      
      return this.firstName + ' ' + this.lastName
    }
  },
  
  // 使用 watch
  watch: {
    firstName: function(newVal, oldVal) {
      console.log(222222222222222);
      
      this.fullName2 = newVal + ' ' + this.lastName;
    },
    lastName: function(newVal, oldVal) {
      console.log(333333333333333);
      
      this.fullName2 = this.firstName + ' ' + newVal;
    },
  }
}
</script>
