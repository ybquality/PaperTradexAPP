// 首页
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import request from '../../../../../utils/request';

const PositionInformationScreen = ({ navigation }) => {

  const fetchData = async () => {

    await request('/api/v1/user/info', 'GET');
    
  };
  
  return (
    <View style={styles.screen}>
      <Text>PositionInformation Screen</Text>
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

export default PositionInformationScreen;