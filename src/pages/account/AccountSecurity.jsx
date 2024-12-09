import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import NavBar from '../../components/common/navbar';

import { getMobilePhone, getEmail, getIsBindEmail } from '../../utils/tokenUtils';

// 需要读取数据库中的手机号
const AccountSecurityScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [isBindEmail, setIsBindEmail] = useState(false);
  const [phone, setPhone] = useState('');


  const formatPhoneNumber = (phone) => {
    if (!phone || phone.length < 7) return phone; // 确保手机号长度足够
    return phone.substring(0, 3) + '****' + phone.substring(phone.length - 4);
  };
  const initPage = async () => {
    console.log(await getEmail());
    console.log(await getIsBindEmail());
    
    
    setEmail(await getEmail());
    setIsBindEmail(await getIsBindEmail());
    setPhone(await getMobilePhone());
  }

  useEffect(() => {
    initPage();
  }, []);

  useFocusEffect(
    useCallback(() => {
      initPage();
    }, [])
  )

  // 点击处理函数
  const emailHandlePress = () => {
    if (isBindEmail) {
      // 如果已绑定，跳转到修改邮箱页面
      navigation.navigate('VerifyEmail', { email });
    } else {
      // 如果未绑定，跳转到绑定邮箱页面
      navigation.navigate('BindEmail');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBarContainer}>
        <NavBar
          onBack={() => navigation.goBack()}
        >
          <Text style={styles.title}>账号安全</Text>
        </NavBar>
      </View>

      <View style={styles.content}>
        {/* 手机号部分 */}
        <TouchableOpacity
          style={[styles.itemContainer, styles.withBorder]}
          onPress={() => navigation.navigate('VerifyPhone')}
        >
          <Text style={styles.itemLabel}>手机号</Text>
          <Text style={styles.itemValue}>{formatPhoneNumber(phone)}</Text>
        </TouchableOpacity>

        {/* 邮箱部分 */}
        <TouchableOpacity
          style={[styles.itemContainer, styles.withBorder]}
          onPress={() => emailHandlePress()}
        >
          <Text style={styles.itemLabel}>邮箱</Text>
          <Text style={[styles.itemValue, styles.link]}>{isBindEmail ? email : '未绑定'}</Text>
        </TouchableOpacity>

        {/* 重置密码部分 */}
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('ResetPassword')}
        >
          <Text style={styles.itemLabel}>重置密码</Text>
          <Icon
            name="chevron-right"
            type="feather"
            size={20}
            color="rgba(0, 0, 0, 0.4)"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
  navBarContainer: {
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.9)',
  },
  content: {
    margin: 24,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(243, 244, 246, 1)',
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(156, 163, 175, 1)',
  },
  itemValue: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(17, 24, 39, 1)',
    textAlign: 'right',
  },
  link: {
    color: 'rgba(0, 208, 172, 1)', // 蓝绿色，表示可点击的状态
  },
});

export default AccountSecurityScreen;
