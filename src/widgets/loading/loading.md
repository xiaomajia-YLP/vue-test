## vue 插件介绍

### 1. 插件与组件

在讲解插件之前，我们首先来了解下 vue 插件和组件的关系，在我们的 vue 项目中我们使用组件的频率往往会大于插件：

在没有封装组件之前，如果不使用第三方插件，那么很多情况下我们会编写几个常用的组件来提供给页面使用，如 Alert/Loading 组件，而你可能需要在很多页面中引入并且通过 components 注册组件，但是像这样使用率很高的组件一般我们希望全局注册后直接就可以在相应页面使用，因此我们需要将他们封装成插件，比如像 vux 这样的 ui 组件库，即提供了组件功能也提供了某些全局注册的插件。

用一句话简单概括两者的关系就是：插件可以封装组件，组件可以暴露数据给插件。

### 2. 插件分类

vue 插件的编写方法一般分为 4 类，主要注册与绑定机制如下：

```javascript
export default {
  install(Vue, options) {

    // 1. 添加全局方法或属性，如: vue-custom-element
    Vue.myGlobalMethod = function () {
      // 逻辑...
    }

    // 2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // 逻辑...
      }
      // ...
    })

    // 3. 通过全局 mixin 方法添加一些组件选项，如: vuex
    Vue.mixin({
      created: function () {
      // 逻辑...
      }
      // ...
    })

    // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
    Vue.prototype.\$myMethod = function (options) {
      // 逻辑...
    }
  }
}
```

上方代码使用了 es6 部分语法列出了 4 种编写插件的方法，而 install 是注册插件主要调用的方法，包含了两个参数（Vue 实例和自定义配置属性 options），我们可以将以上代码存储到 plugins.js 中。

### 3. 插件使用

在 plugins.js 中我们仅仅编写了一个插件的空壳子，假如现在需要全局注册该插件，我们可以在入口文件，比如 main.js 中注册：

```javascript
import Vue from "vue";
import MyPlugin from "./plugins/plugins.js";

Vue.use(MyPlugin);
```

通过全局方法 Vue.use() 即可使用该插件，其自动会调用 install 方法。Vue.use 会自动阻止注册相同插件多次，届时只会注册一次该插件。

## vue 插件编写方法

上述我们提到了编写插件的 4 种方法，接下来我们对其一一进行讲解：

### 1. 添加全局方法或属性

```javascript
export default {
  install(Vue, options) {
    Vue.$myName = "劳卜";
  }
};
```

在 install 方法中，我们直接在 Vue 实例上声明了$myName 属性并进行了赋值，当该插件注册后只要存在 Vue 实例的地方你都可以获取到 Vue.\$myName 的值，因为其直接绑定在了 Vue 实例上。

### 2. 添加全局资源

```javascript
export default {
  install(Vue, options) {
    Vue.directive("focus", {
      bind: function() {}, // 当绑定元素插入到 DOM 中。
      inserted: function(el, binding, vnode, oldVnode) {
        // 聚焦元素
        el.focus();
      },
      update: function() {},
      componentUpdated: function() {},
      unbind: function() {}
    });
  }
};
```

添加全局资源包含了添加全局的指令／过滤器／过渡等，上方代码我们通过 Vue.directive()添加了一个全局指令 v-focus，其主要包含了 5 种方法，其中 inserted 代表当绑定元素插入到 DOM 中执行，而 el.focus()代表聚焦绑定的元素，这样如果我们在一个 input 输入框上绑定该指令就会自动进行 focus 聚焦。

其他 directive 提供的方法及用途可以参考：vue 自定义指令

### 3. 添加全局 mixin 方法

```javascript
export default {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        greetingFn() {
          console.log("greeting");
        }
      }
    });
  }
};
```

mixin 代表混合的意思，我们可以全局注册一个混合，其会影响注册之后创建的每个 Vue 实例，上方代码注册后会在每个组件实例中添加 greetingFn 方法，在单文件组件中可以直接通过 this.greetingFn()调用。当然如果实例中存在同名方法，则 mixin 方法中创建的会被覆盖，同时 mixin 对象中的钩子将在组件自身钩子之前调用。

### 4. 添加实例方法

```javascript
export default {
  install(Vue, options) {
    Vue.prototype.$myName = "劳卜";
    Vue.prototype.showMyName = value => {
      console.log(value);
    };
  }
};
```

添加实例方法是最常用的一种方法，其直接绑定在 vue 的原型链上，我们可以回想一下 JS 里的类的概念。实例方法可以在组件内部，通过 this.\$myMethod 来调用。

###5. 插件封装组件

上方 4 点只讲解了插件自身的 4 中编写方法，并没有涉及组件的内容，如果我们要在组件的基础上编写插件，我们可以使用 Vue.extend(component)来进行，可以见下方 loading 插件实例。

## loading 插件

一个 loading.vue 组件，在没有封装插件之前，我们只能通过 import 引入并注册到 components 对象中才能在页面中使用，如：

```html
<template>
  <div>
    <loading :show="true"></loading>
  </div>
</template>

<script>
  import Loading from "./loading.vue";
  export default {
    components: {
      Loading
    }
  };
</script>
```

下面我们便来封装一下该组件：

1. 新建一个 loading.js 文件，引入我们的 loading.vue 组件，然后通过 Vue.extend()方法创建了一个构造器 LoadingPlugin；
2. 其次我们再通过 new LoadingPlugin()创建了\$vm 实例，并挂载到一个 div 元素上；
3. 最后我们需要通过 document.body.appendChild($vm.\$el)将其插入到 DOM 节点中。

当我们创建了$vm实例后，我们可以访问该实例的属性和方法，比如通过$vm.show 就可以改变 loading 组件的 show 值来控制其显示隐藏。

最终我们通过 Vue.mixin 或者 Vue.prototype.$loading来全局添加了$loading 事件，其又包含了 show 和 hide 两个方法。我们可以直接在页面中使用 this.$loading.show()来显示加载，使用this.$loading.hide()来关闭加载。

## 插件发布

插件编写完后我们的目的除了本地引用注册外，可能更希望发布到线上供他人或其他项目使用，因此我们需要了解插件发布的方法。

### 1. 发布准备

在发布插件前你需要一个 npm 账号，你可以访问：https://www.npmjs.com/ 进行注册

### 2. 发布命令

npm login
cd 目录
npm publish
拥有账号后，你需要在控制台输入 npm login 命令来登录你的账号，并且输入邮箱地址。然后打开你的插件目录，允许 npm publish 发布。最简单的一个插件目录如下：

### 3. 发布目录

```shell
   ├── lib // 插件源码
   │ ├── components // 组件目录
   │ │ └── loading.vue // 组件文件
   │ └── index.js // 插件入口文件
   ├── index.js // 入口文件
   └── package.json // 包管理文件
```

### 4. 安装插件

```
npm install xxxxxx --save
```

### 5. 全局注册组件

```javascript
import Loading from "@/widgets/loading/loading.js";
Vue.use(Loading); // 注册 Loading
```

### 6. 调用组件

```javascript
this.$loading.hide();
```
