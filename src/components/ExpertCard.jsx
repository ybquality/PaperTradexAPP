import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ExpertCard = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.title}>当前跟随的交易专家</Text>
      
      <View style={styles.card}>
        {/* 头部：交易员信息和状态 */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix' }}
              style={styles.avatar}
            />
            <Text style={styles.expertName}>坚持做空</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.statusDotOuter}>
              <View style={styles.statusDotInner} />
            </View>
            <Text style={styles.statusText}>运行中</Text>
          </View>
        </View>

        {/* 数据展示区 */}
        <View style={styles.dataContainer}>
          <View style={[styles.dataItem, styles.leftAlignItem]}>
            <Text style={styles.labelText}>投入本金</Text>
            <Text style={styles.valueText}>$10,000.00</Text>
          </View>
          <View style={[styles.dataItem, styles.centerAlignItem]}>
            <Text style={styles.labelText}>累计收益</Text>
            <Text style={[styles.valueText, styles.profitText]}>$15,700.00</Text>
          </View>
          <View style={[styles.dataItem, styles.rightAlignItem]}>
            <Text style={styles.labelText}>昨日收益</Text>
            <Text style={[styles.valueText, styles.profitText]}>$100.00</Text>
          </View>
        </View>

        {/* 详情按钮 */}
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={() => {
            navigation.navigate('MyFollowsStack', {
              screen: 'FollowTradePositions'
            })
          }}
        >
          <Text style={styles.detailsButtonText}>详情</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 12,
    marginTop: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(243, 243, 243, 1)',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#eee',
  },
  expertName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDotOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 208, 172, 0.2)',
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 208, 172, 1)',
  },
  statusText: {
    color: 'rgba(0, 208, 172, 1)',
    fontSize: 12,
    fontWeight: '500',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  dataItem: {
    flex: 1,
  },
  leftAlignItem: {
    alignItems: 'flex-start',
  },
  centerAlignItem: {
    alignItems: 'center',
  },
  rightAlignItem: {
    alignItems: 'flex-end',
  },
  labelText: {
    marginBottom: 4,
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.4)',
  },
  valueText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '500',
  },
  profitText: {
    color: 'rgba(0, 208, 172, 1)',
  },
  detailsButton: {
    backgroundColor: 'rgba(243, 244, 246, 1)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'rgba(17, 24, 39, 1)',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ExpertCard;
