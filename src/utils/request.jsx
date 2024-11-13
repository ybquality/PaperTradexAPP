
import axios from 'axios';
import { BASE_URL } from './pathMap';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getToken(key) {
    return AsyncStorage.getItem(key);
}

// 创建 axios 实例
console.log('初始化axios实例');

const instance = axios.create({
    baseURL: BASE_URL, // 后端地址
});



// 请求拦截器
instance.interceptors.request.use(
    async (config) => {
        console.log('请求拦截');
        try {
        
            const accessToken = await getToken('accessToken');
            console.log('accessToken:', accessToken);
            
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        } catch (error) {
            console.error('获取 access token 失败:', error);
        }
        
        return config;
    },
    async (error) => {
        console.error('响应拦截器错误:', error.response);
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // 确保 error.response 存在，并且包含 status
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await getToken('refreshToken');
                console.log('refreshToken:', refreshToken);

                if (refreshToken) {
                    // 用 Refresh Token 获取新 Access Token
                    const response = await axios.post(`${BASE_URL}/api/user/refreshToken`, {}, {
                        headers: {
                            'Authorization': `Bearer ${refreshToken}`
                        },
                    });

                    // 更新 Access Token
                    const newAccessToken = response.data.accessToken;
                    console.log('newAccessToken:', newAccessToken);

                    await AsyncStorage.setItem('accessToken', newAccessToken);

                    // 重新尝试原来的请求
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return instance(originalRequest);
                } else {
                    console.error('Refresh token not found');
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                // Refresh Token 过期或无效时需要重新登录
                console.error('Refresh token expired or invalid', refreshError);
                return Promise.reject(refreshError);
            }
        }

        // 如果不是401错误，直接返回错误
        console.error('Request error:', error.message);
        console.error('Request config:', error.config);
        return Promise.reject(error);
    }
);

export default instance;