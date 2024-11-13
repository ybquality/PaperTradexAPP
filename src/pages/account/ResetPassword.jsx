import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ResetPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>重置密码</Text>

      {/* 手机号输入框 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>手机号</Text>
        <TextInput style={styles.input} placeholder="+86 请输入手机号" />
      </View>

      {/* 验证码输入框 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>验证码</Text>
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.flex]} placeholder="请输入验证码" />
          <TouchableOpacity style={styles.codeButton}>
            <Text style={styles.codeButtonText}>获取验证码</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 新密码输入框 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>密码</Text>
        <TextInput style={styles.input} placeholder="请输入新密码" secureTextEntry />
      </View>

      {/* 确认新密码输入框 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>确认密码</Text>
        <TextInput style={styles.input} placeholder="请输入新密码" secureTextEntry />
      </View>

      {/* 重置按钮 */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>重置</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  codeButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#00C1A4',
    borderRadius: 24,
  },
  codeButtonText: {
    color: '#00C1A4',
  },
  submitButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;
