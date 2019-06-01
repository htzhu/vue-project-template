// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { getRequest, putRequest, deleteRequest, postRequest } from './utils/api.js';
import config from './config/config';

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(router);

Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.postRequest = postRequest;

// 加载配置信息
config.userFlag;

// css 样式
import './assets/css/index.css';
import { userLogin } from './utils/login';

/**
 * 使用 router.beforeEach 注册一个全局前置守卫
 * 功能：在每次路由跳转之前，进行是否登录判断
 */
router.beforeEach((to, from, next) => {
  userLogin(to, from, next, router);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
