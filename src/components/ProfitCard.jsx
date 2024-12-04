import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfitCard = ({tatalProfit, todayProfit, totalTradeCount, totalWinRate}) => {
  return (
    <View style={styles.card}>
      {/* 添加背景图片 */}
      <Image 
        source={require('../../assets/Vector.png')}
        style={styles.backgroundImage}
      />
      
      {/* Title */}
      <Text style={styles.title}>跟单总收益(USDT)</Text>

      {/* Total Profit */}
      <Text style={styles.totalProfit}>{tatalProfit}</Text>

      {/* Stats Row */}
      <View style={styles.statsContainer}>
        <View style={[styles.statItem, styles.leftAlign]}>
          <Text style={styles.statText}>今日收益</Text>
          <Text style={styles.statValue}>${todayProfit}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>总交易笔数</Text>
          <Text style={styles.statValue}>{totalTradeCount}</Text>
        </View>
        <View style={[styles.statItem, styles.rightAlign]}>
          <Text style={styles.statText}>胜率</Text>
          <Text style={[styles.statValue, { color: '#22B573' }]}>{totalWinRate}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingVertical: 20,
    marginBottom: 20,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: -20,
    right: -25,
    width: '100%',
    height: '100%',
    // opacity: 0.1,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 20,
  },
  totalProfit: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
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
