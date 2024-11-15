import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const AssetOverview = ({ navigation }) => {
  const accounts = [
    {
      id: 1,
      icon: require('../../../assets/Exchanges/okx2.png'), 
      name: 'OKX-2',
      value: '$ 5.18'
    },
    {
      id: 2,
      icon: require('../../../assets/Exchanges/okx2.png'), 
      name: '这里显示 交易所名字-备注名',
      value: '0'
    },
    {
      id: 3,
      icon: require('../../../assets/Exchanges/okx2.png'), 
      name: 'OKX-1',
      tag: '异常',
      value: '0'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>资产总览</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AccountStack', { screen: 'AssetsStack' })}
          style={styles.moreButton}
        >
          <Text style={styles.moreText}>查看更多</Text>
          <Icon name="chevron-right" type="font-awesome" color="#666" size={12} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.assetItem, styles.leftAssetItem]}>
          <Text style={styles.assetLabel}>总资产(USDT)</Text>
          <Text style={styles.assetValue}>0.00</Text>
        </View>
        
        <View style={[styles.assetItem, styles.rightAssetItem]}>
          <Text style={styles.assetLabel}>节省手续费(USDT)</Text>
          <Text style={styles.assetValue}>0.00</Text>
        </View>
      </View>

      <View style={styles.accountList}>
        {accounts.map(account => (
          <TouchableOpacity 
            key={account.id}
            style={styles.accountItem}
            onPress={() => navigation.navigate('AccountDetail', { accountId: 'OKX-1' })}
          >
            <View style={styles.accountLeft}>
              <Image source={account.icon} style={styles.accountIcon} />
              <View style={styles.accountInfo}>
                <View style={styles.nameContainer}>
                  <Text style={styles.accountName}>{account.name}</Text>
                  {account.tag && (
                    <View style={styles.tagContainer}>
                      <Text style={styles.tagText}>{account.tag}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.accountRight}>
              <Text style={styles.accountValue}>{account.value}</Text>
              <Icon name="chevron-right" type="font-awesome" color="#666" size={12} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// styles 保持不变
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccc',
  },
  assetItem: {
    flex: 1,
  },
  leftAssetItem: {
    alignItems: 'flex-start',
  },
  rightAssetItem: {
    alignItems: 'flex-end',
  },
  assetLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  assetValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  accountList: {
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  accountInfo: {
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountName: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  tagContainer: {
    backgroundColor: '#FFF7E6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#FFA940',
  },
  accountRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountValue: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
});

export default AssetOverview;
