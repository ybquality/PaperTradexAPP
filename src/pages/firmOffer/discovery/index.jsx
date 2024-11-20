// 首页
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, RefreshControl, Image } from 'react-native';
import SearchBar from '../../../components/SearchBar';

import FirmOfferCard from '../../../components/FirmOfferCard';
import InviteCard from '../../../components/InviteCard';

import axios from 'axios';

import config from '../../../../config';
import { BASE_URL } from '../../../utils/pathMap';
import request from '../../../utils/request';

const DiscoveryScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const response = await request.get('/test/api/getFirmOfferDataList');
      setItems(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError(error);
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
    <ScrollView 
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#00D0AC']}
          tintColor="#00D0AC"
        />
      }
    >
      <View style={styles.screen}>
        <SearchBar />
        <View style={styles.inviteCardContainer}>
          <InviteCard onPress={() => navigation.navigate('Invite')} />
        </View>
        <Text style={styles.title}>实盘</Text>
        
        <View style={[styles.contentContainer, !items.length && styles.emptyContentContainer]}>
          {items.length > 0 ? (
            <FlatList
              data={items}
              renderItem={({ item }) => <FirmOfferCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              nestedScrollEnabled={true}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Image 
                source={require('../../../../assets/icon/Empty.png')}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyText}>
                {error ? '获取数据失败，下拉刷新重试' : '暂无实盘数据'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContentContainer: {
    flexGrow: 1,
    minHeight: '100%',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 80,
  },
  inviteCardContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 12
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: 120,
    height: 120,
    // marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
  },
  contentContainer: {
    flex: 1,
  },
  emptyContentContainer: {
    minHeight: 400,
  },
});

export default DiscoveryScreen;