import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../../utils/request';
import api from '../../utils/Interceptor';
import { ACCOUNT_LOGIN, ACCOUNT_LOGIN_PHONE, GET_VERIFY_CODE } from '../../utils/pathMap';


const handleUsernamePasswordLogin = async (username, password, navigator) => {
  try {
      const response = await api.post(ACCOUNT_LOGIN, {
          username,
          password,
      });
      
      if (response.data.code == 200) {
          alert(response.data.msg);
          const accessToken = response.data.data.accessToken;
          const refreshToken = response.data.data.refreshToken;
          const userName = response.data.data.userName;
          const Uid = response.data.data.Uid;

          // 存储 token
          await AsyncStorage.multiSet([
            ['accessToken', accessToken],
            ['refreshToken', refreshToken],
            ['userName', userName],
            ['Uid', Uid],
            ['isLogin', 'true']
          ]);

          // 读取存储的 accessToken
          const storedAccessToken = await AsyncStorage.getItem('accessToken');
          console.log('accessToken:', storedAccessToken);
          navigator.goBack();
      }else{
        alert(response.data.msg);
      }
      console.log(response.data);
  } catch (error) {
      console.log('Error:', error);
  }
};


export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  const [isPhoneLogin, setIsPhoneLogin] = useState(true); // 控制切换
  const [countdown, setCountdown] = useState(0); // 移动到组件内部

  // 修改手机号校验函数，验证前几位格式
  const isValidPhone = (phone) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  // 修改发送验证码函数
  const sendVerifyCode = async (phone) => {
    if (!isValidPhone(phone)) {
      alert('请输入正确的手机号码');
      return;
    }

    try {
        const response = await api.post(GET_VERIFY_CODE, {
            phone,
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.data.code == 200) {
            alert('发送验证码成功');
            // 开始倒计时
            setCountdown(60);
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }else{
            alert(response.data.msg);
        }
        console.log(response.data);
    } catch (error){}
  }

  const handlePhoneLogin = async (phone, verifyCode, navigator) => {
    try {
        console.log(1);
      
        const response = await api.post(ACCOUNT_LOGIN_PHONE, {
            phone,
            verifyCode,
        });
        console.log(2);
        if (response.data.code === 200) {
            alert(response.data.msg);
            const accessToken = response.data.data.accessToken;
            const refreshToken = response.data.data.refreshToken;
            const userName = response.data.data.userName;
            const Uid = response.data.data.Uid;

            // 存储 token
            await AsyncStorage.multiSet([
              ['accessToken', accessToken],
              ['refreshToken', refreshToken],
              ['userName', userName],
              ['Uid', Uid],
              ['isLogin', 'true']
            ]);

            // 读取存储的 accessToken
            const storedAccessToken = await AsyncStorage.getItem('accessToken');
            console.log('accessToken:', storedAccessToken);
            navigator.goBack();
        }else{
          alert(response.data.msg);
        }
    } catch (error) {
        console.log('Error:', error);
        alert('登录失败', response.data.msg);
    }
  };

  // 修改手机号登录验证函数
  const isPhoneLoginValid = () => {
    return isValidPhone(phone) && verificationCode.length > 0;
  };

  const isPasswordLoginValid = () => {
    return username.length > 0 && password.length > 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>登录</Text>

      {isPhoneLogin ? (
        <>
          {/* 手机号+验证码 登录 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>手机号</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="+86 请输入手机号"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>验证码</Text>
            <View style={styles.inputWithButton}>
              <TextInput
                style={[styles.input, styles.inputFlex, styles.inputWrapper]} // 使输入框占用剩余空间
                value={verificationCode}
                onChangeText={setVerificationCode}
                placeholder="请输入验证码"
                keyboardType="number-pad"
              />
              <TouchableOpacity 
                style={[
                  styles.codeButton,
                  countdown > 0 && { backgroundColor: '#cccccc' }
                ]} 
                onPress={() => sendVerifyCode(phone)}
                disabled={countdown > 0}
              >
                <Text style={styles.codeButtonText}>
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <>
          {/* 用户名+密码 登录 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>用户名</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                placeholder="请输入用户名"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>密码</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="请输入密码"
                secureTextEntry
              />
            </View>
          </View>
        </>
      )}

      {/* 切换登录方式按钮 */}
      <TouchableOpacity onPress={() => setIsPhoneLogin(!isPhoneLogin)}>
        <Text style={styles.switchText}>
          {isPhoneLogin ? '使用用户名密码登录' : '使用手机号验证码登录'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.button,
          (!isPhoneLogin && !isPasswordLoginValid()) || (isPhoneLogin && !isPhoneLoginValid())
            ? styles.buttonDisabled 
            : null
        ]} 
        onPress={() => 
          isPhoneLogin 
            ? handlePhoneLogin(phone, verificationCode, navigation) 
            : handleUsernamePasswordLogin(username, password, navigation)
        }
        disabled={
          (isPhoneLogin && !isPhoneLoginValid()) || 
          (!isPhoneLogin && !isPasswordLoginValid())
        }
      >
        <Text style={styles.buttonText}>登录</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>忘记密码？</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>还没有账号？</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>注册</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: '#ddd',
  },
  input: {
    fontSize: 16,
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFlex: {
    flex: 1,
  },
  codeButton: {
    marginLeft: 8,
    backgroundColor: '#00BFA5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  codeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#00BFA5',
    textAlign: 'center',
    marginBottom: 16,
  },
  forgotPassword: {
    color: '#00BFA5',
    textAlign: 'right',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  link: {
    color: '#00BFA5',
    marginLeft: 4,
    fontSize: 14,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
});