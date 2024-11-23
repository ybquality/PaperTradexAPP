import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { Icon } from '@rneui/themed';
import NavBar from '../../components/common/navbar';
import { color } from '@rneui/base';

// 定义列表数据
const communityLinks = [
  {
    id: 1,
    title: 'Telegram中文群',
    icon: 'telegram',
    type: 'font-awesome-5',
    color: '#0088cc',
    url: 'https://t.me/PaperTradex'
  },
//   {
//     id: 2,
//     title: 'Discord社区',
//     icon: 'discord',
//     type: 'font-awesome-5',
//     color: '#5865F2',
//     url: 'https://discord.gg/your_discord'
//   },
//   {
//     id: 3,
//     title: 'Twitter',
//     icon: 'twitter',
//     type: 'font-awesome-5',
//     color: '#1DA1F2',
//     url: 'https://twitter.com/PaperTradexCrypto'
//   }
];

export default function CommunityScreen({ navigation }) {
  // 处理链接点击
  const handlePress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        alert(`无法打开链接: ${url}`);
      }
    } catch (error) {
      alert('打开链接时发生错误');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <NavBar onBack={() => navigation.goBack()}>
          PaperTradex社群
        </NavBar>

        <View style={styles.content}>
          {communityLinks.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listItem}
              onPress={() => handlePress(item.url)}
            >
              <View style={styles.leftContent}>
                <Icon
                  name={item.icon}
                  type={item.type}
                  size={20}
                  color={item.color}
                  style={styles.leftIcon}
                />
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <Icon
                name="chevron-right"
                type="feather"
                size={20}
                color="rgba(0, 0, 0, 0.3)"
              />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.9)',
  },
});
