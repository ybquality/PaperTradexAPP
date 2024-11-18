import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Alert, FlatList, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Slider } from '@rneui/themed';

import { Dropdown } from 'react-native-element-dropdown';

import request from '../../../utils/request';

const CopyTradeScreen = ({ route, navigation }) => {

    const testClick = async (item) =>{
        balanceInquiry(item.id);
        setValue(item.id)
        setSelectedOption(item);
        console.log('testClick');
        console.log(item);

        
    }

    const data = {}

    const traderId = route.params.traderId
    const principal = route.params.principal
    const copyRatio = route.params.copyRatio

    const [value, setValue] = useState(traderId);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState([]); // 存储选项数据
    const [selectOption, setSelectedOption] = useState({});
    const [balanceInfo, setBalanceInfo] = useState(null);

    const [followPrice, setFollowPrice] = useState(String(principal));
    const [singleTransslated, setSingleTransslated] = useState(String(copyRatio));

    const [sliderPosition, setSliderPosition] = useState(50);

    // 页面加载时请求API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 这里替换成你的API接口
                const response = await request.get('/api/exchange/getUserBindExchanges');

                console.log(response.data.data);

                // 假设API返回的数据结构如下
                setOptions(response.data.data);
            } catch (error) {
                setError(err.message || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const balanceInquiry = async (options) => {

        await request.get(`/api/exchange/get_total_balance?user_bind_exchange_id=${options}`)
            .then(response => {
                console.log(response.data);
                setBalanceInfo(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const changeCopyTrade = async (selectOption, single_translated, followPrice, traderId) =>{
        const postBody = {
            change_order_id_after: traderId,
            change_order_id_before: selectOption ? selectOption.id : null,
            single_translated: single_translated,
            followPrice: followPrice,
        }
        // console.log(selectOption, singleTransslated, followPrice);
        await request.post('/api/exchange/change_user_copy_order', postBody)
        .then(response => {
            const responseData = response.data;
            console.log(responseData);
            // if (responseData.code === 200) {
            //     // 显示提示信息
            //     Alert.alert('Success', responseData.msg);
            //     navigation.goBack();
            // } else {
            //     // 显示错误信息
            //     Alert.alert('Error', responseData.msg);
            // }

            if (responseData.code === 200) {
                Alert.alert('成功！', '跟单设置修改成功', [
                    { text: '确定', onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('失败', responseData.msg || '修改失败，请联系管理员');
            }
        })
        .catch(error => {
            console.error(error);
            Alert.alert('错误', '网络请求失败');
        });
    }


    const startCopyTrade = async (traderId, followPrice, singleTransslated, userExchangeId, tradeId) => {
        const postBody = {
            traderId: traderId,
            followPrice: followPrice,
            singleTransslated: singleTransslated,
            userExchangeId: userExchangeId,
            tradeId: tradeId
        }

        // 跳转到交易页面
        await request.post('/api/exchange/add_copy_trade', postBody)
            .then(response => {
                const responseData = response.data;
                console.log(responseData);
                if (responseData.code === 200) {
                    // 显示提示信息
                    Alert.alert('Success', responseData.msg);
                    navigation.goBack();
                } else {
                    // 显示错误信息
                    Alert.alert('Error', responseData.msg);
                }

            })
            .catch(error => {
                console.error(error);
            });

    }

    // 添加验证函数
    const isFormValid = () => {
        const singleValue = parseFloat(singleTransslated);
        const followValue = parseFloat(followPrice);
        
        return value && // 跟单账户已选择
               singleTransslated && // 单笔跟单不为空
               followPrice && // 最大跟单金额不为空
               !isNaN(singleValue) && // 确保是有效数字
               !isNaN(followValue) && 
               followValue > 0; // 跟单金额大于0
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }
    return (
        <View style={styles.container}>
            <ScrollView 
                style={styles.scrollContent} 
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentContainer}>
                    {/* 顶部部分: 头像和昵称 */}
                    <View style={styles.topSection}>
                        <Avatar
                            size="large"
                            rounded
                            source={{ uri: data?.userPic }}  // 显示获取到的头像URL
                            containerStyle={[styles.topAvatar, styles.topAvatarWithBorder]}
                        />
                        <Text style={styles.topNickname}>{data?.nickName || 'No Name'}</Text>
                    </View>

                    <View style={styles.middleSection}>

                        {/* Dropdown Input */}
                        <View style={styles.middleInputContainer}>
                            <View style={styles.middleRow}>
                                <Text style={styles.leftLabel}>跟单账户</Text>
                            </View>
                            <Dropdown
                                style={styles.dropdown}
                                data={options}
                                labelField="account_name"
                                valueField="id"
                                placeholder="请选择跟单账户"
                                value={value}
                                onChange={(item) => testClick(item)}
                            />
                        </View>

                        {/* Text Input with Label on the Right */}
                        <View style={styles.middleInputContainer}>
                            <View style={styles.middleRow}>
                                <Text style={styles.leftLabel}>单笔跟单</Text>
                                <Text style={styles.rightLabel}>按比例</Text>
                            </View>
                            <View style={styles.inputWithUnit}>
                                <TextInput 
                                    value={singleTransslated} 
                                    onChangeText={text => setSingleTransslated(text)} 
                                    style={[styles.middleInput, styles.inputWithRightUnit]} 
                                    placeholder="0.01 - 1000"
                                    keyboardType="numeric" // 添加数字键盘类型
                                    returnKeyType="done"
                                />
                                <Text style={styles.unitTextInside}>倍</Text>
                            </View>
                        </View>

                        {/* Text Input with Unit (USDT) */}
                        <View style={styles.middleInputContainer}>
                            <View style={styles.middleRow}>
                                <Text style={styles.leftLabel}>最大跟单金额</Text>
                                <Text style={styles.availableText}>
                                    可用 <Text style={styles.balanceAmount}>{balanceInfo?.total_balance || 0.00} USDT</Text>
                                </Text>
                            </View>
                            <View style={styles.inputWithUnit}>
                                <TextInput 
                                    value={followPrice} 
                                    onChangeText={text => setFollowPrice(text)} 
                                    style={[styles.middleInput, styles.inputWithRightUnit]} 
                                    placeholder="10 - 200000"
                                    keyboardType="numeric" // 添加数字键盘类型
                                    returnKeyType="done"
                                />
                                <Text style={styles.unitTextInside}>USDT</Text>
                            </View>
                        </View>
                        {/* 跟单金额滑块 */}
                        <View style={styles.sliderContainer}>
                            <Slider
                                value={sliderPosition}
                                onValueChange={(value) => {
                                    setSliderPosition(value);
                                    const amount = (balanceInfo?.total_balance || 0) * (value / 100);
                                    setFollowPrice(amount.toFixed(2));
                                }}
                                minimumValue={0}
                                maximumValue={100}
                                step={25}
                                trackStyle={{ height: 2 }}
                                thumbStyle={{ height: 12, width: 12, backgroundColor: '#000' }}
                                minimumTrackTintColor="#000"
                                maximumTrackTintColor="#E4E4E4"
                                thumbTouchSize={{ width: 40, height: 40 }}
                            />
                        </View>

                    </View>
                </View>
                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* 添加底部空白，确保滚动时内容不会被按钮遮挡 */}
            <View style={styles.bottomPadding} />

            {/* 底部按钮 */}
            <View style={styles.bottomSection}>
                <TouchableOpacity 
                    style={[styles.bottomButton, styles.bottomButtonLeft]} 
                    onPress={() => { navigation.goBack(); }}>
                    <Text style={styles.bottomButtonText}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        styles.bottomButton, 
                        styles.bottomButtonRight,
                        !isFormValid() && styles.bottomButtonDisabled
                    ]} 
                    disabled={!isFormValid()}
                    onPress={() => { 
                        const singleValue = parseFloat(singleTransslated);
                        const followValue = parseFloat(followPrice);
                        changeCopyTrade(selectOption, singleValue, followValue, traderId);
                    }}>
                    <Text style={[
                        styles.bottomButtonText,
                        !isFormValid() && styles.bottomButtonTextDisabled
                    ]}>确定</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// 样式定义
const styles = StyleSheet.create({
    //==========内容容器==========
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContent: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    bottomPadding: {
        height: 0, // 将高度从 100 减小到 20
    },
    //==========顶部部分==========
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    topAvatar: {
        marginRight: 10,
        width: 48,
        height: 48,
    },
    topAvatarWithBorder: {
        borderWidth: 2, // 边框宽度
        borderColor: '#f3f3f3', // 边框���色
        shadowColor: '#000', // 阴影颜色
        shadowOpacity: 0.4, // 阴影透明度
        shadowRadius: 3, // 阴影半径
        elevation: 3, // 阴影高度（Android）
    },
    topNickname: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    //==========顶部部分==========


    //==========中间部分==========
    middleSection: {
        flex: 1,
        paddingTop: 20,
    },
    middleInputContainer: {
        marginBottom: 20,
    },
    middleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    middleInput: {
        borderWidth: 1,
        borderColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 100,
        flex: 1,
        height: 50,
    },
    leftLabel: {
        fontSize: 14,
        fontWeight: '700',
    },
    rightLabel: {
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'right',
    },
    availableText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#00000066',
    },
    unitText: {
        fontSize: 16,
        padding: 10,
    },
    balanceAmount: {
        fontWeight: '500',
        color: '#000000',
    },

    modal: {
        justifyContent: 'flex-end', // 底部弹出
        margin: 0, // 保证覆盖整个屏幕
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute', // 将按钮固定在 modalContent 的底部
        bottom: 30,
        left: 0,
        right: 0,
        height: 42, // 按钮容器高度
    },
    modalContent: {
        height: 600,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalText: {
        fontSize: 18,
        marginVertical: 10,
    },
    modalButton: {
        padding: 10,                  // 内部间距
        borderRadius: 20,             // 设置圆角
        borderWidth: 1,               // 设置边框宽度
        borderColor: '#000',          // 设置边框颜色
    },
    modalBottomButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
    },
    modalLeftButton: {
        flex: 1,
        backgroundColor: '#E4E4E4',
    },
    modalRightButton: {
        flex: 2,
        backgroundColor: '#000',
    },
    modalLeftButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalRightButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    //==========中间部分==========


    //==========底部部分==========
    bottomSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingBottom: Platform.OS === 'ios' ? 34 : 16,
        backgroundColor: '#FFF',
        gap: 8,
    },
    bottomButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#000',
        borderWidth: 1,
    },
    bottomButtonLeft: {
        marginRight: 4, // 减小右边距
    },
    bottomButtonRight: {
        marginLeft: 4, // 减小左边距
    },
    bottomButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    //==========底部部分==========
    dropdown: {
        height: 50,
        padding: 12,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#000',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    optionIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    optionText: {
        fontSize: 16,
    },

    inputWithUnit: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputWithRightUnit: {
        paddingRight: 50, // 为单位文字预留空间
    },
    unitTextInside: {
        position: 'absolute',
        right: 16,
        fontSize: 14,
        color: '#000000',
    },

    bottomButtonDisabled: {
        backgroundColor: '#E4E4E4', // 禁用时的背景色
        borderColor: '#E4E4E4',
    },
    bottomButtonTextDisabled: {
        color: '#999999', // 禁用时的文字颜色
    },

    sliderContainer: {
        marginTop: 16,
        paddingHorizontal: 6,
        height: 40,
    },

});

export default CopyTradeScreen;