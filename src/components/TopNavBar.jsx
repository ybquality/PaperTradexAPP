import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomTopNavBar = ({ state, descriptors, navigation, customStyles = {} }) => {
  const combinedStyles = {
    container: [styles.container, customStyles.container],
    tabItem: [styles.tabItem, customStyles.tabItem],
    tabText: [styles.tabText, customStyles.tabText],
    activeTabText: [styles.activeTabText, customStyles.activeTabText],
    activeTabUnderline: [styles.activeTabUnderline, customStyles.activeTabUnderline],
  };

  return (
    <View style={combinedStyles.container}>
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
            style={combinedStyles.tabItem}
            onPress={onPress}
          >
            <Text 
              style={[
                combinedStyles.tabText,
                isFocused && combinedStyles.activeTabText
              ]}
            >
              {label}
            </Text>
            {isFocused && <View style={combinedStyles.activeTabUnderline} />}
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
    paddingLeft: 16, // 左边距控制导航栏与屏幕的距离
  },
  tabItem: {
    alignItems: 'center', // 水平居中
    marginRight: 25, // 控制每个标签的间距
    marginTop: 11,
  },
  tabText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.4)', // 默认灰色文字
    fontWeight: '500',
    paddingBottom: 5,
    lineHeight: 20,
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)', // 激活状态下文字为黑色
  },
  activeTabUnderline: {
    height: 4,
    width: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 1)', // 激活状态下的下划线
  },
});

export default CustomTopNavBar;