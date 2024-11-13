import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccountSecurityScreen = (  ) => {
  
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      {/* 手机号部分 */}
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>手机号</Text>
        <Text style={styles.itemValue}>186****9512</Text>
      </View>

      {/* 邮箱部分 */}
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('AccountStack', {screen: 'BindEmail'})}>
        <Text style={styles.itemLabel}>邮箱</Text>
        <Text style={[styles.itemValue, styles.link]}>未绑定</Text>
      </TouchableOpacity>

      {/* 重置密码部分 */}
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('AccountStack', {screen: 'ResetPassword'})}>
        <Text style={styles.itemLabel}>重置密码</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginBottom: 10,
  },
  itemLabel: {
    fontSize: 16,
    color: '#333',
  },
  itemValue: {
    fontSize: 16,
    color: '#666',
  },
  link: {
    color: '#00C1A4', // 蓝绿色，表示可点击的状态
  },
  arrow: {
    fontSize: 18,
    color: '#666',
  },
});

export default AccountSecurityScreen;
