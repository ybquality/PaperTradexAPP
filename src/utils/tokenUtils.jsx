import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
  return await AsyncStorage.getItem('accessToken');
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem('refreshToken');
};

export const saveAccessToken = async (token) => {
  await AsyncStorage.setItem('accessToken', token);
};

export const getIsLogin = async () => {
  return await AsyncStorage.getItem('isLogin');
};

export const getLoginStatus = async () => {
  const isLogin = await getIsLogin();
  const accessToken = await getAccessToken();
  return isLogin === 'true' && accessToken !== null;
};

export const getUserName = async () => {
  return await AsyncStorage.getItem('userName');
};

export const getUid = async () => {
  return await AsyncStorage.getItem('Uid');
};