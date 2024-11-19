import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import StarTraders from '../../../../components/home/StarTraders';
import Banner from '../../../../components/home/Banner';
import HomeQuickMenu from '../../../../components/home/HomeQuickMenu';
import HomeFAQ from '../../../../components/home/HomeFAQ';
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
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* 轮播图 */}
      <Banner />
      {/* 快速菜单 */}
      <HomeQuickMenu />
      {/* 邀请返佣卡片 */}
      <InviteCard onPress={() => {
        // 处理邀请卡片点击事件
        navigation.navigate('Invite');
      }} />

      {/* 明星交易员部分 */}
      <StarTraders data={starTradersData} />
      <HomeFAQ />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
