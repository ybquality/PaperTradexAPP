import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PositionStatsCard = () => {
  return (
    <View style={styles.container}>
      {/* 全网持仓量统计卡片 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>全网持仓量统计</Text>

        {/* 行 1: All */}
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.exchangeText}>All</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '100%' }]} />
            </View>
          </View>
          <Text style={styles.amountText}>1.6亿</Text>
          <Text style={styles.percentageChange}>+21.5%</Text>
        </View>

        {/* 行 2: Binance */}
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.exchangeText}>Binance</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '72%' }]} />
            </View>
          </View>
          <Text style={styles.amountText}>1.6亿</Text>
          <Text style={styles.percentageChange}>+21.5%</Text>
        </View>

        {/* 行 3: OKX */}
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.exchangeText}>OKX</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '22%' }]} />
            </View>
          </View>
          <Text style={styles.amountText}>1.6亿</Text>
          <Text style={styles.percentageChange}>+21.5%</Text>
        </View>

        {/* 行 4: BitMex */}
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.exchangeText}>BitMex</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '2%' }]} />
            </View>
          </View>
          <Text style={styles.amountText}>1.6亿</Text>
          <Text style={styles.percentageChange}>+21.5%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: 'rgba(243, 243, 243, 1)', // 卡片背景色
    borderRadius: 12, // 卡片圆角
    padding: 20, // 内部填充
    borderWidth: 1, // 边框宽度
    borderColor: '#ddd', // 边框颜色
  },
  cardTitle: {
    fontSize: 18, // 标题字体大小
    fontWeight: 'bold', // 标题字体加粗
    marginBottom: 10, // 标题与内容之间的间距
  },
  row: {
    flexDirection: 'row', // 水平布局
    justifyContent: 'space-between', // 每列之间的均匀分布
    alignItems: 'center', // 垂直居中
    marginBottom: 15, // 每行之间的间距
  },
  leftColumn: {
    flexDirection: 'column', // 左侧列采用垂直布局
    width: '50%', // 左侧列宽度为50%
  },
  exchangeText: {
    fontSize: 16, // 交易所名称字体大小
    color: '#333', // 字体颜色
  },
  progressBarContainer: {
    height: 10, // 进度条高度
    backgroundColor: '#f0f0f0', // 进度条背景色
    borderRadius: 5, // 进度条圆角
    marginTop: 5, // 进度条与交易所名称之间的距离
  },
  progressBar: {
    height: '100%', // 进度条高度
    backgroundColor: '#4caf50', // 进度条颜色
    borderRadius: 5, // 进度条圆角
  },
  amountText: {
    fontSize: 16, // 持仓量字体大小
    color: '#333', // 字体颜色
  },
  percentageChange: {
    fontSize: 16, // 百分比变化字体大小
    color: '#21c37f', // 百分比变化字体颜色
  },
});

export default PositionStatsCard;
