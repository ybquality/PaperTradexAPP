// 首页
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeaderboardScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>Leaderboard Screen</Text>
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

export default LeaderboardScreen;