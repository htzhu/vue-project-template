import Vue from 'vue';
import Vuex from 'vuex';
import 'babel-polyfill';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      userName: ''
    }
  },
  mutations: {}
});
