import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import BottomBar from './BottomBar'; // 导入自定义 BottomBar

import AccountScreen from '../pages/account';
import ArticleUpdatesScreen from '../pages/articleUpdates';
import CopyTradingScreen from '../pages/copyTrading';
import FirmOfferScreen from '../pages/firmOffer';

import HomeTobTabNavigator from '../pages/home/homeTopTabNavigator';
import FirmOfferTobTabNavigator from '../pages/firmOffer/firmOfferTopTabNavigator';
import CopyTradingTopTabNavigator from '../pages/copyTrading/copyTradingTopTabNavigator';
import ArticleUpdatesTopTabNavigator from '../pages/articleUpdates/copyTradingTopTabNavigator';

import DetailStackNavigator from '../pages/firmOffer/discovery/Detail/DetailStackNavigator';
import AccountStackNavigator from '../pages/account/AccountStackNavigator';
import HomeStackNavigator from '../pages/home/HomeStackNavigator';
import MyFollowsStackNavigator from '../pages/copyTrading/myFollows/MyFollowsStackNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomBar {...props} />} // 使用自定义的 BottomBar
    >
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeTobTabNavigator}
        options={{ headerShown: false, tabBarLabel: '首页', tabBarIcon: 'home' }}
      />
      <Tab.Screen
        name="FirmOfferScreen"
        component={FirmOfferTobTabNavigator}
        options={{ headerShown: false, tabBarLabel: '实盘', tabBarIcon: 'grain' }}
      />
      <Tab.Screen
        name="CopyTradingScreen"
        component={CopyTradingTopTabNavigator}
        options={{ headerShown: false, tabBarLabel: '跟单', tabBarIcon: 'content-copy' }}
      />
      <Tab.Screen
        name="ArticleUpdatesScreen"
        component={ArticleUpdatesTopTabNavigator}
        options={{ headerShown: false, tabBarLabel: '动态', tabBarIcon: 'explore' }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false, tabBarLabel: '我的', tabBarIcon: 'account-circle' }}
      />
    </Tab.Navigator>
  );
};

const BottomTabStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="BottomTabNavigator" 
        component={BottomTabNavigator} 
        options={{ headerShown: false }} // 隐藏顶部导航栏
      />
      <Stack.Screen
        name="DetailStack"
        component={DetailStackNavigator}
        options={{ headerShown: false }} // 隐藏顶部导航栏
      />
      <Stack.Screen
        name="AccountStack"
        component={AccountStackNavigator}
        options={{ headerShown: false }} // 隐藏顶部导航栏
      />
      <Stack.Screen
        name="MyFollowsStack"
        component={MyFollowsStackNavigator}
        options={{ headerShown: false }} // 隐藏顶部导航栏
      />
      <Stack.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{ headerShown: false }} // 隐藏顶部导航栏
      />
    </Stack.Navigator>
  );
};


export default BottomTabStackNavigator;