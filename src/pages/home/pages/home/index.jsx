import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import StarTraders from '../../../../components/home/StarTraders';
import Banner from '../../../../components/home/Banner';
import InviteCard from '../../../../components/InviteCard';

const HomeScreen = () => {
  // 模拟数据
  const starTradersData = [
    {
      id: 1,
      nickname: "坚特做空",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      followers: "1/500",
      yieldValue: 225.8,
      chartData: [
        { income: 50 },
        { income: 65 },
        { income: 75 },
        { income: 85 },
        { income: 90 },
        { income: 100 }
      ]
    },
    {
      id: 2,
      nickname: "坚特做空",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
      followers: "1/500",
      yieldValue: 225.8,
      chartData: [
        { income: 60 },
        { income: 70 },
        { income: 65 },
        { income: 85 },
        { income: 95 },
        { income: 100 }
      ]
    },
    {
      id: 3,
      nickname: "坚特做空",
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      followers: "1/500",
      yieldValue: 225.8,
      chartData: [
        { income: 40 },
        { income: 55 },
        { income: 75 },
        { income: 80 },
        { income: 90 },
        { income: 95 }
      ]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 替换静态横幅为轮播图组件 */}
      <Banner />

      {/* 图片和文本按钮 */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Image source={require('../../../../../assets/GettingStarted.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>新手入门</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Image source={require('../../../../../assets/FAQ.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>常见问题</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Image source={require('../../../../../assets/ReferralRewards.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>推荐奖励</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Image source={require('../../../../../assets/Recharge.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>充值</Text>
        </TouchableOpacity>
      </View>

      <InviteCard onPress={() => {
        // 处理邀请卡片点击事件
        navigation.navigate('Invite');
      }} />

      {/* 明星交易员部分 */}
      <StarTraders data={starTradersData} />

      {/* 常见问题部分 */}
      <Text style={styles.sectionTitle}>常见问题</Text>
      <View style={styles.faqContainer}>
        <Text style={styles.faqText}>1. 如何充值？</Text>
        <Text style={styles.faqText}>2. 如何提现？</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  menuButton: {
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  menuText: {
    color: '#333',
    fontSize: 14,
  },
  faqContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
  },
  faqText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
});

export default HomeScreen;
