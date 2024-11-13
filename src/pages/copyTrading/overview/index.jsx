// 首页
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import ProfitCard from '../../../components/ProfitCard';
import ProfitLossPlaceholder from '../../../components/ProfitAndLossCard';
import ExpertCard from '../../../components/ExpertCard';

const OverviewScreen = ({ navigation }) => {
  const [selectedBar, setSelectedBar] = useState(null);

  const handleClearSelection = () => {
    if (selectedBar !== null) {
      setSelectedBar(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleClearSelection}>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screen}>
          <ProfitCard />
          <ProfitLossPlaceholder 
            selectedBar={selectedBar}
            setSelectedBar={setSelectedBar}
          />
          <ExpertCard />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});

export default OverviewScreen;