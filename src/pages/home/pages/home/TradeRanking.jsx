// 首页
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TradeRankingScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>TradeRanking Screen</Text>
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

export default TradeRankingScreen;