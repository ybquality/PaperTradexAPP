// 跟单历史
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, RefreshControl } from 'react-native';

const MyHistoryScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [historyData, setHistoryData] = useState([
    {
      id: '1',
      avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix',
      name: '坚持做空',
      profit: '$10,000.00',
      date: '2024/08/01-2024/08/01'
    },
    {
      id: '2',
      avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix',
      name: '坚持做空',
      profit: '$10,000.00',
      date: '2024/08/01-2024/08/01'
    },
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // 这里添加刷新数据的逻辑
    // fetchHistoryData().then(() => {
    //   setRefreshing(false);
    // });
    
    // 模拟请求延迟
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image 
          source={{ uri: item.avatar }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{item.name}</Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.label}>跟单总收益</Text>
          <Text style={styles.profitValue}>{item.profit}</Text>
        </View>
        <View>
          <Text style={[styles.label, styles.rightAlign]}>跟单时间</Text>
          <Text style={[styles.dateValue, styles.rightAlign]}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={historyData}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#00D0AC']} // Android
            tintColor="#00D0AC" // iOS
          />
        }
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
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(243, 243, 243, 1)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.4)',
  },
  userName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  profitValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  dateValue: {
    fontSize: 14,
    color: '#333',
  },
  rightAlign: {
    textAlign: 'right',
  },
});

export default MyHistoryScreen;