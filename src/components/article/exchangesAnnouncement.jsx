import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ellipsis from '../../components/common/ellipsis';

const ExchangesAnnouncement = memo(({ title, pubDate, description, exchange }) => {
  const formattedTime = formatTime(pubDate);
  
  // 获取交易所显示名称
  const getExchangeName = (exchange) => {
    const names = {
      binance: 'Binance',
      bitget: 'Bitget'
    };
    return names[exchange] || exchange;
  };
  
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Ellipsis rows={3}>
          {description}
        </Ellipsis>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.source}>{getExchangeName(exchange)}</Text>
        <Text style={styles.time}>{formattedTime}</Text>
      </View>
    </View>
  );
});

const formatTime = (dateStr) => {
  const publishDate = new Date(dateStr);
  const now = new Date();
  const diffMs = now - publishDate;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // 判断是否是同一天
  const isToday = publishDate.toDateString() === now.toDateString();
  // 判断是否是昨天
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = publishDate.toDateString() === yesterday.toDateString();

  // 格式化小时和分钟
  const hours = publishDate.getHours().toString().padStart(2, '0');
  const minutes = publishDate.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  if (diffMinutes < 1) return '刚刚';
  if (diffMinutes < 60) return `${diffMinutes}分钟前`;
  if (isToday) return `今天 ${timeStr}`;
  if (isYesterday) return `昨天 ${timeStr}`;
  if (diffDays < 30) return `${diffDays}天前`;
  
  const month = publishDate.getMonth() + 1;
  const day = publishDate.getDate();
  return `${month}-${day}`;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(243, 243, 243, 1)',
  },
  cardHeader: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  source: {
    fontSize: 14,
    color: '#999',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

ExchangesAnnouncement.displayName = 'ExchangesAnnouncement';

export default ExchangesAnnouncement;
