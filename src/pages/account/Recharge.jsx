import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // expo install @react-native-picker/picker

const RechargePage = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('5000');
  const [address, setAddress] = useState('');

  return (
    <View style={styles.container}>
      {/* 充币网络 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>充币网络</Text>
        <View style={styles.row}>
          <Picker
            selectedValue={selectedNetwork}
            onValueChange={(itemValue) => setSelectedNetwork(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="请选择" value="" />
            <Picker.Item label="网络A" value="networkA" />
            <Picker.Item label="网络B" value="networkB" />
          </Picker>
        </View>
      </View>

      {/* 充值金额 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>充值金额</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={rechargeAmount}
            onChangeText={setRechargeAmount}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.copyButton}>
            <Text style={styles.copyText}>复制</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.warningText}>
          务必按照充值金额+UUID生成的特定金额充值，若小数位后数值不匹配，将无法入账
        </Text>
      </View>

      {/* 充币地址 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>充币地址</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="请输入内容"
          />
          <TouchableOpacity style={styles.copyButton}>
            <Text style={styles.copyText}>复制</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 二维码显示 */}
      <View style={styles.qrContainer}>
        <Image
          source={{ uri: 'https://example.com/qr-code.png' }} // 替换成实际二维码URL
          style={styles.qrCode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  picker: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  copyButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  copyText: {
    fontSize: 14,
    color: '#333',
  },
  warningText: {
    marginTop: 8,
    fontSize: 12,
    color: '#FF6F61',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrCode: {
    width: 150,
    height: 150,
  },
});

export default RechargePage;
