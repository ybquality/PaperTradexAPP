import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ExpertCard = () => {
  return (
    <View>
      <Text style={styles.title}>当前跟随的交易专家</Text>
      
      <View style={styles.card}>
        {/* 头部：交易员信息和详情按钮 */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix' }}
              style={styles.avatar}
            />
            <Text style={styles.expertName}>坚持做空</Text>
          </View>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>详情</Text>
          </TouchableOpacity>
        </View>

        {/* 上部数据 */}
        <View style={styles.dataRow}>
          <View>
            <Text style={styles.labelText}>投入本金</Text>
            <Text style={styles.valueText}>$10,000.00</Text>
          </View>
          <View>
            <Text style={[styles.labelText, styles.rightAlignText]}>净收益</Text>
            <Text style={[styles.valueText, styles.profitText, styles.rightAlignText]}>$10,000.00</Text>
          </View>
        </View>

        {/* 下部数据 */}
        <View style={styles.dataRow}>
          <View style={styles.inlineData}>
            <Text style={styles.labelText}>跟单比例</Text>
            <Text style={styles.valueText}>10%</Text>
          </View>
          <View style={[styles.inlineData, styles.rightAlign]}>
            <Text style={styles.labelText}>收益率</Text>
            <Text style={[styles.valueText, styles.profitText]}>157%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    marginTop: 12,
    marginLeft: 10,
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
  detailsButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  inlineData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rightAlign: {
    justifyContent: 'flex-end',
  },
  labelText: {
    fontSize: 12,
    color: '#666',
  },
  valueText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  profitText: {
    color: 'rgba(0, 208, 172, 1)',
  },
  rightAlignText: {
    textAlign: 'right',
  },
});

export default ExpertCard;
