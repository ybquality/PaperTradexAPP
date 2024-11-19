// 首页
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

const TradeRankingScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('周榜');

  return (
    <View style={styles.screen}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" type="feather" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.rules}>获取规则</Text>
        </TouchableOpacity>
      </View>

      {/* Tab切换移到导航栏下面 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === '周榜' && styles.activeTab]}
          onPress={() => setActiveTab('周榜')}
        >
          <Text style={[styles.tabText, activeTab === '周榜' && styles.activeTabText]}>周榜</Text>
          {activeTab === '周榜' && <View style={styles.activeLine} />}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === '总榜' && styles.activeTab]}
          onPress={() => setActiveTab('总榜')}
        >
          <Text style={[styles.tabText, activeTab === '总榜' && styles.activeTabText]}>总榜</Text>
          {activeTab === '总榜' && <View style={styles.activeLine} />}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.topThreeContainer}>
          <View style={styles.podiumContainer}>
            {/* 胶囊内容将在这里添加 */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tab: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 16,
  },
  tabText: {
    color: '#666',
    fontSize: 16,
  },
  activeTabText: {
    color: '#333',
    fontWeight: '500',
  },
  rules: {
    color: '#666',
    fontSize: 14,
  },
  activeTab: {
    color: '#333',
  },
  activeLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#333',
  },
  topThreeContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#000',
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 180,
    paddingHorizontal: 30,
  },
  content: {
    flex: 1,
  },
});

export default TradeRankingScreen;