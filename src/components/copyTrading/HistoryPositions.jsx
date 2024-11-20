// 历史持仓
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const HistoryPositions = ({ data }) => {
  const HistoryCard = ({ item }) => {
    const isProfit = parseFloat(item.profit) >= 0;

    // 时间格式化
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
    };

    return (
      <View style={styles.card}>
        {/* 交易对和时间 */}
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <Text style={styles.pairText}>{item.symbol}</Text>
          </View>
          <Text style={styles.timeText}>
            {formatDate(item.openTime)} - {formatDate(item.closeTime)}
          </Text>
        </View>

        {/* 多空杠杆倍数 */}
        <View style={[styles.directionTag, { 
          backgroundColor: item.direction === 'LONG' ? 'rgba(39, 194, 138, 0.1)' : 'rgba(255, 77, 79, 0.1)',
          marginBottom: 12,
        }]}>
          <Text style={[styles.directionText, { 
            color: item.direction === 'LONG' ? '#27C28A' : '#FF4D4F' 
          }]}>
            {item.direction === 'LONG' ? '多' : '空'} {item.leverage}X
          </Text>
        </View>

        {/*收益、开仓均价、平仓均价 */}
        <View style={styles.row}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>收益</Text>
            <Text style={[styles.value, isProfit ? styles.profitText : styles.lossText]}>
              {isProfit ? '+' : ''}{item.profit} USDT
            </Text>
          </View>
          <View style={[styles.infoItem, styles.centerAlign]}>
            <Text style={[styles.label, styles.textCenter]}>开仓均价</Text>
            <Text style={[styles.value, styles.textCenter]}>${item.openPrice}</Text>
          </View>
          <View style={[styles.infoItem, styles.rightAlign]}>
            <Text style={[styles.label, styles.textRight]}>平仓均价</Text>
            <Text style={[styles.value, styles.textRight]}>${item.closePrice}</Text>
          </View>
        </View>

        {/* 持仓量、手续费、信号来源 */}
        <View style={styles.row}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>持仓量</Text>
            <Text style={styles.value}>{item.amount} {item.amountUnit}</Text>
          </View>
          <View style={[styles.infoItem, styles.centerAlign]}>
            <Text style={[styles.label, styles.textCenter]}>手续费</Text>
            <Text style={[styles.value, styles.textCenter]}>-{item.fee} USDT</Text>
          </View>
          <View style={[styles.infoItem, styles.rightAlign]}>
            <Text style={[styles.label, styles.textRight]}>信号来源</Text>
            <Text style={[styles.value, styles.textRight]}>{item.traderName}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <HistoryCard item={item} />}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(243, 243, 243, 1)',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 8,
  },
  leftSection: {
    justifyContent: 'center',
  },
  pairText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 3,
  },
  directionTag: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 12,
  },
  directionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  profitText: {
    color: '#27C28A',
  },
  lossText: {
    color: '#FF4D4F',
  },
  centerAlign: {
    alignItems: 'center',
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
});

export default HistoryPositions;