import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BalanceScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* 余额和手续费显示区域 */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceText}>0</Text>
          <Text style={styles.descriptionText}>可用余额</Text>
          <TouchableOpacity style={styles.rechargeButton} onPress={() => navigation.navigate('AccountStack', {screen: 'Recharge'})}>
            <Text style={styles.buttonText}>充值</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceText}>0</Text>
          <Text style={styles.descriptionText}>返佣手续费</Text>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.buttonText}>提现</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 设置与服务 */}
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceTitle}>设置与服务</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Text>返佣明细</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text>返现规则</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text>在线客服</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text>关于我们</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 资产明细 */}
      <TouchableOpacity style={styles.detailButton}>
        <Text>资产明细</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  balanceBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  rechargeButton: {
    backgroundColor: '#00E5FF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  withdrawButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  serviceContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    alignItems: 'center',
  },
  detailButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default BalanceScreen;
