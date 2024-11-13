import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FirmOfferScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>Firm Offer Screen</Text>
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

export default FirmOfferScreen;