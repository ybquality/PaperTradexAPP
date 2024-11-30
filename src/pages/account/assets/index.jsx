// 资产总览页
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import AccountDetail from '../../../components/account/AccountDetail';
import { LinearGradient } from 'expo-linear-gradient';

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
        <View style={styles.overviewContainer}>
          {/* 固定的顶部区域 */}
          <View>
            {/* 总资产区域 */}
            <View style={styles.assetSection}>
              <View style={styles.assetHeader}>
                <Text style={styles.assetTitle}>总资产折合（USDT）</Text>
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
              <TouchableOpacity style={styles.buttonContainer}>
                <Icon
                  name="link-variant"
                  type="material-community"
                  size={24}
                  color="#000"
                />
                <Text style={styles.buttonText}>接入账户</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}>
                <Icon
                  name="download"
                  type="feather"
                  size={24}
                  color="#000"
                />
                <Text style={styles.buttonText}>充值</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}>
                <Icon
                  name="upload"
                  type="feather"
                  size={24}
                  color="#000"
                />
                <Text style={styles.buttonText}>提现</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}>
                <Icon
                  name="repeat"
                  type="feather"
                  size={24}
                  color="#000"
                />
                <Text style={styles.buttonText}>划转</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 账户分布标题 */}
          <View style={styles.distributionHeader}>
            <Text style={styles.distributionTitle}>账户分布</Text>
          </View>
          {/* 可滚动的账户列表 */}
          <ScrollView 
            style={styles.accountListContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#00D0AC']}
                tintColor="#00D0AC"
              />
            }
          >
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
                      size={12} 
                      color="rgba(0, 0, 0, 0.4)"
                      containerStyle={styles.arrowIcon}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
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
          <Icon 
            name="arrow-left" 
            type="feather"
            size={24}
            color="rgba(0, 0, 0, 0.9)" 
          />
        </TouchableOpacity>
        
        <View style={styles.tabScrollContainer}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabContainer}
            contentContainerStyle={styles.tabContentContainer}
          >
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
          </ScrollView>
          
          <LinearGradient
            colors={['rgba(255,255,255,0)', '#fff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientMask}
            pointerEvents="none"
          />
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuIconContainer}>
            <Icon 
              name="more-horizontal" 
              type="feather"
              size={24}
              color="rgba(0, 0, 0, 0.9)" 
            />
          </View>
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
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    // minWidth: 40,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 32,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconContainer: {
    width: 32,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabScrollContainer: {
    flex: 1,
    position: 'relative',
    marginRight: 8,
  },
  tabContainer: {
    flex: 1,
  },
  tabContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  tabItem: {
    paddingHorizontal: 8,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.4)',
    lineHeight: 40,
  },
  tabTextActive: {
    color: 'rgba(0, 0, 0, 0.9)',
    fontWeight: '700',
  },
  overviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  assetSection: {
    padding: 16,
    paddingBottom: 0,
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  assetTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 1)',
  },
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  assetAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
    letterSpacing: 0,
  },
  assetUSD: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.4)',
    alignSelf: 'flex-end',
    paddingBottom: 4,
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
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 8,
  },
  profitValue: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(0, 208, 172, 1)',
  },
  distributionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  distributionTitle: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '600',
  },
  accountList: {
    paddingHorizontal: 16,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
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
    marginHorizontal: 0,
  },
  buttonText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  gradientMask: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    height: '100%',
  },
  accountListContainer: {
    flex: 1,
  },
});

export default AssetsDetail;
