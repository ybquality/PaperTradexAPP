// 首页
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const LeaderboardScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('weekly'); // 'weekly' 或 'total'

  const topThreeData = [
    {
      id: '3',
      rank: 3,
      name: '0xCC',
      avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix3',
      profit: '240%',
      bgColor: '#D2B48C', // 棕色
    },
    {
      id: '1',
      rank: 1,
      name: '别管我',
      avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix1',
      profit: '297%',
      bgColor: '#FFD700', // 金色
    },
    {
      id: '2',
      rank: 2,
      name: '做空如做狗',
      avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix2',
      profit: '243%',
      bgColor: '#C0C0C0', // 银色
    },
  ];

  const listData = [
    {
      id: '4',
      rank: 4,
      name: 'shsdahda',
      avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix4',
      score: 238,
    },
    {
      id: '5',
      rank: 5,
      name: '我爱吃火锅',
      avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix5',
      score: 221,
    },
    // ... 更多数据
  ];

  const renderTopThree = () => (
    <View style={styles.topThreeContainer}>
      {topThreeData.map((item) => (
        <View 
          key={item.id} 
          style={[
            styles.capsule,
            { backgroundColor: item.bgColor },
            item.rank === 1 ? styles.firstPlace : null
          ]}
        >
          <Image 
            source={{ uri: item.avatar }}
            style={item.rank === 1 ? styles.firstPlaceAvatar : styles.topAvatar}
          />
          <View style={styles.capsuleContent}>
            <Text style={styles.topName}>{item.name}</Text>
            <Text style={styles.topProfit}>{item.profit}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.rankText}>{item.rank.toString().padStart(2, '0')}</Text>
      <Image 
        source={{ uri: item.avatar }}
        style={styles.listAvatar}
      />
      <Text style={styles.listName}>{item.name}</Text>
      <Text style={styles.listScore}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
          onPress={() => setActiveTab('weekly')}
        >
          <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>周榜</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'total' && styles.activeTab]}
          onPress={() => setActiveTab('total')}
        >
          <Text style={[styles.tabText, activeTab === 'total' && styles.activeTabText]}>总榜</Text>
        </TouchableOpacity>
      </View>

      {renderTopThree()}

      <FlatList
        data={listData}
        renderItem={renderListItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  tab: {
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 16,
    gap: 38,
  },
  capsule: {
    width: 60,
    height: 160,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  firstPlace: {
    width: 65,
    height: 180,
    borderRadius: 32.5,
  },
  topAvatar: {
    width: '100%',
    aspectRatio: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#FF69B4',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  firstPlaceAvatar: {
    width: '100%',
    aspectRatio: 1,
    borderBottomLeftRadius: 32.5,
    borderBottomRightRadius: 32.5,
  },
  capsuleContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  topName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  topProfit: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profitLabel: {
    display: 'none',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  rankText: {
    width: 30,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  listAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#fff',
  },
  listName: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  listScore: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

export default LeaderboardScreen;