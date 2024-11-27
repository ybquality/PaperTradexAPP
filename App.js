import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"; // 安全边界
import { NavigationContainer } from '@react-navigation/native';
import BottomTabStackNavigator from './src/components/BottomTabNavigator';
import GlobalLoader from './src/components/GlobalLoader';
import { ToastContainer } from './src/components/common/toast';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar style="auto" />
        <NavigationContainer screenOptions={{
          cardStyle: { backgroundColor: '#f0f0f0' },
        }}>
          <BottomTabStackNavigator/>
        </NavigationContainer>
        <GlobalLoader />
        <ToastContainer />
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
