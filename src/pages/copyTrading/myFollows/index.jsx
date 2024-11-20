// 首页
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Tab, TabView, Text } from '@rneui/themed';

import MyFollowCard from '../../../components/MyFollowCard';

import request from '../../../utils/request';

const MyFollowsScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [index, setIndex] = React.useState(0);

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
    <ScrollView style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true} // 确保子组件可以滚动
    >
      <View style={styles.screen}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false} // 禁止 FlatList 自身滚动
          nestedScrollEnabled={true}
        />
        {/* <MyFollowCard></MyFollowCard> */}
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: 'black',
              height: 3,
            }}

          >
            <Tab.Item title="当前持仓" titleStyle={{ fontSize: 12 }}/>
            <Tab.Item title="历史持仓" titleStyle={{ fontSize: 12 }}/>
          </Tab>
          
          <TabView value={index} onChange={setIndex} animationType="spring" style={{ flex: 1 }} >
            <TabView.Item style={{ backgroundColor: 'red', flex: 1 }}>
              <Text h1>当前持仓</Text>
            </TabView.Item>
            <TabView.Item style={{ backgroundColor: 'blue', flex: 1 }}>
              <Text h1>历史持仓</Text>
            </TabView.Item>
          </TabView>
      </View>
    </ScrollView>


  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },

});

export default MyFollowsScreen;