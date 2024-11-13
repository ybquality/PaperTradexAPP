import AsyncStorage from '@react-native-async-storage/async-storage';

async function getToken(key) {
    return await AsyncStorage.getItem(key);
}


export default { getToken };