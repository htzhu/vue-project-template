import Vue from 'vue';
import Router from 'vue-router';
import errorPage_404 from '@/components/error-page/404.vue';
import Home from '@/views/home/index.vue';
import DataStorage from '@/views/dataStorage/index.vue';
import JobDevelop from '@/views/jobDevelop/index.vue';
// import Function from '@/views/function/index.vue';
import Hello from '@/views/hello.vue';

Vue.use(Router);

// 静态路由
export const constantRouterMap = [
  {
    path: '/',
    name: '首页',
    component: Home
  },
  {
    path: '/hello',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/404',
    name: '404',
    component: errorPage_404
  }
];

// 动态路由，根据权限加载
export const asyncRouterMap = [
  {
    path: '/jobDevelop',
    component: Home,
    name: '作业开发',
    id: 509001,
    children: [
      {
        path: '/jobDevelop/index',
        component: JobDevelop,
        name: '作业开发',
        id: 509001001,
        iconFlag: 'iconkaifa',
        hidden: true,
        children: []
      }
    ]
  },
  {
    path: '/dataStorage',
    component: Home,
    name: '数据存储',
    id: 509002,
    children: [
      {
        path: '/dataStorage/index',
        component: DataStorage,
        name: '数据存储',
        id: 509001001,
        iconFlag: 'iconziyuanguanli',
        hidden: true,
        children: []
      }
    ]
  }
  // {
  //   path: '/function/index',
  //   component: Function,
  //   name: '函数管理',
  //   id: 509003,
  //   iconFlag: 'iconziyuanguanli',
  //   hidden: true,
  //   children: []
  // }
];

export default new Router({
  mode: 'history',
  base: '/tysc/',
  routes: constantRouterMap
});
