import Vue from 'vue';
import Vuex from 'vuex';
import 'babel-polyfill';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      userId:
        window.sessionStorage.getItem('user' || '[]') == null
          ? '未登录'
          : JSON.parse(window.sessionStorage.getItem('user' || '[]')).userId,
      userName:
        window.sessionStorage.getItem('user' || '[]') == null
          ? '未登录'
          : JSON.parse(window.sessionStorage.getItem('user' || '[]')).userName,
      userAcct:
        window.sessionStorage.getItem('user' || '[]') == null
          ? '未登录'
          : JSON.parse(window.sessionStorage.getItem('user' || '[]')).userAcct,
      provinceCode:
        window.sessionStorage.getItem('user' || '[]') == null
          ? '未登录'
          : JSON.parse(window.sessionStorage.getItem('user' || '[]')).provinceCode,
      provinceName:
        window.sessionStorage.getItem('user' || '[]') == null
          ? '未登录'
          : JSON.parse(window.sessionStorage.getItem('user' || '[]')).provinceName
    },
    sidebarMenus: [], // 侧边栏菜单
    currentRouterView: '',
    workGroups: [], //用户所属工作组
    privilege: [], // 菜单权限
    sidebarMenusHasLoaded: false // 侧边栏菜单是否加载
  },
  mutations: {
    // 侧边栏菜单
    sidebarMenus(state, menus) {
      this.state.sidebarMenus = menus;
    },
    currentRouterView(state, menu) {
      this.state.currentRouterView = menu;
    },
    // 登录
    login(state, user) {
      this.state.user.userId = user.userId;
      this.state.user.userName = user.userName;
      this.state.user.userAcct = user.userAcct;
      this.state.user.provinceCode = user.provinceCode;
      this.state.user.provinceName = user.provinceName;
      this.state.privilege = user.privilege;
    },
    // 注销登录
    logout() {
      window.sessionStorage.removeItem('authKey');
      window.sessionStorage.removeItem('user');
      window.sessionStorage.removeItem('PSID');
    },
    // 保存authkey、user、psid信息到sessionStorage
    saveLoginInfoToSession(state, data) {
      window.sessionStorage.setItem('authKey', data.authKey);
      window.sessionStorage.setItem('PSID', data.PSID);
      window.sessionStorage.user = JSON.stringify(data.user);
    },
    // 侧边栏菜单是否加载过
    set_sidebarMenusHasLoaded(state, flag) {
      this.state.sidebarMenusHasLoaded = flag;
    }
  }
});
