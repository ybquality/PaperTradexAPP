import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
        <Ionicons name="search" size={24} color="#000" style={styles.icon} />
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 30, // 设置圆角
    borderWidth: 1, // 设置边框宽度
    borderColor: '#000', // 设置边框颜色
    // marginHorizontal: 15,
    // marginVertical: 1,
  },
  icon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});

export default SearchBar;