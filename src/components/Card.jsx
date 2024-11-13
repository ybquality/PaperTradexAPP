import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CardComponent = ({ avatarUrl, nickname, yieldValue, chartData, totalAssets, maxDrawdown, profit }) => {
  return (
    <View style={styles.container}>
      {/* 头像和昵称 */}
      <View style={styles.header}>
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatar}
        />
        <Text style={styles.nickname}>{nickname}</Text>
      </View>

      {/* 详情按钮 */}
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>详情</Text>
      </TouchableOpacity>

      {/* 收益率 */}
      <View style={styles.yieldContainer}>
        <Text style={styles.yieldText}>收益率</Text>
        <Text style={styles.yieldValue}>{yieldValue}%</Text>
      </View>

      {/* 收益率曲线图 */}
      <View style={styles.chartContainer}>
        {/* 这里可以放置你的曲线图组件，使用chartData */}
      </View>

      {/* 总资产、最大回撤、收益额 */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerText}>总资产</Text>
          <Text style={styles.footerValue}>{totalAssets}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerText}>最大回撤</Text>
          <Text style={styles.footerValue}>{maxDrawdown}%</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerText}>收益额</Text>
          <Text style={styles.footerValue}>{profit}</Text>
        </View>
      </View>


    </View>
  );
};

/* Frame 1321319003 */



const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    shadowColor: 'transparent', // 无阴影
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    Top: 20,
    left: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nickname: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16.6,
  },
  detailsButton: {
    borderRadius: 20,
    backgroundColor: '#000',
    padding: 10,
    paddingHorizontal: 15,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  yieldContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  yieldText: {
    color: '#808080',
    fontSize: 14,
  },
  yieldValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chartContainer: {
    height: 100,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footerItem: {
    flexDirection: 'column',
  },
  footerText: {
    color: '#808080',
    fontSize: 14,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardComponent;