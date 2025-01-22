import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import RecommendedScreen from './recommended';
import SquareScreen from './square';
import KOLScreen from './KOL';

import CustomTopNavBar from '../../components/TopNavBar'; // 引入自定义导航栏组件

const Tab = createMaterialTopTabNavigator();

const ArticleUpdatesTopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="推荐"
      tabBar={(props) => <CustomTopNavBar {...props} />} // 使用自定义导航栏组件
    >
      <Tab.Screen name="推荐" component={RecommendedScreen} />
      <Tab.Screen name="广场" component={SquareScreen} />
      <Tab.Screen name="KOL" component={KOLScreen} />
    </Tab.Navigator>
  );
};

export default ArticleUpdatesTopTabNavigator;