import axios from 'axios';
import { BASE_URL } from './pathMap';
import { getAccessToken, saveAccessToken, getRefreshToken } from './tokenUtils'

let isRefreshing = false;
let subscribers = [];

function onRefreshed(accessToken) {
    subscribers.forEach((callback) => callback(accessToken));
    subscribers = [];
}

function subscribeTokenRefresh(callback) {
    subscribers.push(callback);
}

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    async (config) => {
        const accessToken = getAccessToken(); // 从存储中获取 accessToken
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {

        const originalRequest = error.config;
        
        // 检查 error.response 是否存在
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = await getRefreshToken(); // 从存储中获取 refreshToken
            return api
                .post('/refreshToken', { token: refreshToken })
                .then(async ({ data }) => {
                    const { accessToken } = data;
                    // 保存新的 accessToken
                    await saveAccessToken(accessToken);
                    api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
                    onRefreshed(accessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return api(originalRequest);
                })
                .catch((err) => {
                    // 处理错误，例如登出
                    console.error(err);
                })
                .finally(() => {
                    isRefreshing = false;
                });
        }else{
            console.log('Error message:', error.message);
            return Promise.reject(error);
        }
    }
);


export default api;
