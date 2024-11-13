import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import request from '../utils/request';


// 取消、修改 后回调到 “我的跟单” 的主页 然后刷新页面内容
const MyFollowCard = ({ navigation, orderId, avatarUri, nickName, principal, copyRatio, netIncome, Yield, onCancelFollow}) => {
  
  return (
    <Card containerStyle={styles.card}>
      {/* 顶部行：头像、文本、按钮 */}
      <View style={styles.topRow}>
        {/* 头像 */}
        <Avatar
          rounded
          size="medium"
          source={{ uri: avatarUri }} // 替换为实际头像 URL
        />
        {/* 文本部分 */}
        <View style={styles.textSection}>
          <Text style={styles.title}>{ nickName }</Text>
          <Text style={styles.subText}>投入本金: $ { principal }</Text>
          <Text style={styles.subText}>跟单比例: { copyRatio * 100 }%</Text>
        </View>
        {/* 按钮部分 */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.followButton} onPress={() => onCancelFollow(orderId)}>
            <Text style={styles.buttonText}>取消跟单</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => { navigation.navigate('MyFollowsStack', {screen: 'CopyTrade', params: {traderId: orderId}})}}>
            <Text style={styles.buttonText}>编辑</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 净收益行 */}
      <View style={styles.bottomRow}>
        <Text style={styles.profitLabel}>净收益</Text>
        <Text style={styles.profitValue}>$ { netIncome }</Text>
        <Text style={styles.profitRate}>收益率 { Yield }%</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  // 卡片样式：设置圆角、内边距和阴影效果
  card: {
    borderRadius: 10, // 卡片边缘圆角
    borderWidth: 1, // 去除默认边框线
    marginBottom: 15, // 卡片底部的外边距，控制与下一个卡片的间距
  },
  
  // 顶部行样式：用于头像、文本和按钮的排列
  topRow: {
    flexDirection: 'row', // 横向排列头像、文本和按钮
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
    marginBottom: 5, // 标题与跟随文本的间距
  },
  subText: {
    color: '#666', // 文本颜色设置为灰色
    fontSize: 14, // 文本字体大小
  },

  // 按钮部分样式
  buttonSection: {
    flexDirection: 'row', // 横向排列两个按钮
    alignItems: 'center', // 按钮垂直居中对齐
  },
  followButton: {
    backgroundColor: 'black', // 按钮背景色
    paddingHorizontal: 10, // 水平方向的内边距
    paddingVertical: 5, // 垂直方向的内边距
    borderRadius: 20, // 按钮边缘圆角
    marginRight: 10, // 两个按钮之间的间距
  },
  editButton: {
    backgroundColor: 'black', // 按钮背景色
    paddingHorizontal: 10, // 水平方向的内边距
    paddingVertical: 5, // 垂直方向的内边距
    borderRadius: 20, // 按钮边缘圆角
  },
  buttonText: {
    color: 'white', // 按钮文字颜色
    fontSize: 12, // 按钮文字大小
  },

  // 底部行样式：用于显示净收益、收益率等信息
  bottomRow: {
    flexDirection: 'row', // 横向排列净收益和收益率信息
    justifyContent: 'space-between', // 两端对齐布局
    marginTop: 15, // 顶部行和底部行之间的间距
  },
  profitLabel: {
    color: '#999', // 净收益标签颜色
    fontSize: 14, // 净收益标签字体大小
  },
  profitValue: {
    color: '#10C800', // 净收益金额的绿色文本
    fontWeight: 'bold', // 净收益金额加粗显示
    fontSize: 16, // 净收益金额字体大小
  },
  profitRate: {
    color: '#10C800', // 收益率的绿色文本
    fontSize: 14, // 收益率文本字体大小
  },
});

export default MyFollowCard;
