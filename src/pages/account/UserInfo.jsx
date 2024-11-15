// 首页
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserInfoScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>UserInfo Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
});

export default UserInfoScreen;