<template>
  <i :class="`iconfont icon-${icon}`"></i>
</template>
<script>
  import { oneOf } from '../../utils/common.js';
  let arr = ['check-circle', 'info-circle', 'left-circle', 'down-circle','right-circle', 'up-circle','warning-circle', 'location','user', 'bell','cloud-download', 'search',]
  export default {
    props: {
      icon: {
        validator(value){
          return oneOf(value, arr)
        },
        value: 'default'
      }
    }
  }
</script>
<style lang='less' scoped>
@import "./x-icon.less";

.icon-check-circle:before {
  content: "\e77d";
}

.icon-info-circle:before {
  content: "\e77e";
}

.icon-left-circle:before {
  content: "\e77f";
}

.icon-down-circle:before {
  content: "\e780";
}

.icon-right-circle:before {
  content: "\e783";
}

.icon-up-circle:before {
  content: "\e785";
}

.icon-warning-circle:before {
  content: "\e786";
}

.icon-location:before {
  content: "\e790";
}

.icon-user:before {
  content: "\e7ae";
}

.icon-bell:before {
  content: "\e7c4";
}

.icon-cloud-download:before {
  content: "\e7d9";
}

.icon-search:before {
  content: "\e8ef";
}
</style>
