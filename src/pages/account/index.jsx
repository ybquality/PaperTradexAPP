import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, FlatList, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { getLoginStatus, getUserName, getUid } from '../../utils/tokenUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const data = [
  { id: '1', title: '账户与安全', gotoPage: 'AccountSecurity' },
  { id: '2', title: '推送设置', gotoPage: 'NotificationSettings' },
  { id: '3', title: '在线客服', gotoPage: '' },
  { id: '4', title: '加入社群', gotoPage: '' },
  { id: '5', title: '检查更新', gotoPage: '' },
  { id: '6', title: '分享应用', gotoPage: '' },
];

const testFunction = async () => {
  console.log("testFunction called");
  

  try {
    const response = await axios.get('http://api.papertradex.io/api/user/');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const AccountScreen = ({ navigation }) => {
  const [ isLogin, setIsLogin ] = useState(false);
  const [ userName, setUserName ] = useState('No Name');
  const [ uid, setUid ] = useState('');

  const loadData = async () => {
    console.log('加载数据...');
    setUserName(await getUserName());
    setUid(await getUid());
    setIsLogin(await getLoginStatus());
    
    console.log('uid:', uid);
    console.log('isLogin:', isLogin);
    console.log('userName:', userName);
    
  };

  
  useEffect(() => {
    // AsyncStorage.clear();
    const unsubscribe = navigation.addListener('focus', loadData);

    return unsubscribe; // 清理函数，移除监听器
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('AccountStack', { screen: item.gotoPage })}>
      <Text style={styles.listItemText}>{item.title}</Text>
      {/* <Text style={styles.arrow}>›</Text> */}
    </TouchableOpacity>
  );

  const handleBalancePress = () => {
    console.log("提示", "点击了余额按钮");

    Alert.alert("提示", "点击了余额按钮");
  };
  return (
    
    <ScrollView style={styles.scrollContainer}
      showsVerticalScrollIndicator={false} // 隐藏垂直滚动条
    >
      <View style={{ flex: 1, marginBottom: 60 }}>
        {/* 将 StatusBar 设置为透明，使其和背景融为一体 */}
        <StatusBar translucent backgroundColor="transparent" />

        {/* 背景渐变 */}
        <LinearGradient
          colors={['#000000', '#FFFFFF']}  // 从黑色到白色的渐变
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientBackground}
        >
          {/* 用户信息部分 */}
          <View style={styles.container}>
            <View style={styles.userInfo}>
                <View style={styles.leftSection}>
                    <Image
                        source={isLogin 
                            ? { uri: 'https://example.com/avatar.png' }
                            : require('../../../assets/adaptive-icon.png')
                        }
                        style={styles.avatar}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.username}>
                            {isLogin ? userName : '欢迎来到PaperTradex'}
                        </Text>
                        <Text style={styles.uid}>
                            {isLogin ? `UID: ${uid}` : '请登录您的账户或注册一个账户'}
                        </Text>
                    </View>
                </View>
                
                {isLogin && (
                    <TouchableOpacity
                        style={styles.arrowButton}
                        onPress={() => {
                            console.log('已登录');
                            alert('已登录');
                        }}
                    >
                        <Icon name="chevron-right" type="font-awesome" color="#A9A9A9" size={20} />
                    </TouchableOpacity>
                )}
            </View>
            
            {/* 登录注册按钮 */}
            {!isLogin && (
                <View style={styles.authButtons}>
                    <TouchableOpacity 
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('AccountStack', { screen: 'Login' })}
                    >
                        <Text style={styles.loginButtonText}>登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.registerButton}
                        onPress={() => navigation.navigate('AccountStack', { screen: 'Register' })}
                    >
                        <Text style={styles.registerButtonText}>注册</Text>
                    </TouchableOpacity>
                </View>
            )}
          </View>

          {/* 新用户专享和交易账户按钮 */}
          <View style={[{ flexDirection: 'row' }, styles.buttonContainer]}>
            <View style={styles.newUserGiftView}>
              <Icon name="gift" type="font-awesome" color="#fff" size={16} />
              <Text style={styles.newUserGiftViewText}>新人专享</Text>
              <TouchableOpacity style={styles.newUserGiftViewButton} onPress={testFunction}>
                <Text style={styles.newUserGiftViewButtonText}>领取</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.transactionAccountView}>
              <Icon name="link" type="font-awesome" color="#fff" size={16} />
              <Text style={styles.transactionAccountViewText}>交易账户</Text>
              <TouchableOpacity style={styles.transactionAccountViewButton}>
                <Text style={styles.transactionAccountViewButtonText}>接入</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.VIPcardContainer}>
            <View style={styles.topSection}>
                <View style={styles.vipContainer}>
                    <Image source={require('../../../assets/VIP 1.png')} style={styles.vipIcon} />
                    <Text style={styles.vipText}>普通用户</Text>
                </View>
                <TouchableOpacity style={styles.buyVipButton}>
                    <Text style={styles.buyVipText}>购买VIP</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity onPress={handleBalancePress} style={styles.detailBox}>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailNumber}>0</Text>
                        <Text style={styles.detailText}>VIP剩余天数</Text>
                    </View>
                </TouchableOpacity>
                
                <View style={styles.verticalDivider} />
                
                <TouchableOpacity 
                    onPress={() => navigation.navigate('AccountStack', { screen: 'Balance' })} 
                    style={styles.detailBox}
                >
                    <View style={styles.detailContent}>
                        <Text style={styles.detailNumber}>0</Text>
                        <Text style={styles.detailText}>余额</Text>
                    </View>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Itemcontainer}>
            {/* 邀请返佣部分 */}
            <Image source={require('../../../assets/invitation.png')} style={styles.inviteImage} />

            {/* 设置与服务部分 */}
            <View style={styles.settingsSection}>
              <Text style={styles.settingsTitle}>设置与服务</Text>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.settingsList}
                scrollEnabled={false}
                nestedScrollEnabled={true} // 允许嵌套滚动
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, 
  },
  container: {
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  username: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  uid: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    maxWidth: 200,
  },
  arrowButton: {
    padding: 8,
    marginLeft: 8,
  },
  newUserGiftView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    padding: 10,
    marginRight: 5,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginTop: 16,
  },
  newUserGiftViewText: {
    color: 'rgba(226, 203, 140, 1)',
    fontSize: 12,
    marginLeft: 10
  },
  newUserGiftViewButton: {
    backgroundColor: 'rgba(226, 203, 140, 1)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 32,
    marginLeft: 10
  },
  newUserGiftViewButtonText: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 12
  },
  transactionAccountView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    padding: 10,
    marginLeft: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginTop: 16,
  },
  transactionAccountViewText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12,
    marginLeft: 10
  },
  transactionAccountViewButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 32,
    marginLeft: 10
  },
  transactionAccountViewButtonText: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 12
  },

  VIPcardContainer: {
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#F4F4F4',
    backgroundImage: 'linear-gradient(96.64deg, #F4F4F4 0%, #AFAFAF 100%)',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vipIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  vipText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyVipButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buyVipText: {
    fontSize: 14,
    color: '#000',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  detailBox: {
    flex: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContent: {
    alignItems: 'center',
  },
  detailNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },

  Itemcontainer: {
    flex: 1,
    padding: 20,
  },
  inviteImage: {
    width: '100%',
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  settingsSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingsList: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItemText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },

  verticalDivider: {
    width: 1,
    height: 43,
    backgroundColor: '#00000014',
    alignSelf: 'center',
  },

  buttonContainer: {
    marginHorizontal: 16,
  },

  authButtons: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginTop: 16,
  },
  
  loginButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#80FFE9',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loginButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  
  registerButton: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  
  uid: {
    fontSize: 12,
    color: '#ddd',
    maxWidth: 200, 
  },

});


export default AccountScreen;