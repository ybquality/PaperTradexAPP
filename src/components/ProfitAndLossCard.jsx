import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const BAR_WIDTH = 10;// 柱状的宽度
const BAR_GAP = 5; // 柱状之间的间距

const DailyProfitLossChart = ({ dailyData, selectedBar, setSelectedBar }) => {
  // 找出数据中的最大绝对值，用于计算比例
  const maxValue = Math.max(...dailyData.map(item => Math.abs(item.profit)));
  
  return (
    <TouchableWithoutFeedback onPress={() => setSelectedBar(null)}>
      <View style={styles.container}>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#22B573' }]} />
            <Text style={styles.legendText}>盈利</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF5C5C' }]} />
            <Text style={styles.legendText}>亏损</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.yAxis}>
            <Text style={styles.scaleText}>22.4K</Text>
            <Text style={styles.scaleText}>12.4K</Text>
            <Text style={styles.scaleText}>0</Text>
            <Text style={styles.scaleText}>-12.4K</Text>
            <Text style={styles.scaleText}>-22.4K</Text>
          </View>

          <View style={styles.chartContent}>
            {/* 零轴 */}
            <View style={styles.zeroLine} />
            
            {/* 柱状图 */}
            <View style={styles.barsContainer}>
              {dailyData.map((item, index) => {
                const barHeight = (Math.abs(item.profit) / maxValue) * 100;
                const isProfit = item.profit >= 0;
                
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={(e) => {
                      e.stopPropagation();
                      setSelectedBar(selectedBar === index ? null : index);
                    }}
                    style={styles.barWrapper}
                  >
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${barHeight}%`,
                          backgroundColor: isProfit ? '#22B573' : '#FF5C5C',
                          // 如果是盈利，从中间往上长；如果是亏损，从中间往下长
                          position: 'absolute',
                          bottom: isProfit ? '50%' : 'auto',
                          top: isProfit ? 'auto' : '50%',
                        },
                      ]}
                    />
                    
                    {selectedBar === index && (
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={(e) => e.stopPropagation()}
                        style={[
                          styles.tooltip,
                          {
                            bottom: isProfit ? '52%' : 'auto',
                            top: isProfit ? 'auto' : '52%',
                          }
                        ]}
                      >
                        <Text style={styles.tooltipText}>{item.date}</Text>
                        <Text style={[
                          styles.tooltipText,
                          {color: isProfit ? '#22B573' : '#FF5C5C'}
                        ]}>
                          {isProfit ? '+' : ''}{item.profit}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  legendContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  chartContainer: {
    height: 240,
    flexDirection: 'row',
    paddingVertical: 20,
    overflow: 'hidden',
  },
  yAxis: {
    width: 50,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  scaleText: {
    fontSize: 12,
    color: '#999',
  },
  chartContent: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  zeroLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#E5E5E5',
    top: '50%',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 10,
  },
  barWrapper: {
    width: BAR_WIDTH,
    marginHorizontal: BAR_GAP / 2,
    height: '100%',
    position: 'relative',
  },
  bar: {
    width: BAR_WIDTH,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    left: '50%',
    transform: [{ translateX: -50 }],
    zIndex: 1000,
    minWidth: 80,
  },
  tooltipText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

// 模拟数据：
const demoData = [
  { date: '2024-01-01', profit: 22400 },
  { date: '2024-01-02', profit: -8000 },
  { date: '2024-01-03', profit: 5000 },
  { date: '2024-01-04', profit: -15000 },
  { date: '2024-01-05', profit: 18000 },
  { date: '2024-01-06', profit: -12000 },
  { date: '2024-01-07', profit: 20000 },
  { date: '2024-01-08', profit: -10000 },
];

export default function ProfitLossCard({ selectedBar, setSelectedBar }) {
  return (
    <View style={styles.card}>
      <DailyProfitLossChart 
        dailyData={demoData} 
        selectedBar={selectedBar}
        setSelectedBar={setSelectedBar}
      />
    </View>
  );
}
