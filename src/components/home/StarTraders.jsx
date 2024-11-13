// 明星交易员滑块组件
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Avatar } from '@rneui/themed';
import { LineChart } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { curveBasis } from 'd3-shape';
import { useNavigation } from '@react-navigation/native';

const StarTraderCard = ({ item }) => {
  const navigation = useNavigation();

  // 空值检查
  if (!item || !item.chartData || !item.avatarUrl || !item.nickname) {
    return null;
  }

  const incomeData = item.chartData.map(item => item.income);

  const Gradient = ({ index }) => (
    <Defs key={index}>
      <LinearGradient id={'gradient'} x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#00D0AC" stopOpacity={0.4} />
        <Stop offset="0.5" stopColor="#00D0AC" stopOpacity={0.1} />
        <Stop offset="1" stopColor="#00D0AC" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  );

  const Decorator = ({ line }) => {
    const lastPoint = line.split(/[MLHVCSQTAZ]/g).filter(Boolean).pop().trim().split(',');
    const lastX = parseFloat(lastPoint[0]);
    const lastY = parseFloat(lastPoint[1]);
    const firstPoint = line.split(/[MLHVCSQTAZ]/g).filter(Boolean)[0].trim().split(',');
    const firstX = parseFloat(firstPoint[0]);
    
    return (
      <>
        <Path
          key={'background-path'}
          d={`${line} L ${lastX} ${100} L ${firstX} ${100} Z`}
          fill="url(#gradient)"
          opacity={0.8}
        />
        <Path
          key={'line-path'}
          d={line}
          stroke={colors.primary}
          strokeWidth={2}
          fill="none"
        />
      </>
    );
  };

  return (
    <TouchableOpacity 
      style={styles.traderCard}
      onPress={() => {
        navigation.navigate('DetailStack', {
          screen: 'Details',
          params: { id: item.id }
        });
        // 这里跳转到交易员详情页面
        // DetailStack: 交易员详情页面的堆栈导航器
        // Details: 具体的详情页面
        // params: 传递交易员ID作为参数
      }}
    >
      <View style={styles.traderInfo}>
        <Avatar
          size={24}
          rounded
          source={{ uri: item.avatarUrl }}
          containerStyle={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.traderName}>{item.nickname}</Text>
          <Text style={styles.followers}>{item.followers}</Text>
        </View>
      </View>
      <View style={styles.chartRow}>
        <View style={styles.profitContainer}>
          <Text style={styles.profitLabel}>收益率</Text>
          <Text style={styles.traderProfit}>+{item.yieldValue}%</Text>
        </View>
        <View style={styles.chartContainer}>
          <LineChart
            style={styles.chart}
            data={incomeData}
            contentInset={{ top: 5, bottom: 5, left: 0, right: 0 }}
            curve={curveBasis}
            svg={{ 
              stroke: colors.primary,
              strokeWidth: 1.5
            }}
          >
            <Gradient />
            <Decorator />
          </LineChart>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const StarTraders = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.traderSection}>
        <Text style={styles.sectionTitle}>明星交易员</Text>
        <TouchableOpacity 
          style={styles.rankingButton}
          onPress={() => navigation.navigate('TraderRanking')}
          // 这里跳转到交易员排行榜页面
          // TraderRanking: 交易员排行榜页面
        >
          <Text style={styles.rankingButtonText}>交易员排行榜 ></Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {data?.map((item) => (
          <StarTraderCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const colors = {
  primary: '#00D0AC',
  gray: '#808080',
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  traderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rankingButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  rankingButtonText: {
    color: '#666',
    fontSize: 12,
  },
  scrollView: {
    
  },
  traderCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: 220,
    height: 120,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  traderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.4)',
  },
  nameContainer: {
    flex: 1,
  },
  traderName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  followers: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  profitContainer: {
    justifyContent: 'flex-end',
  },
  profitLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  traderProfit: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
    marginRight: 10,
    // marginBottom: 5,
  },
  chartContainer: {
    flex: 1,
    height: 45,
  },
  chart: {
    flex: 1,
    backgroundColor: 'transparent',
  }
});

export default StarTraders;