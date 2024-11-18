import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Card, Icon } from 'react-native-elements';
import request from '../utils/request';


// 取消、修改 后回调到 “我的跟单” 的主页 然后刷新页面内容
const MyFollowCard = ({ navigation, orderId, avatarUri, nickName, principal, copyRatio, netIncome, Yield, onCancelFollow}) => {

  console.log('MyFollowCard:', orderId, avatarUri, nickName, principal, copyRatio, netIncome, Yield);
  
  
  return (
    <Card containerStyle={styles.card}>
      {/* 顶部行：头像、昵称、按钮 */}
      <View style={styles.topRow}>
        <Avatar
          rounded
          size={32}
          source={{ uri: avatarUri }}
          containerStyle={{
            borderWidth: 0.5,
            borderColor: '#00000066',
          }}
        />
        <Text style={styles.title}>{ nickName }</Text>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.followButton} onPress={() => onCancelFollow(orderId)}>
            <Text style={styles.buttonText}>取消跟单</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => { 
              navigation.navigate('MyFollowsStack', {
                screen: 'CopyTrade', 
                params: {traderId: orderId, principal: principal, copyRatio: copyRatio}
              })
            }}
          >
            <Icon
              name="edit"
              type="feather"
              size={14}
              color="#FFFFFF"
              style={styles.editIcon}
            />
            <Text style={styles.editButtonText}>编辑</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 投入本金和净收益行 */}
      <View style={styles.infoRow}>
        {/* 左侧：投入本金和跟单比例 */}
        <View style={styles.leftInfo}>
          <Text style={styles.infoLabel}>投入本金</Text>
          <Text style={styles.infoValue}>${ principal }</Text>
          <Text style={styles.subText}>
            跟单比例: <Text style={styles.copyRatioValue}>{ copyRatio * 100 }%</Text>
          </Text>
        </View>
        
        {/* 右侧：净收益和收益率 */}
        <View style={styles.rightInfo}>
          <Text style={styles.infoLabel}>净收益</Text>
          <Text style={[styles.infoValue, styles.profitValue]}>${ netIncome }</Text>
          <Text style={styles.profitRate}>收益率 { Yield }%</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(243, 243, 243, 1)',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 0,
    marginVertical: 6,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  
  title: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 10,
    flex: 1,
  },

  buttonSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    gap: 8,
  },

  followButton: {
    backgroundColor: '#E4E4E4',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },

  editButton: {
    backgroundColor: '#000000',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editIcon: {
    marginRight: 4,
  },

  buttonText: {
    fontSize: 12,
    color: '#000000',
  },

  editButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },

  // 新增样式
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginTop: 12,
  },

  leftInfo: {
    flex: 1,
    gap: 10,
  },

  rightInfo: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 10,
  },

  infoLabel: {
    color: '#00000066',
    fontSize: 12,
    marginBottom: 0,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 0,
  },

  profitValue: {
    color: '#00D0AC',
    fontSize: 14,
    fontWeight: '500',
  },

  subText: {
    color: '#00000066',
    fontSize: 12,
    fontWeight: '400',
  },

  copyRatioValue: {
    color: '#000000',
    fontWeight: '500',
  },

  profitRate: {
    color: '#00000066',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default MyFollowCard;
