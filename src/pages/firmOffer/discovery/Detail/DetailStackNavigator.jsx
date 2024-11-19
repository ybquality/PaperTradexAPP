// DetailStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';

import DetailScreen from '.';
import CustomHeader from '../../../../components/CustomHeader';
import CopyTradeScreen from './CopyTrade';
import accessTradingAccount from './accessTradingAccount';

const Stack = createStackNavigator();

const DetailStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader />,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />
      <Stack.Screen
        name="CopyTrade"
        component={CopyTradeScreen}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader titleName='跟单设置' rightText='教程'/>,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />
      <Stack.Screen
        name="accessTradingAccount"
        component={accessTradingAccount}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader titleName='接入交易账户' rightText='教程'/>,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />
    </Stack.Navigator>
  );
};

export default DetailStackNavigator;
