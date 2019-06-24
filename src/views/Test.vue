<template>
  <div class="container">
    <p>firstName: {{ firstName }}</p>
    <p>lastName: {{ lastName }}</p>
    <p>fullName: {{ fullName }}</p>
    <p>computed name: {{ name }}</p>
    <br />
    <button @click="rename()">add</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      firstName: "Spencer",
      lastName: "Reid",
      fullName: ""
    };
  },
  methods: {
    rename() {
      this.name = "Derek Morgan";
    }
  },
  components: {},
  computed: {
    name: {
      get: function() {
        return `${this.firstName} ${this.lastName}`;
      },
      set: function(val) {
        let _name = val.split(' ');
        [this.firstName, this.lastName] = _name
      }
    }
  },
  watch: {
    firstName(val) {
      this.fullName = `${val} ${this.lastName}`;
    },
    lastName: {
      handler: function (newVal, oldVal) {
        this.fullName = `${this.firstName} ${newVal}`
      },
      immediate: true,
      deep: true,
    }
  }
};
</script>
<style lang="less" scoped>
</style>