// DetailStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TradeRankingScreen from './pages/home/TradeRanking';
import ReferralScreen from './referral';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TradeRanking"
        component={TradeRankingScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Referral"
        component={ReferralScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>

    
    
    
  );
};

export default HomeStackNavigator;
