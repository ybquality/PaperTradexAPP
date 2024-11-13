import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-elements';

const HistoryCard = () => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.row}>
        {/* 头像部分 */}
        <Avatar
          rounded
          size="medium"
          source={{ uri: 'https://placekitten.com/50/50' }} // 替换为实际头像 URL
        />
        {/* 文本部分 */}
        <View style={styles.textSection}>
          <Text style={styles.title}>坚持做空</Text>
          <Text style={styles.subText}>跟单总收益</Text>
          <Text style={styles.profitValue}>$10,000.00</Text>
        </View>
        {/* 时间部分 */}
        <View style={styles.dateSection}>
          <Text style={styles.subText}>跟单时间</Text>
          <Text style={styles.dateText}>2024/08/01-2024/08/01</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  // 卡片样式：设置圆角、内边距和阴影效果
  card: {
    borderRadius: 10, // 卡片边缘圆角
    padding: 15, // 卡片内边距
    borderWidth: 1, // 去除默认边框线
    marginBottom: 15, // 卡片底部的外边距，控制与下一个卡片的间距
  },
  
  // 整体行的布局
  row: {
    flexDirection: 'row', // 横向排列头像、文本、时间
    alignItems: 'center', // 垂直居中对齐
  },
  
  // 文本部分样式
  textSection: {
    flex: 1, // 占据剩余空间
    marginLeft: 10, // 与头像的间距
  },
  title: {
    fontWeight: 'bold', // 标题字体加粗
    fontSize: 16, // 标题字体大小
    marginBottom: 5, // 标题与下方文本的间距
  },
  subText: {
    color: '#666', // 文本颜色设置为灰色
    fontSize: 14, // 文本字体大小
  },
  profitValue: {
    fontWeight: 'bold', // 总收益字体加粗
    fontSize: 16, // 总收益字体大小
    marginTop: 5, // 上方文本与总收益的间距
  },

  // 跟单时间部分样式
  dateSection: {
    alignItems: 'flex-end', // 将时间部分内容右对齐
  },
  dateText: {
    fontSize: 14, // 跟单时间文本字体大小
    color: '#666', // 跟单时间文本颜色
    marginTop: 5, // 上方文本与时间的间距
  },
});

export default HistoryCard;
