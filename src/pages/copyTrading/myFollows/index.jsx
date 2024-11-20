// 首页
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text, TouchableOpacity } from 'react-native';

import MyFollowCard from '../../../components/MyFollowCard';
import HistoryPositions from '../../../components/copyTrading/HistoryPositions';

import request from '../../../utils/request';

// 历史持仓模拟数据
const mockHistoryPositions = [
  {
    symbol: 'BTC/USDT',
    direction: 'LONG',
    leverage: 20,
    openTime: '2024-11-118 10:00',
    closeTime: '2024-11-19 15:30',
    profit: '13700',
    openPrice: '90400',
    closePrice: '91150',
    amount: '18.2',
    amountUnit: '个',
    fee: '165',
    traderName: '老恶魔',
  }
];

const MyFollowsScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);

  const handleCancelFollowPress = async (orderId) => {
    // 在这里处理取消跟单的操作
    console.log('Cancel Follow', orderId);
    
    const response = await request.post('/api/exchange/cancel_user_copy_order', { orderId });

    if (response.data.code === 200){
      console.log('取消跟单成功');
      alert('取消跟单成功')
    }else{
      console.log(response.data.msg);
      alert('取消跟单失败: ', response.data.msg)
    }
    
    await fetchData();
  };
  
  async function fetchData() {
    try {
      const response = await request.get('/api/exchange/get_user_copy_order');

      if (response.data.code === 200) {
        setItems(response.data.data);
      }else if (response.data.code === 400) {
        setItems(response.data.data);
        alert(response.data.msg)
      }

      
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', fetchData);

    return unsubscribe; // 清理函数，移除监听器
  }, [navigation]);

  const renderItem = ({ item }) => (
    // 当前跟单交易员卡片
    <MyFollowCard
      navigation={navigation}
      orderId={item.id}
      avatarUri={item.avatarUri}
      nickName={item.nickName}
      principal={item.principal}
      copyRatio={item.copyRatio}
      netIncome={item.netIncome}
      Yield={item.Yield}
      onCancelFollow={handleCancelFollowPress}
    />
  );
  
  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#00D0AC']} // Android
            tintColor="#00D0AC" // iOS
          />
        }
        ListFooterComponent={
          <View style={styles.tabSection}>
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[
                  styles.tabItem, 
                  index === 0 && styles.tabItemActive
                ]}
                onPress={() => setIndex(0)}
              >
                <Text style={[
                  styles.tabText,
                  index === 0 && styles.tabTextActive
                ]}>
                  当前持仓
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.tabItem,
                  index === 1 && styles.tabItemActive
                ]}
                onPress={() => setIndex(1)}
              >
                <Text style={[
                  styles.tabText,
                  index === 1 && styles.tabTextActive
                ]}>
                  历史持仓
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.tabContent}>
              {index === 0 ? (
                <Text style={styles.tempText}>当前持仓内容</Text>
              ) : (
                <HistoryPositions data={mockHistoryPositions} />
              )}
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  tabSection: {
    marginTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'transparent', 
  },
  tabItemActive: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(0, 0, 0, 1)', 
  },
  tabText: {
    fontSize: 14,
    color: '#999',
  },
  tabTextActive: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '700',
  },
  tabContent: {
    minHeight: 100,
    marginBottom: 80,
  },
  tempText: {
    fontSize: 14,
    color: '#999',
  },
});

export default MyFollowsScreen;