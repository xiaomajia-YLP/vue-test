import Vue from 'vue'
import Router from 'vue-router'
import Game from './views/Game.vue'

Vue.use(Router)
// console.log(process.env);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/game',
      name: 'game',
      component: Game,
      meta: {
        title: '数字迷盘'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // webpack 提供 Magic Comments 给拆分出的文件命名 --> webpackChunkName
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        title: '关于'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import( /* webpackChunkName: "test" */ './views/Test.vue'),
      meta: {
        title: '测试'
      }
    },
    {
      path: '/',
      name: 'user',
      component: () => import( /* webpackChunkName: "user" */ './views/User.vue'),
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/form',
      name: 'form',
      component: () => import( /* webpackChunkName: "form" */ './views/Form.vue'),
      meta: {
        title: '表单组件封装'
      }
    },
    {
      path: '/display',
      name: 'display',
      component: () => import( /* webpackChunkName: "display" */ './views/Display.vue'),
      meta: {
        title: '动态渲染.vue组件'
      }
    },
    {
      path: '/alert',
      name: 'alert',
      component: () => import( /* webpackChunkName: "alert" */ './views/Alert.vue'),
      meta: {
        title: '全局提示组件'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
  // if (to.name === 'home') {
  //   // 拦截并跳转至 page2 单页
  //   Vue.$openRouter({
  //     name: 'page2'
  //   });
  // }
})

export default router