// 首页
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import FirmOfferCard from '../../../components/FirmOfferCard';
import request from '../../../utils/request';

const SubscriptionsScreen = ({ navigation }) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.post('/api/user/getSubscribeCopyer');
        console.log(response.data);

        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.screen}>
        <FlatList
          data={items}
          renderItem={({ item }) => <FirmOfferCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          // scrollEnabled={false}
          // nestedScrollEnabled={true}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
});

export default SubscriptionsScreen;