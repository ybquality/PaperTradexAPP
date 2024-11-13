import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"; // 安全边界
import { NavigationContainer } from '@react-navigation/native';

import BottomTabStackNavigator from './src/components/BottomTabNavigator'

export default function App() {
  return (
    <SafeAreaProvider >
        <SafeAreaView style={{flex: 1}}>
          {/* <Text>Content is in safe area.</Text> */}
          <StatusBar style="auto" />
          <NavigationContainer     screenOptions={{
      cardStyle: { backgroundColor: '#f0f0f0' }, // 设置背景颜色
    }}>
            <BottomTabStackNavigator/>
          </NavigationContainer>
          
        </SafeAreaView>

    </SafeAreaProvider>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
