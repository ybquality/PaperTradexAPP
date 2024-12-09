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
