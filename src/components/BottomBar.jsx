import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"; // 用于Icon
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 引入安全区域的 Hook

const BottomBar = ({ state, descriptors, navigation }) => {

  return (
    <View style={[styles.container, ]}>
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
            key={route.key}
            style={[
              styles.tab,
              isFocused ? styles.selectedTab : null,
            ]}
            onPress={onPress}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={options.tabBarIcon}
                size={24}
                color={isFocused ? 'black' : 'white'}
              />
            </View>
            <Text style={isFocused ? styles.selectedText : styles.text}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10, // 增加底部的间距，让组件悬浮
    left: 20,   // 增加左侧留白
    right: 20,  // 增加右侧留白
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,  // 增加垂直内边距，让按钮更大一些
    borderRadius: 50,
  },
  tab: {
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  selectedTab: {
    backgroundColor: '#80FFE9',
  },
  iconContainer: {
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
  selectedText: {
    color: 'black',
    fontSize: 12,
  },
});

export default BottomBar;