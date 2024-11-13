// 首页
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import SearchBar from '../../../components/SearchBar';

import FirmOfferCard from '../../../components/FirmOfferCard';
import { Image } from 'expo-image';

import axios from 'axios';

import config from '../../../../config';
import { BASE_URL } from '../../../utils/pathMap';
import request from '../../../utils/request';

const DiscoveryScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  const loadData = async () => {
    try {
      const response = await request.get('/test/api/getFirmOfferDataList');
      // console.log(response.data);

      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();

    setRefreshing(false);
  }, []);


  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}
      showsVerticalScrollIndicator={false} // 隐藏垂直滚动条
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.screen}>
        <SearchBar />
        <View style={{ marginBottom: 20 }}>
          <Image
            source={require('../../../../assets/invitation.png')} // 你的图片文件
            style={styles.image} // 使用样式来定义图片的尺寸
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
          实盘
        </Text>
        {/* <CardComponent {...cardData}/> */}
        <FlatList
          data={items}
          renderItem={({ item }) => <FirmOfferCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          nestedScrollEnabled={true}
        />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
  image: {
    width: '100%', // 设置图片的宽度为容器的100%
    height: 130, // 设置图片的高度
    contentFit: 'contain', // 保持图片的宽高比
  },
});

export default DiscoveryScreen;