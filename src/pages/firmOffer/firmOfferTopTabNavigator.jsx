import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import DiscoveryHomeScreen from './discovery';
import LeaderboardScreen from './leaderboard';
import SubscriptionsScreen from './subscriptions';
import LiveTradingIntegrationScreen from './liveTradingIntegration';

import CustomTopNavBar from '../../components/TopNavBar'; // 引入自定义导航栏组件
import DetailStackNavigator from './discovery/Detail/DetailStackNavigator';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const FirmOfferTobTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="发现"
      tabBar={(props) => <CustomTopNavBar {...props} />} // 使用自定义导航栏组件
    >
      <Tab.Screen name="发现" component={DiscoveryHomeScreen} />
      <Tab.Screen name="排行榜" component={LeaderboardScreen} />
      <Tab.Screen name="订阅" component={SubscriptionsScreen} />
      <Tab.Screen name="接入实盘" component={LiveTradingIntegrationScreen} />
      
    </Tab.Navigator>
  );
};


export default FirmOfferTobTabNavigator;