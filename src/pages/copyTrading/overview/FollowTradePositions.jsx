import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import NavBar from '../../../components/common/navbar';
import FollowTradeLogs from '../../../components/copyTrading/FollowTradeLogs';

const FollowTradePositions = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0); // 0: 交易记录, 1: 交易日志

  const logs = [
    {
      status: 'success', //正常状态
      title: '交易成功',
      content: 'xx交易对以xx价格买入',
      time: '2024-3-4 12:00:00'
    },
    {
      status: 'fail', //失败状态
      title: '交易失败',
      content: 'error',
      time: '2024-3-4 12:00:00'
    }
  ];

  return (
    <View style={styles.container}>
      <NavBar 
        onBack={() => navigation.goBack()}
        backIcon={true}
      >
      </NavBar>
      
      <ScrollView style={styles.content}>
        {/* 持仓数据概览 */}
        <View style={styles.overview}>
          <Image 
            source={require('../../../../assets/img/tradingstatsbackground.png')} 
            style={styles.backgroundImage}
          />
          <View style={styles.dataContainer}>
            {/* 第一行 */}
            <View style={styles.dataRow}>
              <View style={styles.dataItem}>
                <Text style={styles.label}>总交易次数</Text>
                <Text style={[styles.value, styles.titleText]}>128</Text>
              </View>
            </View>

            {/* 第二行 */}
            <View style={styles.dataRow}>
              <View style={styles.dataItem}>
                <Text style={styles.label}>已实现盈利次数</Text>
                <Text style={styles.value}>98</Text>
              </View>
              <View style={styles.dataItem}>
                <Text style={styles.label}>月收益率</Text>
                <Text style={[styles.value, styles.profitText]}>+23.5%</Text>
              </View>
            </View>
          </View>
          
          {/* 右侧图片 */}
          <Image 
            source={require('../../../../assets/icon/tradingstats.png')} 
            style={styles.statsImage}
            resizeMode="cover"
          />
        </View>

        {/* Tab 切换 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 0 && styles.activeTab]}
            onPress={() => setActiveTab(0)}
          >
            <Text style={[styles.tabText, activeTab === 0 && styles.activeTabText]}>
              交易记录
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 1 && styles.activeTab]}
            onPress={() => setActiveTab(1)}
          >
            <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>
              交易日志
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab 内容 */}
        <View style={styles.tabContent}>
          {activeTab === 0 ? (
            <View>
              <Text>交易记录内容为持仓表数据，跟随这个交易员的每一笔持仓都记录下来</Text>
            </View>
          ) : (
            <View>
              <Text>交易日志内容为操作表数据，开单成功、平仓成功、止损、止盈等或者是开单失败 --写完把这个text删掉</Text>
              {logs.map((log, index) => (
                <FollowTradeLogs
                  key={index}
                  status={log.status}
                  title={log.title}
                  content={log.content}
                  time={log.time}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  overview: {
    backgroundColor: 'rgba(243, 243, 243, 1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(243, 243, 243, 1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  dataContainer: {
    flex: 1,
    gap: 16,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 40,
  },
  dataItem: {
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 1)',
  },
  profitText: {
    color: 'rgba(0, 208, 172, 1)',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
  },
  statsImage: {
    width: 87,
    height: 106,
    position: 'absolute',
    right: 16,
    top: '15%',
  },
  backgroundImage: {
    position: 'absolute',
    left: -40,
    bottom: -50,
    width: 442.89, 
    height: 354.36, 
    opacity: 0.5, 
    borderBottomLeftRadius: 16, 
  },
  // Tab 相关样式
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTab: {
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  tabText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  activeTabText: {
    color: 'rgba(0, 0, 0, 0.9)',
    fontWeight: '700',
  },
  tabContent: {
    flex: 1,
  },
});

export default FollowTradePositions;
