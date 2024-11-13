// DetailStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CustomHeader from '../../../components/CustomHeader';
import CopyTradeScreen from './CopyTrade';

const Stack = createStackNavigator();

const MyFollowsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CopyTrade"
        component={CopyTradeScreen}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader titleName='跟单设置' rightText='教程'/>,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />
    </Stack.Navigator>
  );
};

export default MyFollowsStackNavigator;
