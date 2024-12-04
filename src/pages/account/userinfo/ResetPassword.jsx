import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import NavBar from '../../../components/common/navbar';
import { Icon } from '@rneui/themed';

import request from '../../../utils/request';


const ResetPasswordScreen = ({ navigation }) => {
  
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (phone, code, password, confirmPassword) => {
    if (password !== confirmPassword) {
      setIsError(true);
      // 错误提示，等做完功能我来处理错误提示
    } else {
      setIsError(false);
      // 处理提交逻辑
      try {
        const res = await request.post('/api/user/auth/resetPassword', {
          phone: phone,
          verifyCode: code,
          new_password: confirmPassword,
        });
        // 处理返回结果
        if (res.data.code === 200) {
          // 密码修改成功
          alert(res.data.msg)
          console.log(res.data.msg);
          
       } else {}
      }catch (error) {
        // 处理错误
        console.error(error);
      }
    }
  };

  const getVerifyCode = async( phone ) => {
    if (phone === '') {
      alert('请输入手机号');
      return;
    }
    // 发送请求获取验证码
    try {
      const res = await request.post('/api/user/auth/getCode', {
        phone: phone,
      });
      // 处理返回结果
      if (res.data.code === 200) {
        // 验证码发送成功
        alert(res.data.msg)
        console.log(res.data.msg);
        
      } else {
        // 验证码发送失败
      }
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.navBarContainer}>
          <NavBar
            onBack={() => navigation.goBack()}
          >
          </NavBar>
        </View>
        
        <View style={styles.content}>
        <Text style={styles.title}>重置密码</Text>
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
              returnKeyType="done"
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
              value={code}
              onChangeText={setCode}
              style={styles.input}
              placeholder="请输入验证码"
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              returnKeyType="done"
              onFocus={() => setIsCodeFocused(true)}
              onBlur={() => setIsCodeFocused(false)}
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity style={styles.codeButton} onPress={() => getVerifyCode(phone)}>
              <Text style={styles.codeButtonText}>获取验证码</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.label, { marginTop: 24 }]}>密码</Text>
          <View style={[
            styles.inputContainer,
            isPasswordFocused && styles.inputContainerFocused,
            isError && styles.inputContainerError
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
              placeholder="请输入新密码"
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              returnKeyType="next"
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

          <Text style={[styles.label, { marginTop: 24 }]}>确认密码</Text>
          <View style={[
            styles.inputContainer,
            isConfirmPasswordFocused && styles.inputContainerFocused,
            isError && styles.inputContainerError
          ]}>
            <Icon
              name="lock"
              type="feather"
              size={20}
              color="rgba(0, 0, 0, 0.4)"
              style={styles.inputIcon}
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              placeholder="请确认新密码"
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              returnKeyType="done"
              secureTextEntry={!showConfirmPassword}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
            />
            <TouchableOpacity 
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeButton}
            >
              <Icon
                name={showConfirmPassword ? "eye" : "eye-off"}
                type="feather"
                size={20}
                color="rgba(0, 0, 0, 0.4)"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => handleSubmit(phone, code, password, confirmPassword)}
          >
            <Text style={styles.submitText}>确定</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  navBarContainer: {
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
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
    borderColor: '#FF4D4F',  // 错误状态下的红色边框
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
});

export default ResetPasswordScreen;
