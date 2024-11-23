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

const BindEmailScren = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isCodeFocused, setIsCodeFocused] = useState(false);

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
        <Text style={styles.title}>绑定邮箱</Text>
          <Text style={styles.label}>邮箱</Text>
          <View style={[
            styles.inputContainer,
            isEmailFocused && styles.inputContainerFocused
          ]}>
            <Icon
              name="mail"
              type="feather"
              size={20}
              color="rgba(0, 0, 0, 0.4)"
              style={styles.inputIcon}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="请输入邮箱"
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              returnKeyType="done"
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
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
            <TouchableOpacity style={styles.codeButton}>
              <Text style={styles.codeButtonText}>获取验证码</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>绑定</Text>
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

export default BindEmailScren;
