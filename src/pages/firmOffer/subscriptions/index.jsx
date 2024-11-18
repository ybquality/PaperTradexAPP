// 首页
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text } from 'react-native';

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
      
      if (response.data) {
        setItems(response.data);
        setError(null);
      }
    } catch (error) {
      console.error('获取订阅数据失败: ', error);
      setError(error);
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
    <View style={styles.screen}>
        <FlatList
          data={items}
          renderItem={({ item }) => <FirmOfferCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#00D0AC']}  // Android
              tintColor="#00D0AC"   // iOS
            />
          }
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {error ? '获取数据失败，下拉刷新重试' : '暂无订阅数据'}
              </Text>
            </View>
          )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
  listContent: {
    paddingTop: 0,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
  },
});

export default SubscriptionsScreen;