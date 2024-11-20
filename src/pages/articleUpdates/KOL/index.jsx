// 首页
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import ArticleUpdatesCard2 from '../../../components/ArticleUpdatesCard2';

const KOLScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchMoments = async () => {
    try {
      const response = await fetch('https://chaininsight.vip/api/v0/query/moment?pageNum=1&pageSize=50');
      const json = await response.json();
      if (json.data && json.data.list) {
        setData(json.data.list);
      }
    } catch (error) {
      console.error('获取动态数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoments();
  }, []);

  const formatTime = (timestamp) => {
    const now = new Date().getTime();
    const diff = now - timestamp;
    
    // 转换为小时
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return `${hours}小时前`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}天前`;
    }
  };

  const renderItem = ({ item }) => (
    <ArticleUpdatesCard2
      username={item.kolInfo.name}
      description={item.content}
      avatarUrl={item.kolInfo.avatar}
      time={formatTime(item.createTime)}
      source={item.source || 'Twitter'}
      images={item.images}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#32E0C4" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default KOLScreen;