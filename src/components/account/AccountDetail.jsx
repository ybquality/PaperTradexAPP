import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const AccountDetail = ({ navigation, accountsInfo, accountName }) => {
  
  const [ accountInfo, setAccountInfo ] = useState(null);
  console.log('AccountDetail:', accountsInfo);
  console.log('AccountDetail:', accountName);

  useEffect(() => {
    // 在 useEffect 中处理状态更新，避免无限循环
    const matchingAccount = accountsInfo.find(element => element.account_name_new === accountName);
    if (matchingAccount) {
      setAccountInfo(matchingAccount);
    }
  }, [accountName, accountsInfo]); // 只有当 accountName 或 accountsInfo 改变时才执行
  
  return (
    <View style={styles.container}>
      {/* 总资产区域 */}
      <View style={styles.assetSection}>
        <View style={styles.assetHeader}>
          <Text style={styles.assetTitle}>总资产折合[USDT]</Text>
          <Icon name="eye-outline" type="ionicon" size={18} color="#666" />
        </View>
        <Text style={styles.assetAmount}>5.19116118</Text>
        <Text style={styles.assetUSD}>≈ $5.19</Text>
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
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>划转</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>流水</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('AccountManage', { accountInfo })}
        >
          <Text style={styles.actionText}>管理</Text>
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
    fontSize: 14,
    color: '#666',
  },
  assetAmount: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  assetUSD: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  infoSection: {
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
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
    paddingVertical: 16,
    backgroundColor: '#f5f5f5',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#333',
  },
  tradingSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  tradingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
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
    color: '#333',
    fontWeight: '500',
  },
  assetItemRight: {
    alignItems: 'flex-end',
  },
  assetBalance: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  assetValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default AccountDetail;