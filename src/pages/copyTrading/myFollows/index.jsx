// 首页
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text, Image, ScrollView } from 'react-native';

import MyFollowCard from '../../../components/MyFollowCard';

import request from '../../../utils/request';

const MyFollowsScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

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
        setError(null);
      } else if (response.data.code === 401) {
        setItems(response.data.data);
        setError(response.data.msg);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setItems([]);
      setError('获取数据失败，请稍后重试');
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
    <ScrollView 
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContentContainer}
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
      <View style={styles.screen}>
        <View style={[styles.contentContainer, !items.length && styles.emptyContentContainer]}>
          {items.length > 0 ? (
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              nestedScrollEnabled={true}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Image 
                source={require('../../../../assets/icon/Empty.png')}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyText}>
                {error ? error : '暂无跟单数据'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContentContainer: {
    flexGrow: 1,
    minHeight: '100%',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 80,
  },
  contentContainer: {
    flex: 1,
  },
  emptyContentContainer: {
    minHeight: 400,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: 120,
    height: 120,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MyFollowsScreen;