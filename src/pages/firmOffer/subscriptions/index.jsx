// 首页
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text, ScrollView, Image } from 'react-native';

import FirmOfferCard from '../../../components/FirmOfferCard';
import request from '../../../utils/request';

const SubscriptionsScreen = ({ navigation }) => {

  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // 获取数据的函数
  const fetchData = async () => {
    try {
      const response = await request.post('/api/user/getSubscribeCopyer');
      console.log('订阅数据:', response.data);
      
      // 检查 response.data 是否直接就是数组
      if (Array.isArray(response.data)) {
        setItems(response.data);
        setError(null);
      } else if (response.data.code === 200) {  // 如果是标准格式的响应
        const subscriptionData = Array.isArray(response.data.data) ? response.data.data : [];
        setItems(subscriptionData);
        setError(null);
      } else {
        setItems([]);
        setError('无订阅数据');
      }
    } catch (error) {
      console.error('获取订阅数据失败: ', error);
      setItems([]);
      setError('network_error');
    }
  };

  // 下拉刷新处理函数
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  };

  // 首次加载数据
  useEffect(() => {
    fetchData();
  }, []);

  // 页面获得焦点时刷新数据
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

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
        <View style={[styles.contentContainer, !items?.length && styles.emptyContentContainer]}>
          {items?.length > 0 ? (
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <FirmOfferCard 
                  item={item} 
                />
              )}
              keyExtractor={(item, index) => index.toString()}  // 使用索引作为key
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
                {error === 'network_error' ? '获取数据失败，下拉刷新重试' : '无订阅数据'}
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

export default SubscriptionsScreen;