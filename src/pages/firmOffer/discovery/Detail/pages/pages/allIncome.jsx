// 首页
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { LineChart } from 'react-native-svg-charts';
import { curveNatural } from 'd3-shape';
import axios from 'axios';

import config from '../../../../../../../config';
import { BASE_URL } from '../../../../../../utils/pathMap';
import request from '../../../../../../utils/request';

const AllIncomeScreen = ({ route, navigation }) => {
  const id = route.params.id;

  const [incomeData, setIncomeData] = useState(null);  // 保存 API 请求返回的数据
  const [loading, setLoading] = useState(true);  // 加载状态
  const [error, setError] = useState(null);  // 错误信息

  useEffect(() => {
      // 检查 id 是否有效
      if (!id) {
          setError('Missing ID');
          setLoading(false);
          return;
      }

      // 定义一个异步函数来请求数据
      const fetchData = async () => {
          try {
              setLoading(true);  // 开始加载
              // console.log('Fetching data for ID:', id);

              // 发起网络请求
              const response = await request.get('/test/api/getKolModelData', {
                  params: {
                      type: 2,
                      traderId: id  // 使用传递过来的 id 作为请求参数
                  }
              });
              const data = response.data.map(item => item.income);
              // console.log('Data fetched:', response.data);
            //   console.log(data);
              
              setIncomeData(data);  // 保存返回的数据
          } catch (err) {
              console.error('Error fetching data:', err.message || err);
              setError('Failed to fetch data');  // 保存错误信息
          } finally {
              setLoading(false);  // 请求完成后停止加载
          }
      };

      // 调用数据请求函数
      fetchData();
      }, [id]);  // 当 id 改变时重新执行 useEffect

      // 如果正在加载，显示加载状态
      if (loading) {
          return (
              <View style={styles.container}>
                  <Text>Loading...</Text>
              </View>
          );
      }

      // 如果有错误，显示错误信息
      if (error) {
          return (
              <View style={styles.container}>
                  <Text style={styles.errorText}>{error}</Text>
              </View>
          );
      }

  return (
    <View style={styles.screen}>
            <View style={styles.chartContainer}>
                <LineChart
                    style={{ flex: 1 }}
                    data={incomeData}
                    svg={{
                    stroke: '#00D0AC', // 设置线条颜色为透明
                    }}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={curveNatural}
                />

            {/* 这里可以放置你的曲线图组件，使用chartData */}
            </View>
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
  chartContainer: {
    height: 200,
    width: '100%',
    marginTop: 10,
    // borderWidth: 1,
  },
});

export default AllIncomeScreen;