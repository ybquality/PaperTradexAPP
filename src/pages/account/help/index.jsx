import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import NavBar from '../../../components/common/navbar';
import { Icon } from '@rneui/themed';
import Collapse from '../../../components/common/Collapse';

// 模拟数据
const faqData = [
  {
    id: '1',
    title: '如何充值？',
    content: '1. 进入资产页面\n2. 点击充值按钮\n3. 选择充值网络\n4. 输入充值金额\n5. 确认充值'
  },
  {
    id: '2',
    title: '如何提现？',
    content: '1. 进入资产页面\n2. 点击提现按钮\n3. 选择提现网络\n4. 输入提现金额\n5. 确认提现'
  }
];

const HelpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.titleContainer}>
        <View style={styles.title}>
            <Icon name="arrow-left" type="feather" size={24} color="rgba(17, 24, 39, 1)" onPress={() => navigation.goBack()} />
            <Text style={styles.titleTitle}>您需要什么帮助吗?</Text>
        </View>
        <Text style={styles.titleText}>您可以通过提交工单提交您的问题，或者通过邮箱联系我们</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="file-text" type="feather" size={20} color="rgba(107, 114, 128, 1)" />
            <Text style={styles.buttonText}>提交工单</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="mail" type="feather" size={20} color="rgba(107, 114, 128, 1)" />
            <Text style={styles.buttonText}>商务联系</Text>
          </TouchableOpacity>
        </View>
      </View>


      <Text style={styles.sectionTitle}>常见问题</Text>
      <ScrollView style={styles.content}>
          
          {faqData.map(item => (
            <Collapse 
              key={item.id}
              title={item.title}
              containerStyle={styles.collapseContainer}
              titleStyle={styles.collapseTitle}
              contentStyle={styles.collapseContent}
            >
              <Text style={styles.contentText}>{item.content}</Text>
            </Collapse>
          ))}
      </ScrollView>

      {/* 底部固定按钮 */}
      <TouchableOpacity style={styles.floatingButton} activeOpacity={0.8}>
        <Icon
          name="message-circle"
          type="feather"
          size={20}
          color="#FFFFFF"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>在线客服</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingVertical: 28,
    gap: 24,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  titleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(17, 24, 39, 1)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: 48,
    paddingHorizontal: 32,
    borderRadius: 8,
    gap: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingHorizontal: 24,
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  collapseContainer: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  collapseTitle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  collapseContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  itemText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: 48,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HelpScreen;