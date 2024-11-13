import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import Modal from 'react-native-modal';

import axios from 'axios';

import DiscoveryDetailTobTabNavigator from './discoveryDetailTopTabNavigator';

import config from '../../../../../config';

import AsyncStorage from '@react-native-async-storage/async-storage';

import request from '../../../../utils/request';


const CopyTradeScreen = ({ route, navigation }) => {
    const data = {}
    const traderId = route.params.traderId

    console.log('CopyTrade-traderId: ', traderId);

    const [isModalVisible, setModalVisible] = useState(false);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState([]); // 存储选项数据
    const [selectedOption, setSelectedOption] = useState(null); // 存储选中的选项
    const [balanceInfo, setBalanceInfo] = useState(null);

    const [followPrice, setFollowPrice] = useState('');
    const [singleTransslated, setSingleTransslated] = useState('');

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

    
    const startCopyTrade = async (traderId, followPrice, singleTransslated, userExchangeId, tradeId) => {
        const postBody={
            traderId: traderId,
            followPrice: followPrice,
            singleTransslated: singleTransslated,
            userExchangeId: userExchangeId,
            tradeId: tradeId
        }
        
        // 跳转到交易页面
        await request.post('/api/exchange/add_copy_trade' , postBody)
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
    

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
      }
    
    if (error) {
    return <Text style={styles.error}>{error}</Text>;
    }
    return (
        <View style={styles.container}>
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
                    <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
                            <Text>
                                {selectedOption ? selectedOption.exchange_name : '请选择一个选项'}
                            </Text>
                    </TouchableOpacity>

                    <Modal
                        isVisible={isModalVisible}
                        onBackdropPress={toggleModal}
                        style={styles.modal}>
                        <View style={styles.modalContent}>
                            {options.map((option, index) => (
                                <TouchableOpacity
                                key={index}
                                style={[
                                    styles.modalText,
                                    selectedOption === option && styles.selectedOption,
                                ]}
                                onPress={() => {
                                    toggleModal();  //关闭底部弹出菜单
                                    setSelectedOption(option);  //设置选中交易所的信息
                                    balanceInquiry(option.id)   //获取选中交易所的余额信息
                                }}>
                                
                                <Text style={styles.modalText}>{`${option.account_name} - ${option.exchange_name}`}</Text>
                                </TouchableOpacity>
                            ))}

                            {/* 底部按钮 */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.modalBottomButton, styles.modalLeftButton]}>
                                    <Text style={styles.modalLeftButtonText}>专属客服</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalBottomButton, styles.modalRightButton]}
                                    onPress={() => {
                                        toggleModal();  //关闭底部弹出菜单
                                        navigation.navigate('DetailStack', {screen: 'accessTradingAccount'}); //跳转
                                        }}>
                                    <Text style={styles.modalRightButtonText}>接入交易账户</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                {/* Text Input with Label on the Right */}
                <View style={styles.middleInputContainer}>
                    <View style={styles.middleRow}>
                        <Text style={styles.leftLabel}>单笔跟单</Text>
                        <Text style={styles.rightLabel}>按比例</Text>
                    </View>
                    <TextInput value={singleTransslated} onChangeText={text => setSingleTransslated(text)} style={styles.middleInput} placeholder="1-100" />
                </View>

                {/* Text Input with Unit (USDT) */}
                <View style={styles.middleInputContainer}>
                    <View style={styles.middleRow}>
                        <Text style={styles.leftLabel}>最大跟单金额</Text>
                        <Text style={styles.availableText}>可用 {balanceInfo?.total_balance || 0.00} USDT</Text>
                    </View>
                    <View style={styles.middleRow}>
                        <TextInput value={followPrice} onChangeText={text => setFollowPrice(text)} style={styles.middleInput} placeholder="请输入内容" />
                        <Text style={styles.unitText}>USDT</Text>
                    </View>
                </View>


            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => {
                    if(!selectedOption) return alert('请选择跟单账户');
                    if(!singleTransslated) return alert('请输入跟单比例');
                    if(!followPrice) return alert('请输入最大跟单金额');
                    startCopyTrade(parseInt(traderId), parseInt(followPrice), parseInt(singleTransslated), selectedOption.id, selectedOption.exchange_id)}}>
                    <Text style={styles.bottomButtonText}>开始跟单</Text>
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
        justifyContent: 'space-between',
        padding: 16,
    },

    //==========顶部部分==========
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    topAvatar: {
        marginRight: 10,
        width:48,
        height:48,
    },
    topAvatarWithBorder: {
        borderWidth: 2, // 边框宽度
        borderColor: '#f3f3f3', // 边框颜色
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
    },
    middleInputContainer: {
        marginBottom: 20,
    },
    middleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    middleInput: {
        borderWidth: 1,
        borderColor: '#000',
        paddingVertical: 16, // 增加到16或更高
        borderRadius: 30,
        padding: 10,
        flex: 1,
        minHeight: 50, // 确保有最小高度
    },
    leftLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    rightLabel: {
        fontSize: 16,
        textAlign: 'right',
    },
    availableText: {
        fontSize: 12,
        color: '#888',
    },
    unitText: {
        fontSize: 16,
        padding: 10,
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
    bottomButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    //==========底部部分==========






});

export default CopyTradeScreen;