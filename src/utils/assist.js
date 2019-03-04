// 找到任意组件实例——findComponents 系列方法
// xmj 2019.03.04


/**
 * 由一个组件，向上找到最近的指定组件
 * @param {*} context 当前组件
 * @param {String} componentName 指定组件名称
 * @returns 
 */
function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }

  return parent;
}



/**
 * 向上找到所有的指定组件
 * findComponentsUpward的使用场景较少，一般只用在递归组件里(只有递归组件的父级才是自身)
 * @param {*} context 当前组件
 * @param {String} componentName 指定组件名称
 * @returns {Array}
 */
function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return []
  }
}


/**
 * 向下找到最近的指定组件
 * @param {*} context 当前组件
 * @param {String} componentName 指定组件名称
 * @returns 
 */
function findComponentDownward(context, componentName) {
  let children = context.$children;
  let theChild = null;
  if (children.length) {
    for (const child of children) {
      const name = child.$options.name;
      if (name === componentName) {
        theChild = child;
        break;
      } else {
        theChild = findComponentDownward(child, componentName);
        if (theChild) break;
      }
    }
  }
  return theChild
}


/**
 * 向下找到所有指定的组件
 * @param {*} context 当前组件
 * @param {String} componentName 指定组件名称
 * @returns {Array} 
 */
function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChild = findComponentsDownward(child, componentName);
    components.concat(foundChild);
  }, [])
}



/**
 * 找到指定组件的兄弟组件
 * @param {*} context 当前组件
 * @param {*} componentName 目标组件名称
 * @param {boolean} [exceptMe=true] 是否排除自身
 * @returns
 */
function findBrotherComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  })
  // 排除自身
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

export {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentsDownward,
  findBrotherComponents
};