import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomTopNavBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={onPress}
          >
            <Text style={[styles.tabText, isFocused && styles.activeTabText]}>
              {label}
            </Text>
            {isFocused && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#fff', // 背景色为白色
    paddingVertical: 20, // 垂直内边距
    paddingLeft: 25, // 左边距控制导航栏与屏幕的距离
    borderBottomColor: '#e0e0e0', // 底部边框颜色
  },
  tabItem: {
    alignItems: 'center', // 水平居中
    marginRight: 25, // 控制每个标签的间距
  },
  tabText: {
    fontSize: 16,
    color: '#999', // 默认灰色文字
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  activeTabText: {
    color: '#000', // 激活状态下文字为黑色
  },
  activeTabUnderline: {
    marginTop: 5,
    height: 3,
    width: 25,
    backgroundColor: '#000', // 激活状态下的下划线
  },
});

export default CustomTopNavBar;