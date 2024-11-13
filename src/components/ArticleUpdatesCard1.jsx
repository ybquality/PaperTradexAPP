import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Avatar } from 'react-native-elements';

const ArticleUpdatesCard1 = ({ title, description, avatarUrl, username, time }) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Avatar rounded source={{ uri: avatarUrl }} size="small" />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10, // 圆角边框
    borderColor: '#E0E0E0', // 边框颜色改为灰色
    borderWidth: 1, // 边框宽度
    padding: 10,
    marginVertical: 10,
    // 移除阴影效果
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  cardHeader: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  time: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#999',
  },
});

export default ArticleUpdatesCard1;
