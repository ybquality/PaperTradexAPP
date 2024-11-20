import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

import DiscoveryDetailTobTabNavigator from './discoveryDetailTopTabNavigator';

import request from '../../../../utils/request';

const DetailScreen = ({ route, navigation }) => {
    const { id } = route.params || {};  // 从 route.params 中获取传递的 id
    console.log('DetailScreen:', id);
    

    const [data, setData] = useState(null);  // 保存 API 请求返回的数据
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
                const response = await request.get('/test/api/getUserAccountInfoBySecretNew', {
                    params: {
                        'traderId': id  // 使用传递过来的 id 作为请求参数
                    }
                });

                // console.log('Data fetched:', response.data);
                setData(response.data);  // 保存返回的数据
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

    const addSubscribeCopyer = async ( id ) => {
        await request.post('/api/user/addSubscribeCopyer', { id })
        .then(response => {
            const responseData = response.data;
            console.log(responseData);
            if (responseData.code === 200) {
                // 显示提示信息
                alert('订阅成功');
            } else {
                // 显示错误信息
                alert('Error: '+ responseData.msg);
            }

        })
        .catch(error => {
            console.error(error);
        });

    }

    // 页面渲染
    return (
        <View style={styles.container}>
            {/* 顶部部分: 头像和昵称 */}
            <View style={styles.topSection}>
                <Avatar
                    size="large"
                    rounded
                    source={{ uri: data?.userPic }}  // 显示获取到的头像URL
                    containerStyle={[styles.avatar, styles.avatarWithBorder]}
                />
                <Text style={styles.nickname}>{data?.nickName || 'No Name'}</Text>
            </View>

            <View style={styles.middleSection}>
                <DiscoveryDetailTobTabNavigator data={{data: data, id: id}}/>
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={() => addSubscribeCopyer(id)}>
                    <Text style={styles.leftButtonText}>订阅</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacer} /> 
                <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={() => navigation.navigate('DetailStack', {screen: 'CopyTrade', params: {traderId: id, nickName: data?.nickName, avatarUri: data?.userPic}})}>
                    <Text style={styles.rightButtonText}>立即跟单</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// 样式定义
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        padding: 16,
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        marginRight: 10,
        width:48,
        height:48,
    },
    avatarWithBorder: {
        borderWidth: 2, // 边框宽度
        borderColor: '#f3f3f3', // 边框颜色
        shadowColor: '#000', // 阴影颜色
        shadowOpacity: 0.4, // 阴影透明度
        shadowRadius: 3, // 阴影半径
        elevation: 3, // 阴影高度（Android）
    },
    nickname: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    middleSection: {
        flex: 1,
        // 添加样式以满足需求
    },
    bottomSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        flex: 1,
    },
    leftButton: {
        backgroundColor: '#E4E4E4',
    },
    rightButton: {
        backgroundColor: '#000',
        borderWidth: 1,
    },
    leftButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    rightButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonSpacer: {
        width: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default DetailScreen;
