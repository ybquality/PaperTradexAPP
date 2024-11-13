import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import OverviewScreen from './overview';
import MyFollowsScreen from './myFollows';
import MyHistoryScreen from './myHistory';

import CustomTopNavBar from '../../components/TopNavBar'; // 引入自定义导航栏组件

const Tab = createMaterialTopTabNavigator();

const CopyTradingTopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTopNavBar {...props} />} // 使用自定义导航栏组件
    >
      <Tab.Screen name="发现" component={OverviewScreen} />
      <Tab.Screen name="我的跟单" component={MyFollowsScreen} />
      <Tab.Screen name="我的历史" component={MyHistoryScreen} />
    </Tab.Navigator>
  );
};

export default CopyTradingTopTabNavigator;