// 首页
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ArticleUpdatesCard1 from '../../../components/ArticleUpdatesCard1';

const data = [
  {
    id: '1',
    title: '在金融市场中，跟单交易是一种流行的投资策略...',
    description: '通过杠杆，投资者可以利用小资本获取金融市场的显著购买力...',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    username: '坚持做空',
    time: '7分钟前',
  },
  {
    id: '2',
    title: '在金融市场中，跟单交易是一种流行的投资策略...',
    description: '通过杠杆，投资者可以利用小资本获取金融市场的显著购买力...',
    avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    username: '坚持做空',
    time: '10分钟前',
  },
  // 添加更多卡片数据
];
const RecommendedScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <ArticleUpdatesCard1
      title={item.title}
      description={item.description}
      avatarUrl={item.avatarUrl}
      username={item.username}
      time={item.time}
    />
  );
  return (
    <View style={styles.screen}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default RecommendedScreen;