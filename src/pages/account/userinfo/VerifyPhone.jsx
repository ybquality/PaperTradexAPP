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


const VerifyPhoneScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isCodeFocused, setIsCodeFocused] = useState(false);

  const getVerifyCode = async( phone ) => {
    // 需要添加参数验证判断
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
        alert(res.data.msg);
        console.log(res.data.msg);
        
      } else {
        // 验证码发送失败
        alert(res.data.msg);
        console.log(res.data.msg);
        
      }
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  };
  const handleSubmit = async (phone, code) => {
    // navigation.navigate('SetNewPhone');
    // 添加验证逻辑
    try {
      const res = await request.post('/api/user/verifyPhone', {
        phone: phone,
        verifyCode: code,
      });
      // 处理返回结果
      if (res.data.code === 200) {
        // 验证成功
        if (res.data.data){
          alert(res.data.msg);
          console.log(res.data.msg);
          // 跳转至设置新手机号页面
          navigation.navigate('SetNewPhone', {oldPhone: phone});
        }
      } else {
        // 验证失败
        alert(res.data.msg);
        console.log(res.data.msg);
      }
    
    } catch (error) {
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
        <Text style={styles.title}>验证手机号</Text>
        <Text style={styles.label}>当前手机号</Text>
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
              placeholder="请输入当前手机号"
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

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => handleSubmit(phone, code)}
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
});

export default VerifyPhoneScreen;
