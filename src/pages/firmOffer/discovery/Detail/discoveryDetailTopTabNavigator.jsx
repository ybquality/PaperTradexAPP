import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DataOverviewScreen from './pages/DataOverview';
import PositionInformationScreen from './pages/PositionInformation';

import CustomTopNavBar from '../../../../components/TopNavBar';

const Tab = createMaterialTopTabNavigator();

const DiscoveryDetailTobTabNavigator = ( {data} ) => {
  return (
    <Tab.Navigator
      initialRouteName="数据概览"
      tabBar={(props) => (
        <CustomTopNavBar 
          {...props}
          customStyles={{
            container: {
              paddingLeft: 0,
            },
            tabItem: {
              // 自定义样式
            },
          }}
        />
      )}
    >
      <Tab.Screen name="数据概览" component={DataOverviewScreen} initialParams={data} />
      <Tab.Screen name="持仓信息" component={PositionInformationScreen} initialParams={data}/>
    </Tab.Navigator>
  );
};


export default DiscoveryDetailTobTabNavigator;