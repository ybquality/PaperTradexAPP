// 首页
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ArticleUpdatesCard2 from '../../../components/ArticleUpdatesCard2';

const data = [
  {
    id: '1',
    username: '坚持做空',
    description: '通过杠杆，投资者可以利用小资本获取金融市场的显著购买力...',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    time: '1小时前',
  },
  {
    id: '2',
    username: '坚持做空',
    description: '通过杠杆，投资者可以利用小资本获取金融市场的显著购买力...',
    avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    time: '1小时前',
  },
  // 添加更多卡片数据
];
const SquareScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <ArticleUpdatesCard2
      username={item.username}
      description={item.description}
      avatarUrl={item.avatarUrl}
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
    padding: 16,
  },
});

export default SquareScreen;