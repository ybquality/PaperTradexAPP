import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const AccountDetail = ({ navigation, accountsInfo, accountName }) => {
  const [ accountInfo, setAccountInfo ] = useState(null);

  useEffect(() => {
    // 在 useEffect 中处理状态更新，避免无限循环
    const matchingAccount = accountsInfo.find(element => element.account_name_new === accountName);
    if (matchingAccount) {
      setAccountInfo(matchingAccount);
    }
  }, [accountName, accountsInfo]);
  
  // 使用 useCallback 优化按钮点击处理
  const handleManagePress = useCallback(() => {
    navigation.navigate('AccountManage', { accountInfo });
  }, [navigation, accountInfo]);

  return (
    <View style={styles.container}>
      {/* 总资产区域 */}
      <View style={styles.assetSection}>
        <View style={styles.assetHeader}>
          <Text style={styles.assetTitle}>总资产折合（USDT）</Text>
          <Icon name="eye-outline" type="ionicon" size={18} color="#666" />
        </View>
        <Text style={styles.assetAmount}>5.19116118</Text>
      </View>

      {/* 账户信息区域 */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>交易所</Text>
          <Text style={styles.infoValue}>OKX</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>账户类型</Text>
          <Text style={styles.infoValue}>API账户</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>返现</Text>
          <Text style={styles.infoValue}>5%</Text>
        </View>
      </View>

      {/* 操作按钮区域 */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Icon name="repeat" type="feather" size={24} color="#000" />
          <Text style={styles.buttonText}>划转</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}>
          <Icon name="file-text" type="feather" size={24} color="#000" />
          <Text style={styles.buttonText}>流水</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={handleManagePress}
        >
          <Icon name="settings" type="feather" size={24} color="#000" />
          <Text style={styles.buttonText}>管理</Text>
        </TouchableOpacity>
      </View>

      {/* 交易账户标题 */}
      <View style={styles.tradingSection}>
        <Text style={styles.tradingTitle}>交易账户</Text>
      </View>

      {/* 资产列表 */}
      <View style={styles.assetList}>
        <View style={styles.assetItem}>
          <View style={styles.assetItemLeft}>
            <Icon 
              name="currency-usd" 
              type="material-community" 
              size={40} 
              color="#4CAF50" 
            />
            <Text style={styles.assetName}>PEPE</Text>
          </View>
          <View style={styles.assetItemRight}>
            <Text style={styles.assetBalance}>141460.82291188</Text>
            <Text style={styles.assetValue}>≈ $2.69</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  assetSection: {
    padding: 16,
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  assetTitle: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 1)',
  },
  assetAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
    marginTop: 8,
  },
  infoSection: {
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 8,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  tradingSection: {
    padding: 16,
  },
  tradingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
  },
  assetList: {
    padding: 16,
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  assetItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
  },
  assetItemRight: {
    alignItems: 'flex-end',
  },
  assetBalance: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
  },
  assetValue: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop: 4,
  },
});

export default AccountDetail;