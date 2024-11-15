// DetailStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CustomHeader from '../../components/CustomHeader';

import BalanceScreen from './Balance';
import RechargePage from './Recharge';
import AccountSecurityScreen from './AccountSecurity'
import BindEmailScreen from './BindEmail';
import ResetPasswordScreen from './ResetPassword';
import NotificationSettingsScreen from './NotificationSettings';
import LoginScreen from './login';
import RegisterScreen from './Register';
import AssetsDetail from './assets/';
import AccountManage from './assets/AccountManage';
import UserInfoScreen from './UserInfo';

const Stack = createStackNavigator();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Balance"
        component={BalanceScreen}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader />,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />

      <Stack.Screen 
        name="Recharge"
        component={RechargePage}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader />,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />

      <Stack.Screen 
        name="AccountSecurity"
        component={AccountSecurityScreen}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader />,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />
      
      <Stack.Screen 
        name="BindEmail"
        component={BindEmailScreen}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader />,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />

      <Stack.Screen 
        name="ResetPassword"
        component={ResetPasswordScreen}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader />,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />

      <Stack.Screen 
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader />,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />

      <Stack.Screen 
        name="Login"
        component={LoginScreen}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader />,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />

      <Stack.Screen 
        name="Register"
        component={RegisterScreen}
        // options={{ headerShown: false }}
        options={{
            header: () => <CustomHeader />,
            headerTintColor: '#fff', // 返回按钮颜色
          }}
      />

      <Stack.Screen 
        name="AssetsStack"
        component={AssetsDetail}
        options={{
            header: () => <CustomHeader />,
            headerTintColor: '#fff', // 返回按钮颜色
            headerShown: false
          }}
      />

      <Stack.Screen 
        name="AccountManage"
        component={AccountManage}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen 
        name="UserInfo"
        component={UserInfoScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>

    
    
    
  );
};

export default AccountStackNavigator;
