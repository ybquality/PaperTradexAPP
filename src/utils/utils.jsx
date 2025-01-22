import AsyncStorage from '@react-native-async-storage/async-storage';
import request from './request';

export async function getToken(key) {
    return await AsyncStorage.getItem(key);
}

export async function updateUserInfo(){
    try{
        const ret = await request.get('/api/user/getUserInfo');
        console.log(ret.data.data);
        
        if (ret.data.code === 200) {
            let { userName, Uid, mobilePhone, email, avatarUrl } = ret.data.data;
            await AsyncStorage.multiSet([
                ['userName', userName],
                ['Uid', Uid],
                ['mobilePhone', mobilePhone],
                ['email', email],
                ['avatarUrl', avatarUrl || '']
              ]);
        }
    } catch (error) {
        console.log('Error:', error);
    }
};


export async function compareVersions(v1, v2) {
    const arr1 = v1.split('.').map(Number);
    const arr2 = v2.split('.').map(Number);
  
    for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
      const num1 = arr1[i] || 0; // 若版本号不足，用 0 填充
      const num2 = arr2[i] || 0;
  
      if (num1 > num2) return 1; // v1 大
      if (num1 < num2) return -1; // v2 大
    }
    return 0; // 相等
  }