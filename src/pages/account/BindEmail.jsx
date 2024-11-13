import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const BindEmailScren = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>绑定邮箱</Text>

      {/* 邮箱输入框 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>邮箱</Text>
        <TextInput style={styles.input} placeholder="请输入邮箱" />
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

      {/* 绑定按钮 */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>绑定</Text>
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

export default BindEmailScren;
