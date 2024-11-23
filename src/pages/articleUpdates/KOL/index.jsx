// 首页
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ArticleUpdatesCard2 from '../../../components/ArticleUpdatesCard2';

const KOLScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchMoments = async () => {
    console.log('开始请求数据...');
    try {
      const { data: response } = await axios.get(
        'https://chaininsight.vip/api/v0/query/moment',
        {
          params: {
            pageNum: 1,
            pageSize: 50
          }
        }
      );
      
      console.log('请求响应:', response);
      
      if (response.data && response.data.list) {
        setData(response.data.list);
        console.log('数据设置成功，长度:', response.data.list.length);
      } else {
        console.log('响应数据格式不正确:', response);
      }
    } catch (error) {
      console.error('获取动态数据失败:', error);
      console.error('错误详情:', error.response);
    } finally {
      setLoading(false);
      console.log('加载状态设置完成');
    }
  };

  useEffect(() => {
    console.log('组件挂载，准备请求数据...');
    fetchMoments();
    
    return () => {
      console.log('组件卸载...');
    };
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

  console.log('渲染状态:', { loading, dataLength: data.length });

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
        onRefresh={fetchMoments}
        refreshing={loading}
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