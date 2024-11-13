import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

const ArticleUpdatesCard2 = ({ username, description, avatarUrl, time }) => {
  return (
    <View style={styles.card}>
      {/* 卡片顶部部分 */}
      <View style={styles.cardHeader}>
        <Avatar
          rounded
          source={{ uri: avatarUrl }}
          size="medium"
        />
        <View style={styles.headerText}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <TouchableOpacity style={styles.moreIcon}>
          <Icon name="more-horiz" type="material" />
        </TouchableOpacity>
      </View>

      {/* 描述文字 */}
      <Text style={styles.description}>{description}</Text>

      {/* 卡片底部部分 */}
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="thumb-up" type="material" color="#00C853" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="share" type="material" color="#00C853" />
        </TouchableOpacity>
      </View>
    </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  moreIcon: {
    padding: 5,
  },
  description: {
    marginVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default ArticleUpdatesCard2;
