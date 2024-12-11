import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Alert, Platform, ScrollView } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';

import request from '../../../../utils/request';


const CopyTradeScreen = ({ route, navigation }) => {
    const data = {}
    const traderId = route.params.traderId;
    const nickName = route.params.nickName;
    const avatarUri = route.params.avatarUri;


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

    // 移除单笔跟单输入框非数字字符
    const handleSingleTransslatedInputChange = (text) => {
        // 允许输入数字和一个小数点
        let numericValue = text.replace(/[^0-9.]/g, "");

        // 防止输入多个小数点
        if ((numericValue.match(/\./g) || []).length > 1) {
            return;
        }

        setSingleTransslated(numericValue);
    };
    // 校准单笔跟单输入框跟单金额 0.01 - 1000
    const handleSingleTransslatedBlur = () => {
        // 当输入框失去焦点时，校正范围
        if (singleTransslated === "" || singleTransslated === ".") {
            setSingleTransslated(""); // 如果为空或只输入了小数点，清空输入
            return;
        }

        let numericValue = parseFloat(singleTransslated); // 转换为浮点数
        const minNumber = 0.01;
        const maxNumber = 1000;

        // 校正范围
        if (numericValue < minNumber) {
            setSingleTransslated(minNumber.toString());
        } else if (numericValue > maxNumber) {
            setSingleTransslated(maxNumber.toString());
        } else {
            setSingleTransslated(numericValue.toString()); // 格式化为合法数字
        }
    };


    // 移除最大跟单金额输入框非数字字符
    const handleFollowPriceInputChange = (text) => {
        // 移除非数字字符
        let numericValue = text.replace(/[^0-9]/g, "");
        // 更新状态，允许用户完整输入
        setFollowPrice(numericValue);
    };
    // 校准最大跟单金额输入框跟单金额 10-200000
    const handleFollowPriceBlur = () => {
        // 当输入框失去焦点时，校正输入值
        if (followPrice === "") {
            setFollowPrice("");
            return; // 如果输入为空，直接退出
        }

        let numericValue = parseInt(followPrice, 10); // 将输入值解析为整数
        const minNumber = 10;
        const maxNumber = 200000;

        // 校正范围
        if (numericValue < minNumber) {
            setFollowPrice(minNumber.toString());
        } else if (numericValue > maxNumber) {
            setFollowPrice(maxNumber.toString());
        } else {
            setFollowPrice(numericValue.toString()); // 确保去掉可能存在的前导零
        }
    };

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
                            source={{ uri: avatarUri }}  // 显示获取到的头像URL
                            containerStyle={[styles.topAvatar, styles.topAvatarWithBorder]}
                        />
                        <Text style={styles.topNickname}>{nickName || 'No Name'}</Text>
                    </View>

                    <View style={styles.middleSection}>

                        {/* Dropdown Input */}
                        <View style={styles.middleInputContainer}>
                            <View style={styles.middleRow}>
                                <Text style={styles.leftLabel}>跟单账户</Text>
                            </View>
                            <TouchableOpacity onPress={toggleModal} style={[styles.modalButton, styles.middleInput]}>
                                <Text style={styles.modalButtonText}>
                                    {selectedOption ? selectedOption.exchange_name : '请选择跟单账户'}
                                </Text>
                                <Icon
                                    type="antdesign"
                                    name="down"
                                    size={20}
                                    color="#000000"
                                />
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
                                                navigation.navigate('DetailStack', { screen: 'accessTradingAccount' }); //跳转
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
                            <View style={styles.inputWithUnit}>
                                <TextInput
                                    value={singleTransslated}
                                    onChangeText={handleSingleTransslatedInputChange}
                                    onBlur={handleSingleTransslatedBlur}
                                    style={[styles.middleInput, styles.inputWithRightUnit]}
                                    placeholder="0.01 - 1000"
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                />
                                <Text style={styles.unitTextInside}>倍</Text>
                            </View>
                        </View>

                        {/* Text Input with Unit (USDT) */}
                        <View style={styles.middleInputContainer}>
                            <View style={styles.middleRow}>
                                <Text style={styles.leftLabel}>最大跟单金额</Text>
                                <Text style={styles.availableText}>可用 {balanceInfo?.total_balance || 0.00} USDT</Text>
                            </View>
                            <View style={styles.inputWithUnit}>
                                <TextInput
                                    value={followPrice}
                                    onChangeText={handleFollowPriceInputChange}
                                    onBlur={handleFollowPriceBlur}
                                    style={[styles.middleInput, styles.inputWithRightUnit]}
                                    placeholder="10 - 200000"
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                />
                                <Text style={styles.unitTextInside}>USDT</Text>
                            </View>
                        </View>


                    </View>
                </View>
                <View style={styles.bottomPadding} />
            </ScrollView>

            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => {
                    if (!selectedOption) return alert('请选择跟单账户');
                    if (!singleTransslated) return alert('请输入跟单比例');
                    if (!followPrice) return alert('请输入最大跟单金额');
                    startCopyTrade(parseInt(traderId), parseInt(followPrice), parseInt(singleTransslated), selectedOption.id, selectedOption.exchange_id)
                }}>
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
    },
    scrollContent: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    bottomPadding: {
        height: 60, // 为底部按钮预留空间
    },
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
        paddingTop: 16,
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
    unitTextInside: {
        position: 'absolute',
        right: 16,
        fontSize: 14,
        color: '#000000',
    },
    inputWithUnit: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputWithRightUnit: {
        paddingRight: 50, // 为单位文字预留空间
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
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 30,
        minHeight: 50,
        justifyContent: 'center',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalButtonText: {
        fontSize: 14,
        color: '#000000',
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