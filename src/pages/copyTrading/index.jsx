import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CopyTradingScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>Copy Trading Screen</Text>
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

export default CopyTradingScreen;