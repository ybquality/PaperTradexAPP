// 资产总览页
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import AccountDetail from '../../../components/account/AccountDetail';

import request from '../../../utils/request';

const AssetsDetail = ({ navigation, route }) => {
  // 从路由参数获取选中的账户ID
  const selectedAccountId = route.params?.selectedAccount;
  const accountInfo = route.params?.accountInfo;
  

  console.log('Selected Account ID:', selectedAccountId);
  console.log('Accounts Info:', accountInfo);
  
  
  // 状态管理
  const [selectedTab, setSelectedTab] = useState(selectedAccountId || '总览');
  const [accountList, setAccountList] = useState(accountInfo || []); // 这里之后替换为实际的账户列表

  // 添加刷新状态管理
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    // 数据源还有余额没查询，暂时没有key来测试，还有就是接口报错问题没处理
    await request.get('/api/exchange/getUserBindExchanges')
    .then(response => {
      // Handle successful response
      setAccountList(response.data.data);

    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
  }
  // 模拟获取用户账户列表
  useEffect(() => {
    // 这里之后替换为实际的API调用
    // const fetchAccountList = async () => {
    //   const response = await api.getAccountList();
    //   setAccountList(response.data);
    // };
    // fetchAccountList();
  }, []);

  // 处理刷新的函数
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // 这里添加刷新数据的逻辑
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderContent = () => {
    if (selectedTab === '总览') {
      return (
        <ScrollView 
          style={styles.overviewContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#00D0AC']}  // Android
              tintColor="#00D0AC"   // iOS
            />
          }
        >
          {/* 总资产区域 */}
          <View style={styles.assetSection}>
            <View style={styles.assetHeader}>
              <Text style={styles.assetTitle}>总资产折合[USDT]</Text>
              <Icon name="eye-outline" type="ionicon" size={18} color="#666" />
            </View>
            <View style={styles.assetRow}>
              <Text style={styles.assetAmount}>5.19116118</Text>
              <Text style={styles.assetUSD}>≈ $5.19</Text>
            </View>
          </View>

          {/* 盈亏信息区域 */}
          <View style={styles.profitSection}>
            <View style={styles.profitRow}>
              <View style={styles.profitItem}>
                <Text style={styles.profitLabel}>今日盈亏</Text>
                <Text style={styles.profitValue}>+0.00</Text>
              </View>
              <View style={styles.profitItem}>
                <Text style={styles.profitLabel}>历史盈亏</Text>
                <Text style={styles.profitValue}>+0.00</Text>
              </View>
            </View>
          </View>

          {/* 操作按钮区域 */}
          <View style={styles.actionSection}>
            <Button
              title="接入账户"
              containerStyle={[styles.buttonContainer, styles.firstButton]}
              buttonStyle={styles.primaryButton}
              titleStyle={styles.primaryButtonText}
              onPress={() => {/* 处理接入账户 */}}
            />
            <Button
              title="充值"
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.normalButton}
              titleStyle={styles.buttonText}
              onPress={() => {/* 处理充值 */}}
            />
            <Button
              title="提现"
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.normalButton}
              titleStyle={styles.buttonText}
              onPress={() => {/* 处理提现 */}}
            />
            <Button
              title="划转"
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.normalButton}
              titleStyle={styles.buttonText}
              onPress={() => {/* 处理划转 */}}
            />
          </View>

          {/* 账户分布标题 */}
          <View style={styles.distributionHeader}>
            <Text style={styles.distributionTitle}>账户分布</Text>
          </View>

          {/* 账户列表 */}
          <View style={styles.accountList}>
            {accountList.map((account, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.accountItem}
                onPress={() => setSelectedTab(account.account_name_new)}
              >
                <View style={styles.accountLeft}>
                  <Image 
                    source={require('../../../../assets/Exchanges/okx2.png')}
                    style={styles.accountIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.accountName}>{account.account_name_new}</Text>
                  {/* 异常状态标签 */}
                  {account.account_name_new === 'OKX-1' && (
                    <View style={styles.statusTag}>
                      <Text style={styles.statusText}>异常</Text>
                    </View>
                  )}
                </View>
                <View style={styles.accountRight}>
                  <Text style={styles.accountBalance}>5.19116118</Text>
                  <Icon 
                    name="chevron-right" 
                    type="font-awesome" 
                    size={14} 
                    color="#666"
                    containerStyle={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      );
    }
    return <AccountDetail accountName={selectedTab} navigation={navigation} accountsInfo={route.params?.accountInfo}/>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" type="font-awesome" size={20} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.tabContainer}>
          {/* 总览标签固定显示 */}
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setSelectedTab('总览')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === '总览' && styles.tabTextActive
            ]}>
              总览
            </Text>
          </TouchableOpacity>

          {/* 动态账户列表 */}
          {accountList.map((account, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              onPress={() => setSelectedTab(account.account_name_new)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === account.account_name_new && styles.tabTextActive
              ]}>
                {account.account_name_new}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <Icon name="ellipsis-h" type="font-awesome" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    backgroundColor: '#fff',
  },
  backButton: {
    width: 28,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 0,
  },
  menuButton: {
    width: 28,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 0,
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 8,
    height: '100%',
    alignItems: 'center',
  },
  tabItem: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 15,
    color: '#666',
  },
  tabTextActive: {
    color: '#333',
    fontWeight: '600',
  },
  overviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  assetSection: {
    padding: 16,
    paddingBottom: 0,
    backgroundColor: '#fff',
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
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  assetAmount: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0,
  },
  assetUSD: {
    fontSize: 15,
    color: '#666',
    alignSelf: 'flex-end',
    paddingBottom: 6,
  },
  profitSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  profitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profitItem: {
    alignItems: 'flex-start',  // 左对齐
  },
  profitLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  profitValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00b386',
  },
  distributionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  distributionTitle: {
    fontSize: 17,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  accountList: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
  },
  accountIcon: {
    width: 32, 
    height: 32, 
  },
  accountName: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
    marginRight: 8,
  },
  statusTag: {
    backgroundColor: '#fff7e6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ffd591',
  },
  statusText: {
    fontSize: 12,
    color: '#FFA940',
  },
  accountRight: {
    flexDirection: 'row',  // 改为水平布局
    alignItems: 'center',
    gap: 8,  // 元素之间的间距
  },
  accountBalance: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  arrowIcon: {
    marginLeft: 4,
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flex: 1,
    marginLeft: 8,
  },
  firstButton: {
    marginLeft: 0,
  },
  primaryButton: {
    backgroundColor: '#80FFE9',
    height: 38,
    padding: 0,
    elevation: 0,  // 移除 Android 阴影
    shadowColor: 'transparent',  // 移除 iOS 阴影
    shadowOffset: { width: 0, height: 0 },
  },
  normalButton: {
    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',
    height: 38,
    padding: 0,
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 14,
  },
});

export default AssetsDetail;
