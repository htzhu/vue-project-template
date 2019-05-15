// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import { getRequest, putRequest, deleteRequest, postRequest } from './utils/api.js';

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.postRequest = postRequest;

// css 样式
import './assets/css/index.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
