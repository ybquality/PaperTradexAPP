import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LiquidationStatsCard = () => {
  return (
    <View style={styles.container}>
      {/* 圆角卡片 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>交易所爆仓统计</Text>
        
        <View style={styles.headerRow}>
          <Text style={styles.columnHeader}>交易所</Text>
          <Text style={styles.columnHeader}>爆仓金额</Text>
          <Text style={styles.columnHeader}>多/空</Text>
        </View>

        {/* 行 1: All */}
        <View style={styles.row}>
          <Text style={styles.exchangeText}>All</Text>
          <Text style={styles.amountText}>1.6亿</Text>
          <View style={styles.longShortContainer}>
            <Text style={styles.longText}>58.8</Text>
            <Text style={styles.shortText}>41.2%</Text>
          </View>
        </View>

        {/* 行 2: Binance */}
        <View style={styles.row}>
          <Text style={styles.exchangeText}>Binance</Text>
          <Text style={styles.amountText}>1.6亿</Text>
          <View style={styles.longShortContainer}>
            <Text style={styles.longText}>58.8</Text>
            <Text style={styles.shortText}>41.2%</Text>
          </View>
        </View>

        {/* 行 3: OKX */}
        <View style={styles.row}>
          <Text style={styles.exchangeText}>OKX</Text>
          <Text style={styles.amountText}>1.6亿</Text>
          <View style={styles.longShortContainer}>
            <Text style={styles.longText}>58.8</Text>
            <Text style={styles.shortText}>41.2%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', // 背景颜色
  },
  card: {
    backgroundColor: 'rgba(243, 243, 243, 1)',
    borderRadius: 12, // 圆角
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd', // 灰色边框
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  columnHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  exchangeText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  amountText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  longShortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  longText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00b300', // 绿色
  },
  shortText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4d4d', // 红色
  },
});

export default LiquidationStatsCard;
