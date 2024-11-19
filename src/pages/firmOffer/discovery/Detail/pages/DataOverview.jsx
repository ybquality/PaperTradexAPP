import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

import DataModelTopTabNavigator from './DataModelTopTabNavigator';
import request from '../../../../../utils/request';

// 卡片组件
const InfoCard = ({ label, date, description }) => {
    // 判断标签类型设置背景颜色
    const getBgColor = (label) => {
      if (label === '买入' || label === '买入开多') {
        return 'rgba(128, 255, 233, 1)';
      } else if (label === '卖出' || label === '卖出平多') {
        return 'rgba(255, 153, 159, 1)';
      }
      return '#A8EBE4'; // 默认颜色
    };

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[
            styles.labelContainer, 
            { backgroundColor: getBgColor(label) }
          ]}>
            <Text style={styles.labelText}>{label}</Text>
          </View>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    );
};

const AccountScreen = ({ route, navigation }) => {

    const [items, setItems] = useState([]);

    const data = route.params.data || {}
    const id = route.params.id || {}
    console.log(data.balance);
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.get('/test/api/getUserLeaderListBySecret?traderId=' + String(id));
                const response_data = response.data;
                const showStatus = response_data.showStatus !== undefined ? response_data.showStatus : true;
                console.log('showStatus: ', showStatus);

                if (showStatus) {
                    // console.log('items1: ', response_data.firmOfferHisList);
                    setItems(response_data.firmOfferHisList);
                }

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // 设置导航栏样式
        navigation.setOptions({
            tabBarStyle: {
                paddingLeft: 0, // 移除左边距
            }
        });
    }, [navigation]);

    // 渲染每个卡片
    const renderItem = ({ item }) => (
        <InfoCard
        label={item.labelSub}           // 从API数据中取出 `label`
        date={item.informTime}             // 从API数据中取出 `date`
        description={item.content} // 从API数据中取出 `description`
        />
    );

    return (
        <ScrollView style={styles.scrollContainer}
            showsVerticalScrollIndicator={false} // 隐藏垂直滚动条
        >
        <View style={styles.container}>
            {/* 账户资产和总收益率 */}
            <View style={styles.header}>
                <View style={styles.column}>
                    <Text style={styles.titleText}>账户资产</Text>
                    <Text style={styles.valueText}>${data.balance}</Text>
                </View>
                <View style={styles.columnRight}>
                    <Text style={styles.titleText}>总收益率</Text>
                    <Text style={[styles.valueText, { color: '#00D0AC' }]}>{data.allIncome}%</Text>
                </View>
            </View>

            {/* 收益详情 */}
            <View style={styles.details}>
                <View style={styles.detailsRow}>
                    <View style={styles.detailItemLeft}>
                        <Text style={styles.detailLabel}>总收益</Text>
                        <Text style={styles.detailValue}>${data.profit}</Text>
                    </View>
                    <View style={styles.detailItemCenter}>
                        <Text style={styles.detailLabel}>初始资产</Text>
                        <Text style={styles.detailValue}>${data.initBalance}</Text>
                    </View>
                    <View style={styles.detailItemRight}>
                        <Text style={styles.detailLabel}>月收益率</Text>
                        <Text style={styles.detailValue}>{data.monthIncome}%</Text>
                    </View>
                </View>
                <View style={styles.detailsRow}>
                    <View style={styles.detailItemLeft}>
                        <Text style={styles.detailLabel}>历史胜率</Text>
                        <Text style={styles.detailValue}>{data.winningRate}%</Text>
                    </View>
                    <View style={styles.detailItemCenter}>
                        <Text style={styles.detailLabel}>最大回撤</Text>
                        <Text style={styles.detailValue}>{data.MaxiRetreatRate}%</Text>
                    </View>
                    <View style={styles.detailItemRight}></View>
                </View>
            </View>

            <DataModelTopTabNavigator style={{ borderWidth: 2, borderColor: '#fff' }} data={id} />

            {/* 最新操作 */}
            <Text style={styles.latestOperationText}>最新操作</Text>

            {/* 操作记录 */}
            {/* 未完成 使用 Bcoin中的 getUserLeaderListBySecret 获取操作记录  */}

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
                nestedScrollEnabled={true} // 允许嵌套滚动
            />

        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
      },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    column: {
        alignItems: 'flex-start',
        flex: 1,
    },
    columnRight: {
        alignItems: 'flex-end',
        flex: 1,
    },
    titleText: {
        fontSize: 12,
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.4)',
        marginBottom: 4,
    },
    valueText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'rgba(0, 0, 0, 1)',
    },
    details: {
        marginBottom: 24,
    },
    detailsRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    detailItemLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    detailItemCenter: {
        flex: 1,
        alignItems: 'center',
    },
    detailItemRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    detailLabel: {
        fontSize: 12,
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.4)',
        marginBottom: 4,
        textAlign: 'center',
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
    chart: {
        height: 200,
        marginBottom: 20,
    },
    latestOperationText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'rgba(0, 0, 0, 1)',
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(243, 243, 243, 1)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    labelContainer: {
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    labelText: {
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 12,
        fontWeight: '500',
    },
    dateText: {
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: 12,
        fontWeight: '400',
    },
    descriptionText: {
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: 12,
        fontWeight: '400',
        marginTop: 8,
    },
});

export default AccountScreen;
