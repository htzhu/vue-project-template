import store from '../store';
import { asyncRouterMap } from '@/router';
import config from '../config/config.js';
import { getUrlParamByParamName } from './utils.js';
import { Message } from 'element-ui';
import { getRequest } from './api.js';
import Home from '@/views/home/index.vue';

/**
 * 单点登录流程
 * @param to
 * @param from
 * @param next
 * @param router
 */
export const userLogin = (to, from, next, router) => {
  // authKey 已经存在
  if (sessionStorage.getItem('authKey') != null) {
    if (store.state.sidebarMenus === null || store.state.sidebarMenus.length === 0) {
      // 添加侧边栏菜单
      addSidebarMenus(to, router, store, next);
    } else {
      next();
    }
  } else {
    //登录认证
    loginAuth(next);
  }
};

/**
 * 登录认证：调用管理中心的auth接口
 * @param next next
 */
function loginAuth(next) {
  if (config.userFlag == 0) {
    // 本地单点登录
    if (window.location.href.indexOf('ticket') != -1) {
      // 如果存在ticket就去请求后台接口返回authKey
      doAuth(getUrlParamByParamName(window.location.href, 'ticket'));
    } else {
      // 如果ticket不存在，就直接去请求后台到单点登录页面
      doAuth();
    }
  } else {
    // 理想单点登录
    if (window.location.href.indexOf('code') != -1) {
      // 如果存在code参数，则拿着code参数和PSID去调用/auth接口
      doAuth(getUrlParamByParamName(window.location.href, 'code'));
    } else {
      // 如果code不存在，则只拿着PSID去请求/auth接口
      doAuth();
    }
  }
  next(false);
}

/**
 * 调用管理中心的auth接口
 * @param code/ticket参数，如果传递该参数，表示url中含有code/ticket参数，则携带该参数调用auth接口，如果没有传递参数，则只携带PSID调用auth接口
 */
function doAuth(code) {
  let PSID = sessionStorage.getItem('PSID') || guid();
  if (arguments.length == 0) {
    //无code/ticket参数
    let url = window.location.href;
    if (window.location.href.indexOf('#/') != -1) {
      url = url.replace('#/', '');
    }

    window.sessionStorage.setItem('callbackUrl', url);
    getRequest('/auth-service/auth?PSID=' + PSID).then(res => {
      if (
        res.status === 200 &&
        (res.data.code === '800-TYDICPLUGIN-SE-101' || res.data.code === '800-DAP109--SE-101')
      ) {
        window.location.href = res.data.data.url;
      }
      // handleReponseResult(res);
    });
  } else {
    // 有code/ticket参数
    // vue的hash模式会自动在url后附加"#/"
    if (code.indexOf('#/') != -1) {
      code = code.replace('#/', '');
    }
    getRequest('/auth-service/auth?PSID=' + PSID + '&code=' + code).then(res => {
      if (res.status === 200 && res.data.code === '10000') {
        handleReponseResult(res.data.data);
      }
    });
  }
}

/**
 * 处理auth接口返回的结果
 * @param res auth接口返回的结果
 */
function handleReponseResult(data) {
  if (data.authKey != null) {
    //成功
    //设置authkey、psid和用户信息到session
    store.commit('saveLoginInfoToSession', data);
    store.commit('login', data.user);

    let callBackUrl = sessionStorage.getItem('callbackUrl');

    //跳转到项目单点登录之前访问的地址
    window.location.href = callBackUrl;
  } else {
    Message.error('系统异常，请联系管理员！');
  }
}

/**
 * 侧边栏菜单
 * @param router
 * @param store
 */
function addSidebarMenus(to, router, store, next) {
  let path = to.path,
    current = null;
  let sidebarMenus = [];
  for (let j = 0; j < asyncRouterMap.length; j++) {
    //全部为显示
    asyncRouterMap[j].hidden = false;
    if (asyncRouterMap[j].children) {
      for (let n = 0; n < asyncRouterMap[j].children.length; n++) {
        asyncRouterMap[j].children[n].hidden = false;
        if (path === asyncRouterMap[j].children[n].path) {
          current = asyncRouterMap[j].children[n];
        }
      }
    } else {
      if (path === asyncRouterMap[j].path) {
        current = asyncRouterMap[j];
      }
    }
    sidebarMenus.push(asyncRouterMap[j]);
  }

  let sidebar_bak = [];
  sidebarMenus.forEach(item => {
    let tmp = {
      path: '/home/index',
      component: Home,
      name: '首页',
      id: 509002,
      children: []
    };
    tmp.children.push(item);
    sidebar_bak.push(tmp);
  });

  // 存储侧边栏菜单和当前菜单
  store.commit('sidebarMenus', sidebarMenus);
  // router.addRoutes(sidebarMenus); //动态添加路由
  store.commit('set_sidebarMenusHasLoaded', true);

  if (to.path !== '/' && to.path !== '/401' && current != null) {
    store.commit('currentRouterView', current);
    next();
    router.addRoutes([
      {
        path: path,
        component: current.component
      }
    ]);
  } else {
    router.addRoutes(sidebar_bak); //动态添加路由
    // router.push(to.fullPath);
    next();
  }
  // next({ ...to, replace: true });
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}
