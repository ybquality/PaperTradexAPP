import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfitCard = () => {
  return (
    <View style={styles.card}>
      {/* Title */}
      <Text style={styles.title}>跟单总收益(USDT)</Text>

      {/* Total Profit */}
      <Text style={styles.totalProfit}>-2283.04</Text>

      {/* Stats Row */}
      <View style={styles.statsContainer}>
        <View style={[styles.statItem, styles.leftAlign]}>
          <Text style={styles.statText}>今日收益</Text>
          <Text style={styles.statValue}>$N/A</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>总交易笔数</Text>
          <Text style={styles.statValue}>31</Text>
        </View>
        <View style={[styles.statItem, styles.rightAlign]}>
          <Text style={styles.statText}>胜率</Text>
          <Text style={[styles.statValue, { color: '#22B573' }]}>22.12%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',  // 背景颜色
    borderRadius: 10,  // 圆角
    paddingVertical: 20,  // 只保留上下内边距
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 14,  // 标题字体大小
    // fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20, // 标题添加水平内边距
  },
  totalProfit: {
    fontSize: 36,  // 总收益字体大小
    fontWeight: 'bold',
    color: '#000',
    // marginVertical: 5,
    paddingHorizontal: 20, // 总收益添加水平内边距
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20, // 将水平内边距移到 statsContainer
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  leftAlign: {
    alignItems: 'flex-start',
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ProfitCard;
