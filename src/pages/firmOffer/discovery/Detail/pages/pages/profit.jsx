import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import { curveBasis } from 'd3-shape';
import axios from 'axios';
import { BASE_URL } from '../../../../../../utils/pathMap';

const ProfitScreen = ({ route }) => {
  const id = route.params.id;
  const [incomeData, setIncomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Missing ID');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/test/api/getKolModelData`, {
          params: {
            type: 3,
            traderId: id,
          },
        });

        const data = response.data.map(item => item.income);
        setIncomeData(data);
      } catch (err) {
        console.error('Error fetching data:', err.message || err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !incomeData) return null;

  const minValue = Math.min(...incomeData);
  const maxValue = Math.max(...incomeData);
  const absMax = Math.max(Math.abs(minValue), Math.abs(maxValue));

  return (
    <View style={styles.screen}>
      <View style={styles.chartContainer}>
        <LineChart
          style={styles.chart}
          data={incomeData}
          contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
          curve={curveBasis}
          svg={{ 
            stroke: '#00D0AC',
            strokeWidth: 2
          }}
          yMin={-absMax}
          yMax={absMax}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFF',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 122,
      },
      chartContainer: {
        height: '100%',
      },
      chart: {
        flex: 1,
        backgroundColor: 'transparent',
      },
});

export default ProfitScreen;
