import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"; // 用于Icon
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 引入安全区域的 Hook

const BottomBar = ({ state, descriptors, navigation }) => {
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
            key={route.key}
            style={styles.tab}
            onPress={onPress}
          >
            {isFocused && <View style={styles.selectedBackground} />}
            <View style={styles.content}>
              <MaterialIcons
                name={options.tabBarIcon}
                size={24}
                color={isFocused ? 'black' : 'white'}
              />
              <Text style={isFocused ? styles.selectedText : styles.text}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 32,
    height: 64,
  },
  tab: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 0,
  },
  selectedBackground: {
    position: 'absolute',
    backgroundColor: '#80FFE9',
    width: 48,
    height: 48,
    borderRadius: 24,
    top: 0,
    left: '50%',
    transform: [
      { translateX: -24 },
      { translateY: 0 }
    ],
  },
  content: {
    alignItems: 'center',
    zIndex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
  selectedText: {
    color: 'black',
    fontSize: 12,
    marginTop: 2,
  },
});

export default BottomBar;