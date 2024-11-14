import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DataOverviewScreen from './pages/DataOverview';
import PositionInformationScreen from './pages/PositionInformation';

import CustomTopNavBar from '../../../../components/TopNavBar';

const Tab = createMaterialTopTabNavigator();

const DiscoveryDetailTobTabNavigator = ( {data} ) => {
  return (
    // 使用自定义导航栏组件
    <Tab.Navigator
      initialRouteName="数据概览"
      tabBar={(props) => (<CustomTopNavBar {...props}/>)}
    >
      <Tab.Screen name="数据概览" component={DataOverviewScreen} initialParams={data} />
      <Tab.Screen name="持仓信息" component={PositionInformationScreen} initialParams={data}/>
    </Tab.Navigator>
  );
};


export default DiscoveryDetailTobTabNavigator;