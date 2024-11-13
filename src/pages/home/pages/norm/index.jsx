// 指标页
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LiquidationStatsCard from '../../../../components/LiquidationStatsCard';
import PositionStatsCard from '../../../../components/PositionStatsCard';

const NormScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <LiquidationStatsCard></LiquidationStatsCard>
      <View style={{ paddingBottom: 20 }}></View>
      <PositionStatsCard></PositionStatsCard>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
});

export default NormScreen;