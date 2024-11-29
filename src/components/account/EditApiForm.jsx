import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import request from '../../utils/request';

const EditApiForm = ({ onClose, onSave, initialValues, userBindExchangeId }) => {
  const [formData, setFormData] = useState({
    apiKey: initialValues.apiKey || '',
    secretKey: initialValues.secretKey || '',
    password: initialValues.password || '',
  });

  // 添加显示/隐藏状态
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  // 修改账户信息函数
  const changeExchangeApiInfo = async (user_bind_exchange_id, apiKey, secretKey, passPhrase) => {
    // 这里添加修改名称逻辑

    await request.put('/api/exchange/changeExchangeApiInfo', {user_bind_exchange_id: user_bind_exchange_id, api_key: apiKey, secret_key: secretKey, Passphrase: passPhrase})
    .then(response => {
      console.log(response);
      if (response.data.code === 200) {
        alert('修改成功');
      }else{
        alert(response.data.msg);
      }
    })
    .catch(error => {
      console.error(error);
      alert('修改失败');  // 添加错误处理
    })
  }

  
  // 保存api账户函数
  const handleSave = () => {
    changeExchangeApiInfo(userBindExchangeId, formData.apiKey, formData.secretKey, formData.password)
    onSave(formData);
  };

  // 渲染输入框组件
  const renderInput = (label, field, value, showValue, toggleShow) => (
    <View style={styles.inputItem}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <Icon 
            name="lock" 
            type="font-awesome" 
            size={16} 
            color="#999"
            containerStyle={styles.lockIcon}
          />
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => setFormData(prev => ({ ...prev, [field]: text }))}
            placeholder={`请输入${label}`}
            placeholderTextColor="#999"
            secureTextEntry={!showValue}
            returnKeyType="done"
          />
          <TouchableOpacity 
            onPress={toggleShow}
            style={styles.eyeIconButton}
          >
            <Icon 
              name={showValue ? "eye" : "eye-slash"} 
              type="font-awesome" 
              size={16} 
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // 遮挡显示函数
  const maskValue = (value, type) => {
    if (!value) return '';
    const length = value.length;
    
    switch (type) {
      case 'apiKey':
        if (length <= 6) return value;
        return value.substring(0, 6) + '*'.repeat(Math.min(length - 6, 50)); // 限制最大重复次数
      case 'secretKey':
      case 'password':
        return '*'.repeat(Math.min(length, 50)); // 限制最大重复次数
      default:
        return value;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>编辑API</Text>
      </View>

      <View style={styles.form}>
        {renderInput(
          'API KEY', 
          'apiKey', 
          showApiKey ? formData.apiKey : maskValue(formData.apiKey, 'apiKey'),
          showApiKey,
          () => setShowApiKey(!showApiKey)
        )}
        {renderInput(
          'Secret KEY', 
          'secretKey', 
          showSecretKey ? formData.secretKey : maskValue(formData.secretKey, 'secretKey'),
          showSecretKey,
          () => setShowSecretKey(!showSecretKey)
        )}
        {renderInput(
          '密码（选填）', 
          'password', 
          showPassword ? formData.password : maskValue(formData.password, 'password'),
          showPassword,
          () => setShowPassword(!showPassword)
        )}
      </View>

      <Button
        title="确定"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(17, 24, 39, 1)',
    textAlign: 'left',
  },
  closeButton: {
    padding: 8,
  },
  form: {
    marginTop: 16,
  },
  inputItem: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(17, 24, 39, 1)',
    marginBottom: 8,
  },
  inputWrapper: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  lockIcon: {
    marginRight: 8,
    width: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  eyeIconButton: {
    height: '100%',
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 16,
    width: '100%',
    paddingHorizontal: 0,
  },
  button: {
    backgroundColor: '#80FFE9',
    height: 44,
    borderRadius: 32,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default EditApiForm;
