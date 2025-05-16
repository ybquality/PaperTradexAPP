import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = "http://47.76.236.210:9999";

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 从本地存储获取token
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      // 添加token到请求头
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 统一处理响应数据
    const res = response.data;
    
    // 这里可以根据你的后端接口返回格式进行调整
    if (res.code === 200 || res.code === 0) {
      return res.data;
    } else {
      // 可以集成你的提示组件
      console.error(res.message || '请求失败');
      return Promise.reject(new Error(res.message || '请求失败'));
    }
  },
  (error) => {
    let message = '';
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录';
          // 这里可以添加跳转到登录页的逻辑
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求错误，未找到该资源';
          break;
        case 500:
          message = '服务器错误';
          break;
        default:
          message = `连接错误${error.response.status}`;
      }
    } else {
      message = error.message;
    }
    
    // 显示错误信息
    console.error(message);
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export const get = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.get(url, config);
};

// 封装 POST 请求
export const post = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.post(url, data, config);
};

// 封装 PUT 请求
export const put = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.put(url, data, config);
};

// 封装 DELETE 请求
export const del = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.delete(url, config);
};

export default instance;
