import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView,StatusBar, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { getLoginStatus, getUserName, getUid } from '../../utils/tokenUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AssetOverview from '../../components/account/AssetOverview';
import InviteCard from '../../components/InviteCard';
import Modal from '../../components/common/modal';

import axios from 'axios';
// import { StatusBar } from 'expo-status-bar';

const getSettingsData = () => {
  return [
    { id: '1', title: '账户与安全', gotoPage: 'AccountSecurity' },
    { id: '2', title: '推送设置', gotoPage: 'NotificationSettings' },
    { id: '3', title: '帮助中心', gotoPage: '' },
    { id: '4', title: '关于我们', gotoPage: '' },
    { id: '5', title: 'PaperTradex社群', gotoPage: 'Community' },
    { id: '6', title: '分享应用', gotoPage: '' },
  ];
};

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
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setIsLogin(false);
    setUserName('No Name');
    setUid('');
    setLogoutModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listItem} 
      onPress={() => {
        if (item.gotoPage === 'logout') {
          handleLogout();
        } else {
          navigation.navigate('AccountStack', { screen: item.gotoPage });
        }
      }}
    >
      <Text style={[
        styles.listItemText,
        item.textColor ? { color: item.textColor } : null
      ]}>
        {item.title}
      </Text>
      <Icon name="chevron-right" type="font-awesome" color="#ccc" size={14} />
    </TouchableOpacity>
  );

  const handleBalancePress = () => {
    console.log("提示", "点击了余额按钮");

    Alert.alert("提示", "点击了余额按钮");
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await loadData();
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    
    <ScrollView 
      style={[styles.scrollContainer, { backgroundColor: '#ffff' }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#00D0AC"  // 加载图标的颜色
          // title="下拉刷新"
          titleColor="#00D0AC" // iOS专用
        />
      }
    >
      <View style={{ flex: 1, marginBottom: 60 }}>
        {/* 状态栏配置 */}
        <StatusBar 
          //  backgroundColor="transparent"
          //  barStyle="light-content"
          //  translucent={true}
        />

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
                            ? { uri: 'https://avatars.githubusercontent.com/u/65755259?v=4' }
                            : require('../../../assets/adaptive-icon.png')
                        }
                        style={styles.avatar}
                        resizeMode='cover'
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
                            navigation.navigate('AccountStack', { screen: 'UserInfo' });
                        }}
                    >
                        <Icon name="chevron-right" type="feather" color="rgba(255, 255, 255, 0.6)" size={24} weight="bold" />
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

          {/* 新用户专享和交易账户按钮 - 只在登录状态显示 */}
          {isLogin && (
            <View style={[{ flexDirection: 'row' }, styles.buttonContainer]}>
              <View style={styles.newUserGiftView}>
                <Icon name="gift" type="font-awesome" color="rgba(255, 228, 133, 1)" size={16} />
                <Text style={styles.newUserGiftViewText}>新人专享</Text>
                <TouchableOpacity style={styles.newUserGiftViewButton} onPress={testFunction}>
                  <Text style={styles.newUserGiftViewButtonText}>领取</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.transactionAccountView}>
                <Icon name="link" type="font-awesome" color="#fff" size={16} />
                <Text style={styles.transactionAccountViewText}>交易账户</Text>
                <TouchableOpacity style={styles.transactionAccountViewButton} onPress={() => navigation.navigate('DetailStack', { screen: 'accessTradingAccount' })}>
                  <Text style={styles.transactionAccountViewButtonText}>接入</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <LinearGradient
            colors={['#F4F4F4', '#AFAFAF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.VIPcardContainer}
          >
            {/* 添加背景图片 */}
            <Image 
              source={require('../../../assets/img/backgroundpng.png')}
              style={styles.vipBackgroundImage}
            />
            
            <View style={styles.topSection}>
              <View style={styles.vipContainer}>
                <Image source={require('../../../assets/VIP 1.png')} style={styles.vipIcon} />
                <Text style={styles.vipText}>普通用户</Text>
              </View>
              <TouchableOpacity 
                style={styles.buyVipButton}
                onPress={() => navigation.navigate('AccountStack', { screen: 'BuyVip' })}
              >
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
          </LinearGradient>
          {/* 资产总览部分 */}
          <AssetOverview 
            navigation={navigation} 
            isRefreshing={refreshing}
          />

          <View style={styles.Itemcontainer}>
            {/* 设置与服务部分 */}
            <View>
              {/* 邀请返佣卡片 */}
              <View style={styles.inviteCardWrapper}>
                <InviteCard />
              </View>

              {/* 设置与服务部分 */}
              <View style={styles.settingsWrapper}>
                <Text style={styles.settingsTitle}>设置与服务</Text>
                <FlatList
                  data={getSettingsData()}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                  style={styles.settingsList}
                />
              </View>

              {/* 退出登录按钮 */}
              {isLogin && (
                <>
                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => setLogoutModalVisible(true)}
                  >
                    <Text style={styles.logoutButtonText}>退出登录</Text>
                  </TouchableOpacity>

                  <Modal
                    visible={logoutModalVisible}
                    onClose={() => setLogoutModalVisible(false)}
                    title="退出登录"
                    showConfirmButton={true}
                    showCancelButton={true}
                    onConfirm={handleLogout}
                    onCancel={() => setLogoutModalVisible(false)}
                    confirmText="确定"
                    cancelText="取消"
                  >
                    <Text style={styles.modalText}>确定要退出登录吗？</Text>
                  </Modal>
                </>
              )}
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
    backgroundColor: 'rgb(255, 255, 255)',
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
    width: 48,
    height: 48,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    resizeMode: 'cover',
  },
  textContainer: {
    marginLeft: 8,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 4,
  },
  uid: {
    fontSize: 12,
    fontWeight: '400',
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
    // marginTop: 16,
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
    minHeight: 24,
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
    // marginTop: 16,
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
    minHeight: 24,
    marginLeft: 10
  },
  transactionAccountViewButtonText: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 12
  },

  VIPcardContainer: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  vipBackgroundImage: {
    position: 'absolute',
    top: 0,
    right: 50,
    width: 200,
    height: '100%',
    opacity: 0.8,
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
    marginTop: 5,
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    paddingTop: 12,
    marginTop: 16,
  },
  inviteContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden', // 确保圆弧不会超出容器
  },
  inviteContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  inviteLeft: {
    flex: 1,
  },
  inviteTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  inviteDesc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  inviteButton: {
    backgroundColor: '#000',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  inviteImage: {
    width: 80,
    height: 80,
    marginLeft: 16,
  },
  settingsWrapper: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingsList: {
    width: '100%',
    paddingHorizontal: 12,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
  },
  listItemText: {
    fontSize: 14,
    color: '#333',
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

  logoutButton: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#FF3B30',
  },
  logoutButtonText: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '500',
  },

  inviteCardWrapper: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
});


export default AccountScreen;