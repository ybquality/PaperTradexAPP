// 首页
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import request from '../../../../../utils/request';

const PositionInformationScreen = ({ route, navigation }) => {
  const [items, setItems] = useState([]);

  const InfoCard = ({ item }) => {
    return (
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.pairText}>{item.instrumentId}</Text>
          <TouchableOpacity style={styles.leverageButton}>
            <Text style={styles.leverageText}>{item.leverage}</Text>
          </TouchableOpacity>
        </View>

        {/* Price and Rate Section */}
        <View style={styles.priceSection}>
          <Text style={styles.price}>${item.avgCost}</Text>
          <Text style={styles.rate}>{item.pnlRatio}%</Text>
        </View>

        {/* Details Section */}
        <View style={styles.detailsSection}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>持仓量</Text>
            <Text style={styles.value}>{item.amountNew} {item.amountUnitNew}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>保证金</Text>
            <Text style={styles.value}>{item.margin} {item.marginUnit}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>持仓价值</Text>
            <Text style={styles.value}>${item.valueUsd}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>收益</Text>
            <Text style={styles.value}>{item.floatProfit} {item.floatProfitUnit}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>预计总价值</Text>
            <Text style={styles.value}>$ {item.liquiPrice}</Text>
          </View>
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
    borderRadius: 10,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light gray border without shadow
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pairText: {
    fontSize: 14,
    color: '#333',
  },
  leverageButton: {
    backgroundColor: '#27C28A', // Green background color
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  leverageText: {
    color: '#fff',
    fontSize: 12,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  rate: {
    fontSize: 20,
    color: '#FF4D4F', // Red color for negative rate
  },
  detailsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%', // Adjust width to have two items per row
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#999',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
});

export default PositionInformationScreen;