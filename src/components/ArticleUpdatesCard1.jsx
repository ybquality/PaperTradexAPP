import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const ArticleUpdatesCard1 = ({ title, pubDate, description }) => {
  // 更完善的HTML标签清理
  const cleanHtml = (html) => {
    if (!html) return '';
    return html
      .replace(/<[^>]*>/g, '') // 移除HTML标签
      .replace(/&nbsp;/g, ' ') // 替换空格
      .replace(/&quot;/g, '"') // 替换引号
      .replace(/&amp;/g, '&') // 替换&
      .replace(/&lt;/g, '<') // 替换<
      .replace(/&gt;/g, '>') // 替换>
      .replace(/\s+/g, ' ') // 合并多个空格
      .trim(); // 移除首尾空格
  };

  // 时间格式化
  const formatTime = (dateStr) => {
    const publishDate = new Date(dateStr);
    const now = new Date();
    const diffMs = now - publishDate;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) {
      return '现在';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}分钟前`;
    } else if (diffHours < 24) {
      return `${diffHours}小时前`;
    } else if (diffDays < 30) {
      return `${diffDays}天前`;
    } else {
      const month = publishDate.getMonth() + 1;
      const day = publishDate.getDate();
      return `${month}月${day}日`;
    }
  };

  const cleanTitle = cleanHtml(title);
  const cleanDescription = cleanHtml(description);
  const formattedTime = formatTime(pubDate);
  
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={2}>
          {cleanTitle}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {cleanDescription}
        </Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.source}>TechFlow</Text>
        <Text style={styles.time}>{formattedTime}</Text>
      </View>
    </View>
  );
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
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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

export default ArticleUpdatesCard1;
