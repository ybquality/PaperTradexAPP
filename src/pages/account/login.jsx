import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../../utils/request';
import api from '../../utils/Interceptor';
import { ACCOUNT_LOGIN, ACCOUNT_LOGIN_PHONE, GET_VERIFY_CODE } from '../../utils/pathMap';
import { Button, Dialog,Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/MaterialIcons';


export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  const [isPhoneLogin, setIsPhoneLogin] = useState(true); // 控制切换
  const [countdown, setCountdown] = useState(0); // 移动到组件内部
  const [isLoading, setIsLoading] = useState(false); // 添加加载状态
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    setIsLoading(true); // 开始加载
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
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      // 添加网络错误处理
      if (error.message === 'Network Error') {
        alert('网络连接失败，请检查网络后重试');
      } else {
        alert('发送验证码失败，请稍后重试');
      }
      console.log('Error:', error);
    } finally {
      setIsLoading(false); // 结束加载
    }
  }

  const handlePhoneLogin = async (phone, verifyCode, navigator) => {
    setLoginLoading(true);
    setDialogVisible(true);
    setErrorMessage('');
    try {
      const response = await api.post(ACCOUNT_LOGIN_PHONE, {
        phone,
        verifyCode,
      });

      if (response.data.code === 200) {
        const { accessToken, refreshToken, userName, Uid } = response.data.data;
        // 存储 token
        await AsyncStorage.multiSet([
          ['accessToken', accessToken],
          ['refreshToken', refreshToken],
          ['userName', userName],
          ['Uid', Uid],
          ['isLogin', 'true']
        ]);

        setLoginSuccess(true);
      } else {
        setErrorMessage(response.data.msg);
        setLoginSuccess(false);
      }
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('登录失败，请稍后重试');
      setLoginSuccess(false);
    } finally {
      setLoginLoading(false);
    }
  };

  // 修改手机号登录验证函数
  const isPhoneLoginValid = () => {
    return isValidPhone(phone) && verificationCode.length > 0;
  };

  const isPasswordLoginValid = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleConfirm = () => {
    setDialogVisible(false);
    if (loginSuccess) {
      navigation.goBack();
    }
  };
  const handleUsernamePasswordLogin = async (username, password, navigator) => {
    setLoginLoading(true);
    setDialogVisible(true);
    setErrorMessage('');
    try {
      const response = await api.post(ACCOUNT_LOGIN, {
        username,
        password,
      });
      
      if (response.data.code == 200) {
        const { accessToken, refreshToken, userName, Uid } = response.data.data;
        await AsyncStorage.multiSet([
          ['accessToken', accessToken],
          ['refreshToken', refreshToken],
          ['userName', userName],
          ['Uid', Uid],
          ['isLogin', 'true']
        ]);
        setLoginSuccess(true);
      } else {
        setErrorMessage(response.data.msg);
        setLoginSuccess(false);
      }
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('登录失败，请稍后重试');
      setLoginSuccess(false);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>登录</Text>

          {/* 切换按钮 */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tabButton, isPhoneLogin && styles.tabButtonActive]}
              onPress={() => setIsPhoneLogin(true)}
            >
              <Text style={[styles.tabText, isPhoneLogin && styles.tabTextActive]}>手机号</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, !isPhoneLogin && styles.tabButtonActive]}
              onPress={() => setIsPhoneLogin(false)}
            >
              <Text style={[styles.tabText, !isPhoneLogin && styles.tabTextActive]}>用户名</Text>
            </TouchableOpacity>
          </View>

          {isPhoneLogin ? (
            // 手机号登录
            <>
              <Text style={styles.label}>手机号</Text>
              <View style={[
                styles.inputContainer,
                isPhoneFocused && styles.inputContainerFocused
              ]}>
                <Icon
                  name="smartphone"
                  type="feather"
                  size={20}
                  color="rgba(0, 0, 0, 0.4)"
                  style={styles.inputIcon}
                />
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  style={styles.input}
                  placeholder="请输入手机号"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  returnKeyType="next"
                  keyboardType="number-pad"
                  onFocus={() => setIsPhoneFocused(true)}
                  onBlur={() => setIsPhoneFocused(false)}
                />
              </View>

              <Text style={[styles.label, { marginTop: 24 }]}>验证码</Text>
              <View style={[
                styles.inputContainer,
                isCodeFocused && styles.inputContainerFocused
              ]}>
                <Icon
                  name="shield"
                  type="feather"
                  size={20}
                  color="rgba(0, 0, 0, 0.4)"
                  style={styles.inputIcon}
                />
                <TextInput
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  style={styles.input}
                  placeholder="请输入验证码"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  returnKeyType="done"
                  keyboardType="number-pad"
                  maxLength={4}
                  onFocus={() => setIsCodeFocused(true)}
                  onBlur={() => setIsCodeFocused(false)}
                />
                <TouchableOpacity 
                  style={styles.codeButton}
                  onPress={() => sendVerifyCode(phone)}
                  disabled={countdown > 0}
                >
                  <Text style={styles.codeButtonText}>
                    {countdown > 0 ? `${countdown}s` : '获取验证码'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            // 用户名密码登录
            <>
              <Text style={styles.label}>用户名</Text>
              <View style={[
                styles.inputContainer,
                isUsernameFocused && styles.inputContainerFocused
              ]}>
                <Icon
                  name="user"
                  type="feather"
                  size={20}
                  color="rgba(0, 0, 0, 0.4)"
                  style={styles.inputIcon}
                />
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                  placeholder="请输入用户名"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  returnKeyType="next"
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                />
              </View>

              <Text style={[styles.label, { marginTop: 24 }]}>密码</Text>
              <View style={[
                styles.inputContainer,
                isPasswordFocused && styles.inputContainerFocused
              ]}>
                <Icon
                  name="lock"
                  type="feather"
                  size={20}
                  color="rgba(0, 0, 0, 0.4)"
                  style={styles.inputIcon}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  placeholder="请输入密码"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  returnKeyType="done"
                  secureTextEntry={!showPassword}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Icon
                    name={showPassword ? "eye" : "eye-off"}
                    type="feather"
                    size={20}
                    color="rgba(0, 0, 0, 0.4)"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* 注册链接 */}
          <View style={styles.registerContainer}>
            <Text style={styles.footerText}>还没有账号？</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>注册</Text>
            </TouchableOpacity>
          </View>

          {/* 登录按钮 */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => isPhoneLogin 
              ? handlePhoneLogin(phone, verificationCode, navigation)
              : handleUsernamePasswordLogin(username, password, navigation)
            }
          >
            <Text style={styles.submitText}>登录</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Dialog isVisible={dialogVisible} overlayStyle={styles.dialog}>
        <View style={styles.dialogContent}>
          {loginLoading ? (
            <Dialog.Loading />
          ) : loginSuccess ? (
            <>
              <Icon name="check-circle" size={50} color="#00BFA5" />
              <Text style={styles.dialogText}>登录成功</Text>
              <Button
                title="确认"
                onPress={handleConfirm}
                buttonStyle={styles.dialogButton}
                containerStyle={styles.dialogButtonContainer}
              />
            </>
          ) : (
            <>
              <Icon name="cancel" size={50} color="#FF6B6B" />
              <Text style={styles.dialogErrorText}>{errorMessage}</Text>
              <Button
                title="确认"
                onPress={handleConfirm}
                buttonStyle={styles.dialogButton}
                containerStyle={styles.dialogButtonContainer}
              />
            </>
          )}
        </View>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    // paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  inputContainerFocused: {
    borderColor: 'rgba(0, 208, 172, 1)',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.9)',
    padding: 0,
  },
  codeButton: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 208, 172, 1)',
  },
  eyeButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    height: 48,
    backgroundColor: '#000000',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  tabTextActive: {
    color: '#000000',
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  link: {
    fontSize: 14,
    color: 'rgba(0, 208, 172, 1)',
    marginLeft: 4,
  },
  dialog: {
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  dialogContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogText: {
    fontSize: 18,
    marginVertical: 20,
    color: '#333',
  },
  dialogButton: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderRadius: 25,
    paddingVertical: 12,
  },
  dialogButtonContainer: {
    width: '100%',

  },
  dialogErrorText: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
});