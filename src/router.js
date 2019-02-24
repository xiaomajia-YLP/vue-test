import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
// console.log(process.env);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页'
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
      component: () => import( /* webpackChunkName: "about" */ './views/Test.vue'),
      meta: {
        title: '测试'
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