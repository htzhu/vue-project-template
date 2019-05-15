import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/views/HelloWorld.vue';
import Home from '@/views/home/Index.vue';
import errorPage_404 from '@/components/errorPage/404.vue';

Vue.use(Router);

// 静态路由
export const constantRouterMap = [
  {
    path: '/',
    name: '首页',
    component: Home
  },
  {
    path: '/404',
    name: '404',
    component: errorPage_404
  },
  {
    path: '/helloworld',
    name: 'HelloWorld',
    component: HelloWorld
  }
];

// 动态路由，根据权限加载
export const asyncRouterMap = [];

export default new Router({
  mode: 'history',
  base: '/tysc/',
  routes: constantRouterMap
});
