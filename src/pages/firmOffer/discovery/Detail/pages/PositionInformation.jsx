// 首页
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import request from '../../../../../utils/request';

const PositionInformationScreen = ({ route, navigation }) => {
  const [items, setItems] = useState([]);

  const InfoCard = ({ item }) => {
    return (
      <View style={styles.card}>
        {/* 第一行 */}
        <View style={styles.header}>
          <Text style={styles.pairText}>{item.instrumentId}</Text>
          <TouchableOpacity style={styles.leverageButton}>
            <Text style={styles.leverageText}>{item.leverage}X</Text>
          </TouchableOpacity>
        </View>

        {/* 第二行 */}
        <View style={styles.row}>
          <View style={styles.leftAlign}>
            <Text style={styles.label}>开仓均价</Text>
            <Text style={styles.price}>${item.avgCost}</Text>
          </View>
          <View style={styles.rightAlign}>
            <Text style={[styles.label, styles.textRight]}>持仓收益率</Text>
            <Text style={[styles.price, styles.textRight, item.pnlRatio < 0 ? styles.negativeRate : styles.positiveRate]}>
              {item.pnlRatio}%
            </Text>
          </View>
        </View>

        {/* 第三行 */}
        <View style={styles.row}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>未实现收益</Text>
            <Text style={[styles.value, item.floatProfit < 0 ? styles.negativeRate : styles.positiveRate]}>
              {item.floatProfit} {item.floatProfitUnit}
            </Text>
          </View>
          <View style={[styles.infoItem, styles.centerAlign]}>
            <Text style={[styles.label, styles.textCenter]}>保证金</Text>
            <Text style={[styles.value, styles.textCenter]}>{item.margin} {item.marginUnit}</Text>
          </View>
          <View style={[styles.infoItem, styles.rightAlign]}>
            <Text style={[styles.label, styles.textRight]}>仓位价值</Text>
            <Text style={[styles.value, styles.textRight]}>{item.valueUsd}</Text>
          </View>
        </View>

        {/* 第四行 */}
        <View style={styles.row}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>持仓数量</Text>
            <Text style={styles.value}>{item.amountNew} {item.amountUnitNew}</Text>
          </View>
          <View style={[styles.infoItem, styles.centerAlign]}>
            <Text style={[styles.label, styles.textCenter]}>预计爆仓价</Text>
            <Text style={[styles.value, styles.textCenter]}>${item.liquiPrice}</Text>
          </View>
          <View style={styles.infoItem}></View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <InfoCard
    item={item}
    />
);

  const fetchData = async () => {

    await request.get('/test/api/getPositionInformation?traderId=' + route.params.id)
      .then(response => {
        console.log('response: ', response.data);
        setItems(response.data.data);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        // scrollEnabled={false}
        nestedScrollEnabled={true} // 允许嵌套滚动
        showsVerticalScrollIndicator={false} // 隐藏垂直滚动条
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    backgroundColor: '#FFF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(243, 243, 243, 1)',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  pairText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
  },
  leverageButton: {
    backgroundColor: 'rgba(128, 255, 233, 1)',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  leverageText: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 12,
    fontWeight: '500',
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 1)',
  },
  negativeRate: {
    color: '#FF4D4F',
  },
  positiveRate: {
    color: '#27C28A',
  },
  leftAlign: {
    alignItems: 'flex-start',
  },
  centerAlign: {
    alignItems: 'center',
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default PositionInformationScreen;