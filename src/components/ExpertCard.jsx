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

        {/* 数据部分 */}
        <View style={styles.dataContainer}>
          {/* 左侧数据 */}
          <View style={styles.dataColumn}>
            <View style={styles.dataRow}>
              <Text style={styles.labelText}>投入本金</Text>
              <Text style={styles.valueText}>$10,000.00</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.labelText}>跟单比例</Text>
              <Text style={styles.valueText}>10%</Text>
            </View>
          </View>

          {/* 右侧数据 */}
          <View style={[styles.dataColumn, styles.rightDataColumn]}>
            <View style={styles.dataRow}>
              <Text style={[styles.labelText, styles.rightAlignText]}>净收益</Text>
              <Text style={[styles.valueText, styles.profitText, styles.rightAlignText]}>$10,000.00</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={[styles.labelText, styles.rightAlignText]}>收益率</Text>
              <Text style={[styles.valueText, styles.profitText, styles.rightAlignText]}>157%</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 12,
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataColumn: {
    flex: 1,
  },
  rightDataColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dataRow: {
    marginBottom: 12,
  },
  labelText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  valueText: {
    fontSize: 14,
    color: '#333',
  },
  profitText: {
    color: '#22B573',
  },
  rightAlignText: {
    textAlign: 'right',
  },
});

export default ExpertCard;
