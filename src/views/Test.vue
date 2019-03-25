<template>
  <div>
    <button>alert1</button>
    <button>alert2</button>

    <x-display></x-display>
  </div>
</template>
<script>
import xDisplay from "../components/x-alert/x-alert";


export default {
  data() {
    return {
      code: defaultCode
    };
  },
  components: {
    xDisplay
  },
  methods: {}
};
</script>

