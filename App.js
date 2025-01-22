import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Alert, Platform, Linking } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"; // 安全边界
import { NavigationContainer } from '@react-navigation/native';
import BottomTabStackNavigator from './src/components/BottomTabNavigator';
import GlobalLoader from './src/components/GlobalLoader';
import { ToastContainer } from './src/components/common/toast';
import React, { useEffect, useState } from 'react';
import * as Updates from 'expo-updates';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as SplashScreen from 'expo-splash-screen';

import request from './src/utils/request';


// 防止自动隐藏 SplashScreen
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const checkForHotUpdates = async () => {
      try {
        // 检查是否有可用的更新
        const update = await Updates.checkForUpdateAsync();

        // 如果有更新
        if (update.isAvailable) {
          // 拉取更新
          await Updates.fetchUpdateAsync();
          // 重新加载应用以应用更新
          await Updates.reloadAsync();
          return true;
        }
      } catch (e) {
        console.error("检查更新失败", e);
      } finally {
        setIsReady(true);  // 更新检查完成，应用可以加载
        SplashScreen.hideAsync(); // 资源加载完后隐藏闪屏
      }
    };

    const checkForGenrealUpdates = async () => {
      try {
        
        // const currentVersion = Updates.manifest.version;
        const currentVersion = Constants.expoConfig?.version;
        const osType = Platform.OS;
        const deviceName = Device.modelName;
        // console.log("lastVersion", lastVersion);
        console.log("currentVersion", currentVersion);
        console.log("osType", osType);
        console.log("deviceName", deviceName);
        
        const response = await request.post('/api/app_version/getLastVersion', {
          currentAppVersion: currentVersion,
          deviceModel: deviceName,
          deviceSystemType: osType
        });

        console.log(response.data);

        if (response.data.code === 200) {
          const updateRequired = response.data.data.updateRequired;
          const lastVersion = response.data.data.newVersion;
          const lastVersionCurrent = response.data.data.newVersionDescription;
          const lastVersionUrl = response.data.data.storeAddress;
          console.log("是否更新：", updateRequired);
          console.log('最新版本号：', lastVersion)
          console.log('更新内容：', lastVersionCurrent);
          console.log('下载地址：', lastVersionUrl);
          // 如果需要更新，展示弹窗
          if (updateRequired) {
            setIsReady(true);  // 更新检查完成，应用可以加载
            SplashScreen.hideAsync(); // 资源加载完后隐藏闪屏
            Alert.alert(
              '新版本可用',
              `当前版本: ${currentVersion}\n最新版本: ${lastVersion}\n\n${lastVersionCurrent}`,
              [
                {
                  text: '稍后再说',
                  onPress: () => console.log('用户选择稍后再说'),
                  style: 'cancel'
                },
                {
                  text: '去更新',
                  onPress: () => {
                    // 跳转到商店
                    if (Platform.OS === 'ios') {
                      Linking.openURL(lastVersionUrl);  // iOS 商店链接
                    } else if (Platform.OS === 'android') {
                      Linking.openURL(lastVersionUrl);  // Android 商店链接
                    }
                  }
                }
              ]
            );
            return true;
          }
        }
        return  false;
      } catch (e) {
        console.error("检查更新失败", e);
      }
    };

    const checkForUpdates = async () => {
      try {
        // 检查热更新
        // await checkForHotUpdates();
        // 检查常规更新
        await checkForHotUpdates();
        await checkForGenrealUpdates();

      } catch (e) {
        console.error("检查更新失败", e);
      }
    };

    // 页面加载时自动检查更新
    checkForUpdates();
  }, []);

  // 如果应用还在检查更新中，显示加载画面
  if (!isReady) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer screenOptions={{
        cardStyle: { backgroundColor: '#f0f0f0' },
      }}>
        <View style={{ flex: 1 }}>
          <SafeAreaView style={{flex: 1}}>
            <StatusBar style="auto" />
            <BottomTabStackNavigator/>
            <GlobalLoader />
          </SafeAreaView>
          <ToastContainer />
        </View>
      </NavigationContainer>
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
