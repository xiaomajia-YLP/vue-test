function broadcast(componentName, eventName, params) {
  // 遍历当前组件的所有子组件
  this.$children.forEach(child => {
    const name = child.$options.name;
    if (name === componentName) {
      // 找到满足条件的组件，在该组件上触发事件
      child.$emit.apply(child, [eventName].concat(params));
      // child.$emit(eventName, params)
    } else {
      // 未找到，寻找下一级子组件
      broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}

export default {
  methods: {
    // 父级向下广播事件
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
    // 子级向上派发事件
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }
  }
};
