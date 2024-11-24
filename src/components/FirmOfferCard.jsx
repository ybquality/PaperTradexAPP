import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Avatar } from '@rneui/themed';

import { LineChart } from 'react-native-svg-charts';
import { curveNatural, curveBasis } from 'd3-shape';
import { useNavigation } from '@react-navigation/native'; // 导入 useNavigation 钩子
import { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
// import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

// const data = [
//     { quarter: 1, earnings: 13000 },
//     { quarter: 2, earnings: 16500 },
//     { quarter: 3, earnings: 14250 },
//     { quarter: 4, earnings: 19000 }
//   ];
const FirmOfferCard = ({ item }) =>{
    // console.log('FirmOfferCard:', item);
    
    const navigation = useNavigation(); // 获取 navigation 对象

    // 空值检查
    if (!item || !item.chartData || !item.avatarUrl || !item.nickname) {
        return null; // 或者返回默认内容
    }

    const incomeData = item.chartData.map(item => item.income);
    // const incomeData = [1, 2, 3, 4, 5];

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
        // 获取折线的最后一个点的坐标
        const lastPoint = line.split(/[MLHVCSQTAZ]/g).filter(Boolean).pop().trim().split(',');
        const lastX = parseFloat(lastPoint[0]);
        const lastY = parseFloat(lastPoint[1]);
        
        // 获取第一个点的坐标
        const firstPoint = line.split(/[MLHVCSQTAZ]/g).filter(Boolean)[0].trim().split(',');
        const firstX = parseFloat(firstPoint[0]);
        
        return (
            <>
                {/* 先渲染阴影填充区域 */}
                <Path
                    key={'background-path'}
                    d={`${line} L ${lastX} ${100} L ${firstX} ${100} Z`}
                    fill="url(#gradient)"
                    opacity={0.8}
                />
                {/* 后渲染折线，确保折线在最上层 */}
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
        <Card containerStyle={styles.container}>
            <View style={styles.header}>
                <Avatar
                    size={32}
                    rounded
                    source={{ uri: item.avatarUrl }}
                    containerStyle={styles.avatar}
                />
                <Text style={styles.nickname}>{item.nickname}</Text>
                <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={() => {
                        navigation.navigate('DetailStack', {
                            screen: 'Details', 
                            params: { id: item.id }
                        }); 
                    }}
                >
                    <Text style={styles.detailsButtonText}>详情</Text>
                </TouchableOpacity>

            </View>

            {/* 收益率和图表容器 */}
            <View style={styles.dataRow}>
                {/* 收益率 */}
                <View style={styles.yieldContainer}>
                    <Text style={styles.yieldLabel}>收益率</Text>
                    <Text style={styles.yieldValue}>{item.yieldValue}%</Text>
                </View>
                {/* 图表 */}
                <View style={styles.chartContainer}>
                    <LineChart
                        style={styles.chart}
                        data={incomeData}
                        contentInset={{ top: 10, bottom: 10, left: 0, right: 0 }}
                        curve={curveBasis}
                        svg={{ 
                            stroke: colors.primary,
                            strokeWidth: 2
                        }}
                    >
                        <Gradient />
                        <Decorator />
                    </LineChart>
                </View>
            </View>

            {/* 分割线 */}
            <Card.Divider 
                color="rgba(0, 0, 0, 0.04)"  // 更新分割线颜色
                style={styles.divider}  // 添加样式以确保颜色正确应用
            />

            {/* 总资产、最大回撤、收益额 */}
            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Text style={styles.footerText}>总资产</Text>
                    <Text style={styles.footerValue}>{item.totalAssets}</Text>
                </View>
                <View style={styles.footerItemCenter}>
                    <Text style={styles.footerText}>最大回撤</Text>
                    <Text style={styles.footerValue}>{item.maxDrawdown}%</Text>
                </View>
                <View style={styles.footerItemRight}>
                    <Text style={styles.footerText}>收益额</Text>
                    <Text style={[styles.footerValue, { color: colors.primary }]}>{item.profit}</Text>
                </View>
            </View>
            
        </Card>

    )
}

const colors = {
    primary: '#00D0AC',
    gray: '#808080',
};

const styles = StyleSheet.create({
    dataRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    yieldContainer: {
        flex: 1,
    },
    yieldLabel: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.4)',
        marginBottom: 4,
        fontWeight: '400',
    },
    yieldValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
    },
    chartContainer: {
        flex: 2,
        height: 60,
        overflow: 'hidden', // 确保渐变不会溢出容器
    },
    chart: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        // marginHorizontal: 0,
        // marginVertical: 10,
        margin: 0,
        marginBottom: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(243, 243, 243, 1)',
        shadowColor: 'transparent',
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsButton: {
        minWidth: 48,
        height: 24,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 32,
        backgroundColor: '#000000',
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16, // 确保完全圆形
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.4)', // #00000066 转换为 rgba
        marginRight: 8,
    },
    nickname: {
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 16.6,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 10,
        paddingHorizontal: 4,
    },
    footerItem: {
        width: '33.33%',
        alignItems: 'flex-start',
    },
    footerItemCenter: {
        width: '33.33%',
        alignItems: 'center',
    },
    footerItemRight: {
        width: '33.33%',
        alignItems: 'flex-end',
    },
    footerText: {
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: 12,
        marginBottom: 4,
        fontWeight: '400',
    },
    footerValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    divider: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',  // 确保分割线颜色正确
        height: 1,
    },
})

export default FirmOfferCard;