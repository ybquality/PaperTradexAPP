import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import request from '../../utils/request';
import { REGISTER_ACCOUNT, GET_VERIFY_CODE } from '../../utils/pathMap';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);

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
    if (!isValidPassword(password)) {
      alert('您的密码过短');
      return;
    }

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>注册</Text>

      {/* 用户名输入框 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>用户名</Text>
        <TextInput
          style={styles.input}
          placeholder="请输入用户名"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* 密码输入框 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>密码</Text>
        <TextInput
          style={styles.input}
          placeholder="请输入密码"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* 手机号输入框 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>手机号</Text>
        <TextInput
          style={styles.input}
          placeholder="+86 请输入手机号"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* 验证码输入框和发送验证码按钮 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>验证码</Text>
        <View style={styles.inputWithButton}>
          <TextInput
            style={styles.codeInput}
            placeholder="请输入验证码"
            placeholderTextColor="#aaa"
            keyboardType="number-pad"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity 
            style={[
              styles.codeButton,
              countdown > 0 && styles.disabledButton
            ]} 
            onPress={() => sendVerificationCode(phoneNumber)}
            disabled={countdown > 0}
          >
            <Text style={styles.codeButtonText}>
              {countdown > 0 ? `${countdown}s` : '发送验证码'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 注册按钮 */}
      <TouchableOpacity 
        style={[
          styles.button,
          !isFormValid() && styles.disabledButton
        ]} 
        onPress={() => handleRegister(username, password, phoneNumber, verificationCode)}
        disabled={!isFormValid()}
      >
        <Text style={styles.buttonText}>注册</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>已经有账号？</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>登录</Text>
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
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 16, // 增加到16或更高
    paddingHorizontal: 16,
    borderColor: '#ddd',
    fontSize: 16,
    minHeight: 50, // 确保有最小高度
  },
  codeInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    borderColor: '#ddd',
    fontSize: 16,
    minHeight: 50, // 确保有最小高度
  },
  codeButton: {
    marginLeft: 8,
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 12,
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
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});
