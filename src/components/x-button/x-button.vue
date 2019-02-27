<template>
  <button
    :class="'x-button x-button-size-'+size +' x-button-'+color"
    :disabled="disabled"
    @click="handleClick"
  >
    <x-icon :icon="icon"></x-icon>
    <slot>按钮</slot>
  </button>
</template>
<script>
  import { oneOf } from '../../utils/common.js';
  import xIcon from '../x-icon/x-icon.vue';
  export default {
    props: {
      size: {
        validator(value){
          return oneOf(value, ['small', 'default', 'large']);
        },
        default: 'default'
      },
      color: {
        validator(value){
          return oneOf(value, ['default', 'primary', 'danger', 'warn', 'success']);
        },
        default: 'default'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        value: ''
      }
    },
    methods: {
      handleClick(event){
        console.log(222222);
        
        this.$emit('on-click', event)
      }
    },
    components: {
      xIcon
    }
  }
</script>
<style lang='less' scoped>
.x-button {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  -ms-touch-action: manipulation; /* 用于指定某个给定的区域是否允许用户操作,以及如何响应用户操作(比如浏览器自带的划动、缩放等) */
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  -webkit-user-select: none; /* 是否允许用户选中文本 */
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  color: #515a6e;
  background-color: #fff;
  border-color: #dcdee2;
}
.x-button:disabled {
  opacity: 0.5;
}
.x-button-default:disabled {
  background-color: #e6e6e6;
}
.x-button-size-small {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
.x-button-size-large {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
.x-button-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.x-button-danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
}
.x-button-warn {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
.x-button-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
</style>
