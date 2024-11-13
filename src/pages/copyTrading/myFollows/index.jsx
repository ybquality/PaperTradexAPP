// 首页
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import MyFollowCard from '../../../components/MyFollowCard';

import request from '../../../utils/request';

const MyFollowsScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  const handleCancelFollowPress = async (orderId) => {
    // 在这里处理取消跟单的操作
    console.log('Cancel Follow', orderId);
    
    const response = await request.post('/api/exchange/cancel_user_copy_order', { orderId });

    if (response.data.code === 200){
      console.log('取消跟单成功');
      alert('取消跟单成功')
    }else{
      console.log(response.data.msg);
      alert('取消跟单失败: ', response.data.msg)
    }
    
    await fetchData();
  };
  
  async function fetchData() {
    try {
      const response = await request.get('/api/exchange/get_user_copy_order');

      if (response.data.code === 200) {
        setItems(response.data.data);
      }else if (response.data.code === 400) {
        setItems(response.data.data);
        alert(response.data.msg)
      }

      
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }



  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', fetchData);

    return unsubscribe; // 清理函数，移除监听器
  }, [navigation]);

  const renderItem = ({ item }) => (
    <MyFollowCard
      navigation={navigation}
      orderId={item.id}
      avatarUri={item.avatarUri}
      nickName={item.nickName}
      principal={item.principal}
      copyRatio={item.copyRatio}
      netIncome={item.netIncome}
      Yield={item.Yield}
      onCancelFollow={handleCancelFollowPress}
    />
  );
  
  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
      {/* <MyFollowCard></MyFollowCard> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
});

export default MyFollowsScreen;