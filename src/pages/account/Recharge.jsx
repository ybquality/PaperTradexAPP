import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Clipboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Tooltip } from 'react-native-elements';

const RechargePage = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('5000');
  const [address, setAddress] = useState('');
  const [showToast, setShowToast] = useState(false);

  // 模拟不同网络对应的地址数据
  const networkAddresses = {
    'networkA': {
      address: 'T9zsjL2vmTXCjTiv1xGPuAbbi1ygzTrPuo',
      qrCode: 'https://files.catbox.moe/cply95.png'
    },
    'networkB': {
      address: '0x1E13e0f60990bF010FadBf1C8Ed98B3042149D12',
      qrCode: 'https://files.catbox.moe/cply95.png'
    }
  };

  // 当选择网络时自动更新地址和二维码
  useEffect(() => {
    if (selectedNetwork && networkAddresses[selectedNetwork]) {
      setAddress(networkAddresses[selectedNetwork].address);
    } else {
      setAddress('');
    }
  }, [selectedNetwork]);

  // 复制文本到剪贴板
  const copyToClipboard = async (text) => {
    try {
      await Clipboard.setString(text);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1500);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 充币网络 */}
      <Text style={styles.label}>充币网络</Text>
      <View style={styles.inputWrapper}>
        <Picker
          selectedValue={selectedNetwork}
          onValueChange={(itemValue) => setSelectedNetwork(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="请选择" value="" />
          <Picker.Item label="Tron（TRC20）" value="networkA" />
          <Picker.Item label="Ethereum（ERC20）" value="networkB" />
        </Picker>
      </View>

      {/* 充值金额 */}
      <Text style={styles.label}>充值金额</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={rechargeAmount}
          onChangeText={setRechargeAmount}
          keyboardType="numeric"
          placeholder="请输入充值金额"
        />
        <TouchableOpacity 
          style={styles.copyButton}
          onPress={() => copyToClipboard(rechargeAmount)}
        >
          <Image 
            source={require('../../../assets/icon/copy.png')} 
            style={styles.copyIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.warningText}>
        务必按照充值金额+UUID生成的特定金额充值，若小数位后数值不匹配，将无法入账
      </Text>

      {/* 充币地址 */}
      <Text style={styles.label}>充币地址</Text>
      <View style={[styles.inputWrapper, !selectedNetwork && styles.inputDisabled]}>
        <TextInput
          style={styles.input}
          value={address}
          editable={false}
          placeholder="请选择充币网络"
          placeholderTextColor="#999"
        />
        <TouchableOpacity 
          style={styles.copyButton}
          disabled={!address}
          onPress={() => address && copyToClipboard(address)}
        >
          <Image 
            source={require('../../../assets/icon/copy.png')} 
            style={[styles.copyIcon, !address && styles.iconDisabled]}
          />
        </TouchableOpacity>
      </View>

      {/* 二维码 - 根据选择的网络显示 */}
      {selectedNetwork && (
        <View style={styles.qrContainer}>
          <Image
            source={{ uri: networkAddresses[selectedNetwork].qrCode }}
            style={styles.qrCode}
          />
        </View>
      )}

      {/* 中央提示 */}
      <Modal
        transparent
        visible={showToast}
        animationType="fade"
        onRequestClose={() => setShowToast(false)}
      >
        <View style={styles.toastContainer}>
          <View style={styles.toastContent}>
            <Text style={styles.toastText}>已复制到剪贴板</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 32,
    height: 48,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#333', // 设置文字颜色
  },
  picker: {
    flex: 1,
    height: '100%',
  },
  copyButton: {
    padding: 12,
    marginRight: 4,
  },
  copyIcon: {
    width: 20,
    height: 20,
  },
  warningText: {
    fontSize: 12,
    color: 'rgba(255, 153, 159, 1)',
    backgroundColor: 'rgba(255, 153, 159, 0.12)',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  qrCode: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  inputDisabled: {
    backgroundColor: '#F5F5F5',
  },
  iconDisabled: {
    opacity: 0.5,
  },
  toastContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  toastContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default RechargePage;
