// 首页
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import ProfitCard from '../../../components/ProfitCard';
import ProfitLossPlaceholder from '../../../components/ProfitAndLossCard';
import ExpertCard from '../../../components/ExpertCard';

import request from '../../../utils/request';

const OverviewScreen = ({ navigation }) => {
  const [selectedBar, setSelectedBar] = useState(null);
  const [profitCardData, setProfitCardData] = useState({})

  const handleClearSelection = () => {
    if (selectedBar !== null) {
      setSelectedBar(null);
    }
  };

  const fetchData = async () => {
    try{
      const response = await request('/api/user/getUserIncome');

      if (response.data.code === 200) {
        setProfitCardData(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);


  return (
    <TouchableWithoutFeedback onPress={handleClearSelection}>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screen}>
          <ProfitCard tatalProfit={profitCardData.totalProfit} todayProfit={profitCardData.todayProfit} totalTradeCount={profitCardData.totalTradeCount} totalWinRate={profitCardData.winRate} />
          <ProfitLossPlaceholder 
            selectedBar={selectedBar}
            setSelectedBar={setSelectedBar}
          />
          <ExpertCard navigation={navigation} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 80,
  },
});

export default OverviewScreen;