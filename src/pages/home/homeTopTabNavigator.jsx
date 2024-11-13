import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './pages/home';
import RemindScreen from './pages/remind';
import NormScreen from './pages/norm';
import CustomTopNavBar from '../../components/TopNavBar'; // 引入自定义导航栏组件

const Tab = createMaterialTopTabNavigator();

const HomeTobTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTopNavBar {...props} />} // 使用自定义导航栏组件
    >
      <Tab.Screen name="首页" component={HomeScreen} />
      <Tab.Screen name="指标" component={NormScreen} />
      <Tab.Screen name="提醒" component={RemindScreen} />
    </Tab.Navigator>
  );
};

export default HomeTobTabNavigator;