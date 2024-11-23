import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

import request from '../../utils/request';
import { REGISTER_ACCOUNT, GET_VERIFY_CODE } from '../../utils/pathMap';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');

  const isValidPhone = (phone) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const sendVerificationCode = async (phone) => {
    if (!isValidPhone(phone)) {
      alert('请输入正确的手机号码');
      return;
    }

    try {
      const response = await request.post(GET_VERIFY_CODE, {
        phone,
      });

      if (response.data && response.data.code == 200) {
        alert('发送验证码成功');
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
        alert(`验证码发送失败: ${response.data.msg}`);
      }
    } catch (error) {
      alert('验证码发送失败，请稍后再试');
      console.log(error);
    }
  };

  const isValidPassword = (password) => {
    return password.length >= 5;
  };

  const handleRegister = async (username, password, phone, verifyCode) => {
    try {
      const response = await request.post(REGISTER_ACCOUNT, {
        username,
        password,
        phone,
        verifyCode,
      });

      if (response.data && response.data.code == 200) {
        alert(response.data.msg);
        navigation.navigate('Login');
      } else {
        alert(`注册失败: ${response.data.msg}`);
      }
    } catch (error) {
      alert('注册失败，请稍后再试');
      console.log(error);
    }
  };

  const isFormValid = () => {
    return (
      username.length > 0 && 
      isValidPassword(password) && 
      isValidPhone(phoneNumber) && 
      verificationCode.length > 0
    );
  };

  const isUsernameValid = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>注册</Text>

          {/* 用户名输入框 */}
          <Text style={styles.label}>用户名</Text>
          <View style={[
            styles.inputContainer,
            isUsernameFocused && styles.inputContainerFocused,
            username.length > 0 && !isUsernameValid(username) && styles.inputContainerError
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
              onChangeText={(text) => {
                setUsername(text);
                if (text.length > 0) {
                  if (text.length < 3) {
                    setUsernameError('用户名至少3个字符');
                  } else if (text.length > 20) {
                    setUsernameError('用户名最多20个字符');
                  } else if (!/^[a-zA-Z0-9_]*$/.test(text)) {
                    setUsernameError('用户名只能包含字母、数字和下划线');
                  } else {
                    setUsernameError('');
                  }
                } else {
                  setUsernameError('');
                }
              }}
              style={styles.input}
              placeholder="请输入用户名"
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              returnKeyType="done"
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
            />
          </View>
          {usernameError ? (
            <Text style={styles.errorText}>{usernameError}</Text>
          ) : null}

          {/* 密码输入框 */}
          <Text style={[styles.label, { marginTop: 24 }]}>密码</Text>
          <View style={[
            styles.inputContainer,
            isPasswordFocused && styles.inputContainerFocused,
            password.length > 0 && !isValidPassword(password) && styles.inputContainerError
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

          {/* 手机号输入框 */}
          <Text style={[styles.label, { marginTop: 24 }]}>手机号</Text>
          <View style={[
            styles.inputContainer,
            isPhoneFocused && styles.inputContainerFocused,
            phoneNumber.length > 0 && !isValidPhone(phoneNumber) && styles.inputContainerError
          ]}>
            <Icon
              name="smartphone"
              type="feather"
              size={20}
              color="rgba(0, 0, 0, 0.4)"
              style={styles.inputIcon}
            />
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
              placeholder="请输入手机号"
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              returnKeyType="done"
              keyboardType="phone-pad"
              onFocus={() => setIsPhoneFocused(true)}
              onBlur={() => setIsPhoneFocused(false)}
            />
          </View>

          {/* 验证码输入框 */}
          <Text style={[styles.label, { marginTop: 24 }]}>验证码</Text>
          <View style={[
            styles.inputContainer,
            isCodeFocused && styles.inputContainerFocused,
            verificationCode.length > 0 && verificationCode.length < 4 && styles.inputContainerError
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
              onPress={() => sendVerificationCode(phoneNumber)}
              disabled={countdown > 0}
              style={styles.codeButton}
            >
              <Text style={styles.codeButtonText}>
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.footerText}>已有账号？</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>登录</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => handleRegister(username, password, phoneNumber, verificationCode)}
            disabled={!isFormValid()}
          >
            <Text style={styles.submitText}>注册</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  inputContainerError: {
    borderColor: '#FF4D4F',
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
  errorText: {
    fontSize: 12,
    color: '#FF4D4F',
    marginTop: 4,
    marginLeft: 16,
  },
});
