import axios from 'axios';
import { Message } from 'element-ui';

/**
 * axios 请求拦截器
 */
axios.interceptors.request.use(
  config => {
    // config.headers.Authorization = '';

    return config;
  },
  err => {
    Message.error({ message: '请求超时!' });
    return Promise.resolve(err);
  }
);

/**
 * axios 响应拦截器
 */
axios.interceptors.response.use(
  data => {
    return new Promise(resolve => {
      return resolve(data);
    });
  },
  err => {
    if (err.response.status == 504 || err.response.status == 404) {
      Message.error({ message: '服务器不存在⊙﹏⊙∥' });
    } else if (err.response.status == 403) {
      Message.error({ message: '权限不足,请联系管理员!' });
    } else {
      Message.error({ message: '未知错误，请求联系管理员!' });
    }
    return Promise.reject(err);
  }
);

/**
 * axios get 请求
 * @param url 请求地址
 */
export const getRequest = url => {
  return axios({
    method: 'get',
    url: `${url}`
  });
};

/**
 * axios put 请求
 * @param url 请求地址
 * @param params 请求参数
 */
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
};

/**
 * axios delete 请求
 * @param url 请求地址
 */
export const deleteRequest = url => {
  return axios({
    method: 'delete',
    url: `${url}`
  });
};

/**
 * axios post 请求
 * @param url 请求地址
 * @param params 请求参数
 */
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
};
