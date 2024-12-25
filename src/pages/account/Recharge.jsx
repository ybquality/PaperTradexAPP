import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Clipboard, Image, AppState } from 'react-native';
import Popup from '../../components/common/popup';
import { Icon } from '@rneui/themed';
import QRCode from 'react-native-qrcode-svg';

import AsyncStorage from '@react-native-async-storage/async-storage';


import { getId } from '../../utils/tokenUtils';
import request from '../../utils/request';
import { use } from 'react';


// 订单状态请求函数
const fetchOrderStatus = async (orderId) => {
  try {
    const res = await request.post('/api/rechargeRecord/getRechargeStatus', { orderId });
    const data = res.data;

    console.log('Order status:', data.data.status);
    return data;
  } catch (error) {
    console.error('Error fetching order status:', error);
    return null;
  }
};

const RechargePage = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('100');
  const [address, setAddress] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [tempNetwork, setTempNetwork] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showNetworkPopup, setShowNetworkPopup] = useState(true);

  const [userUUID, setUserUUID] = useState(null);
  const [orderId, setOrderId] = useState(null); // 用来存储orderId
  const [paymentSuccess, setPaymentSuccess] = useState(false); // 支付状态
  const intervalRef = useRef(null); // 用来存储 intervalId
  const timeoutRef = useRef(null); // 用来存储 timeoutId

  // 用户UUID
  useEffect(() => {

    const fetchData = async () => {
      setUserUUID(await getId());
    }
    fetchData();
  }, []);

  

  const getUserBalance = async () => {
    const res = await request.get('/api/user/getAccountBalance')
    if(res.data.code === 200) {
      AsyncStorage.setItem('AccountBalance', res.data.data.balance.toString());
    }
  }

  // 请求充值链上地址
  const networkAddresses = {
    'TRC20': {
      address: 'T9zsjL2vmTXCjTiv1xGPuAbbi1ygzTrPuo'
    },
    'ERC20': {
      address: '0x1E13e0f60990bF010FadBf1C8Ed98B3042149D12'
    },
    'BEP20': {
      address: '0x1E13e0f60990bF010FadBf1C8Ed98B3042149D12'
    },
    'POLYGON': {
      address: '0x1E13e0f60990bF010FadBf1C8Ed98B3042149D12'
    },
    'ARBITRUM': {
      address: '0x1E13e0f60990bF010FadBf1C8Ed98B3042149D12'
    },
    'OPTIMISM': {
      address: '0x1E13e0f60990bF010FadBf1C8Ed98B3042149D12'
    },
    'BASE': {
      address: '0x1E13e0f60990bF010FadBf1C8Ed98B3042149D12'
    }
  };

  // 请求支付状态的定时器函数
  const startPolling = useCallback(() => {
    if (orderId) {
      // 创建请求状态的定时器
      intervalRef.current = setInterval(async () => {
        const data = await fetchOrderStatus(orderId);
        if (data && data.data.status === 1) {
          console.log('Payment successful');
          setPaymentSuccess(true); // 支付成功
          clearInterval(intervalRef.current); // 停止定时器
          clearTimeout(timeoutRef.current); // 清除超时定时器
          await getUserBalance();
        }
      }, 15000); // 每 15 秒请求一次

      // 设置一个小时的超时定时器
      timeoutRef.current = setTimeout(() => {
        console.log('Polling timed out after 1 hour');
        clearInterval(intervalRef.current); // 停止定时器
      }, 3600000); // 1小时（3600000ms）
    }
  }, [orderId]);


  // 停止定时器
  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);


  // 订单创建函数
  const createOrder = async (chainName) => {
    try {
      const ret = await request.post('/api/rechargeRecord/createOrder', {
        chainName
      });

      if (ret.data.code === 200) {
        console.log(ret.data)
        const newOrderId = ret.data.data.orderId;
        setOrderId(newOrderId);
        startPolling(); // 启动定时器
      } else {
        console.log(ret.data.msg)
      }
    } catch (err) {
      console.log(err)
    }
  };

  // 使用 useEffect 监听 orderId 的变化，当 orderId 变动时启动轮询
  useEffect(() => {
    if (orderId) {
      startPolling(); // 只有 orderId 存在时才开始轮询
    }

    // 清理函数，组件卸载时清除定时器
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [orderId, startPolling]); // 依赖 orderId

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

  // 处理网络选择确认
  const handleConfirmNetwork = () => {
    setSelectedNetwork(tempNetwork);
    setShowPicker(false);
  };

  // 处理取消选择
  const handleCancelNetwork = () => {
    setTempNetwork(selectedNetwork);
    setShowPicker(false);
  };

  const getNetworkDisplayText = () => {
    const network = networkOptions.find(option => option.value === selectedNetwork);
    return network ? network.label : '请选择';
  };

  // 定义下拉选项数据
  const networkOptions = [
    {
      label: 'Tron（TRC20）',
      value: 'TRC20',
      icon: require('../../../assets/icon/tron.png')
    },
    {
      label: 'Ethereum（ERC20）',
      value: 'ERC20',
      icon: require('../../../assets/icon/eth.png')
    },
    {
      label: 'BNB Smart Chain（BEP20）',
      value: 'BEP20',
      icon: require('../../../assets/icon/bsc.png')
    },
    {
      label: 'Polygon POS',
      value: 'POLYGON',
      icon: require('../../../assets/icon/polygon.png')
    },
    {
      label: 'Arbitrum One',
      value: 'ARBITRUM',
      icon: require('../../../assets/icon/arbitrum.png')
    },
    {
      label: 'Optimism',
      value: 'OPTIMISM',
      icon: require('../../../assets/icon/optimism.png')
    },
    {
      label: 'Base',
      value: 'BASE',
      icon: require('../../../assets/icon/base.png')
    }
  ];



  // 处理充值金额的变化
  const handleAmountChange = (value) => {
    // 只允许输入数字
    const numericValue = value.replace(/[^0-9]/g, '');
    setRechargeAmount(numericValue);
  };

  // 处理输入框获得焦点
  const handleFocus = () => {
    setIsEditing(true);
  };

  // 处理输入框失去焦点
  const handleBlur = () => {
    setIsEditing(false);
  };

  // 获取显示值
  const getDisplayAmount = () => {
    // 编辑时显示纯数字
    if (isEditing) {
      return rechargeAmount;
    }
    // 非编辑状态显示带 UUID 的值
    return rechargeAmount ? `${rechargeAmount}.${userUUID}` : '';
  };

  // 获取用于复制的值
  const getCopyAmount = () => {
    return rechargeAmount ? `${rechargeAmount}.${userUUID}` : '';
  };

  // 处理网络选择
  const handleNetworkSelect = async (network) => {
    setSelectedNetwork(network);
    setShowNetworkPopup(false);
  };

  return (
    <View style={styles.container}>
      {/* 充币网络 */}
      <Text style={styles.label}>充币网络</Text>
      <TouchableOpacity
        style={styles.networkSelector}
        onPress={() => setShowNetworkPopup(true)}
      >
        <Text style={[
          styles.networkText,
          !selectedNetwork && styles.placeholderText
        ]}>
          {selectedNetwork ? getNetworkDisplayText() : '请选择充值网络'}
        </Text>
        <Icon
          name="chevron-down"
          type="feather"
          size={20}
          color="#999"
        />
      </TouchableOpacity>

      {/* 网络选择弹窗 */}
      <Popup
        visible={showNetworkPopup}
        onClose={() => setShowNetworkPopup(false)}
        closeOnMaskClick={true}
        position="bottom"
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>选择充值网络</Text>
          <Text style={styles.networkTip}>
            所有充值网络地址只接收USDT，请务必确认您发送的是对应网络的USDT，否则资产将无法找回
          </Text>
          {networkOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.networkOption}
              onPress={() => {
                handleNetworkSelect(option.value);
                createOrder(option.value);
                console.log('选择了网络');
              }}
            >
              <View style={styles.networkOptionLeft}>
                <Image
                  source={option.icon}
                  style={styles.networkIcon}
                />
                <Text style={[
                  styles.networkOptionText,
                  selectedNetwork === option.value && styles.networkOptionSelected
                ]}>
                  {option.label}
                </Text>
              </View>
              {selectedNetwork === option.value && (
                <Icon
                  name="check"
                  type="feather"
                  size={20}
                  color="#007AFF"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Popup>

      {/* 充值金额 */}
      <Text style={styles.label}>充值金额</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={getDisplayAmount()}
          onChangeText={handleAmountChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType="numeric"
          placeholder="请输入充值金额"
          returnKeyType="done"
          returnKeyLabel="完成"
        />
        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => copyToClipboard(getCopyAmount())}
        >
          <Icon
            name="copy"
            type="feather"
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.warningText}>
        此地址只支持USDT，务必按照充值金额+UUID生成的特定金额充值，若小数位后数值不匹配，将无法入账
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
          <Icon
            name="copy"
            type="feather"
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* 二维码 - 根据选择的网络显示 */}
      {selectedNetwork && address && (
        <View style={styles.qrContainer}>
          <QRCode
            value={address || ''}
            size={200}
            backgroundColor="white"
            color="black"
            logo={require('../../../assets/icon/usdt.png')}
            logoSize={32}
            logoBackgroundColor='white'
            logoMargin={2}
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
  networkSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
  },
  networkText: {
    fontSize: 14,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  popupContent: {
    padding: 16,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(17, 24, 39, 1)',
    marginBottom: 12,
  },
  networkOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  networkOptionText: {
    fontSize: 14,
    color: '#333',
  },
  networkOptionSelected: {
    color: '#007AFF',
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  networkOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  networkIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  networkTip: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 12,
  },
});

export default RechargePage;
