// 首页
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import HistoryCard from '../../../components/HistoryCard';

const MyHistoryScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>MyHistory Screen</Text>
      <HistoryCard></HistoryCard>
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

export default MyHistoryScreen;