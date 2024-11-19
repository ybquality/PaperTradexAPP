import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
        <Ionicons name="search" size={16} color="rgba(0, 0, 0, 0.4)" style={styles.icon} />
        <TextInput
        style={styles.searchInput}
        placeholder="搜索交易员昵称"
        placeholderTextColor="#999"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 100, // 设置圆角
    borderWidth: 1, // 设置边框宽度
    borderColor: 'rgba(0, 0, 0, 1)', // 设置边框颜色
    // marginHorizontal: 15,
    // marginVertical: 1,
  },
  icon: {
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.4)',
  },
});

export default SearchBar;