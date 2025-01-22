// 提醒页
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RemindScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>Remind Screen11111</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default RemindScreen;