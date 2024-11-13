import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AllIncomeScreen from './pages/allIncome';
import ProfitScreen from './pages/profit';

import CustomTopNavBar from '../../../../../components/TopNavBar';

const Tab = createMaterialTopTabNavigator();

const DataModelTopTabNavigator = ( {data} ) => {
  console.log('DataModelTopTabNavigator', data);
  
  return (
    <Tab.Navigator
      initialRouteName="累计收益"
      tabBar={(props) => <CustomTopNavBar {...props} />} // 使用自定义导航栏组件
    >
      <Tab.Screen name="累计收益" component={AllIncomeScreen} initialParams={ {id: data} }/>
      <Tab.Screen name="累计收益率" component={ProfitScreen} initialParams={ {id: data} }/>
    </Tab.Navigator>
  );
};


export default DataModelTopTabNavigator;