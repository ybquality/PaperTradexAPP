import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import request from '../../../../utils/request';



const ExchangeSettings = () => {
  const navigation = useNavigation();
  
  const [exchanges, setExchanges] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);

  const [accountNoteName, setAccountNoteName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [apiPassphrase, setApiPassphrase] = useState('');

  useEffect(() => {
    // 定义一个异步函数来请求数据
    const fetchData = async () => {
      try {
        // console.log('Fetching data for ID:', id);
        postBody = {
          pageNum: 1,  // 使用传递过来的 id 作为请求参数
          pageSize: 10,
        }

        // 发起网络请求
        const response = await request.post('/api/exchange/getExchanges', postBody);
        setExchanges(response.data.data);
        console.log(response.data.data);
        

      } catch (err) {
        console.error('Error fetching data:', err.message || err);

      } finally {

      }
    };

    // 调用数据请求函数
    fetchData();
  }, []);  // 当 id 改变时重新执行 useEffect

  const bindExchange = async (trade_id, apiKey, apiSecret, apiPassphrase, accountNoteName) => {
    
    // 未完成：
    // 修改文本框参数的读取设置，然后在按钮中进行提交

    postBody = {
      trade_id: trade_id,
      api_key: apiKey,
      secret_key: apiSecret,
      Passphrase: apiPassphrase,
      account_note_name: accountNoteName
    }

    await request.post('/api/exchange/bindExchange', postBody)
      .then(response => {
        if (response.data.code == 200) {
          alert(response.data.msg);
          navigation.goBack()
        }else{
          alert(response.data.msg);
        }
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleButtonClick = (selectTrade) => {
    console.log(`Button ${selectTrade.name} clicked`);
    setSelectedButton(selectTrade);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>



      {/* 交易所选择 */}
      <Text style={styles.sectionTitle}>交易所</Text>
      <View style={styles.exchangeButtons}>
        {/* <TouchableOpacity
          style={[
            styles.exchangeButton,
            selectedExchange === 'Binance' && styles.selectedButton,
          ]}
          onPress={() => setSelectedExchange('Binance')}
        >
          <Text style={[
            styles.exchangeButtonText,
            selectedExchange === 'Binance' && styles.selectedButtonText,
          ]}>Binance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.exchangeButton,
            selectedExchange === 'OKX' && styles.selectedButton,
          ]}
          onPress={() => setSelectedExchange('OKX')}
        >
          <Text style={[
            styles.exchangeButtonText,
            selectedExchange === 'OKX' && styles.selectedButtonText,
          ]}>OKX</Text>
        </TouchableOpacity> */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {exchanges.map((button) => (
            <TouchableOpacity
              key={button.id}
              style={[
                styles.button,
                selectedButton.name === button.name && styles.selectedButton,
              ]}
              onPress={() => handleButtonClick(button)}
            >
              <Text style={[
                styles.buttonText,
                selectedButton.name === button.name && styles.selectedButtonText,
              ]}>
                {button.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 帐户名称输入框 */}
      <Text style={styles.sectionTitle}>帐户名称</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setAccountNoteName(text)}
        placeholder="用户备注区分账号(10字内)"
        placeholderTextColor="#999"
      />

      {/* API Key 输入框 */}
      <Text style={styles.sectionTitle}>交易所API Key</Text>
      <TextInput style={styles.input} onChangeText={text => setApiKey(text)} placeholder="输入API Key" placeholderTextColor="#999" />
      <TextInput style={styles.input} onChangeText={text => setApiSecret(text)} placeholder="输入API Secret" placeholderTextColor="#999" />
      <TextInput style={styles.input} onChangeText={text => setApiPassphrase(text)} placeholder="输入API 密码" placeholderTextColor="#999" />

      {/* 底部按钮 */}
      <TouchableOpacity style={styles.connectButton} onPress={() => bindExchange(selectedButton.id, apiKey, apiSecret, apiPassphrase, accountNoteName)}>
        <Text style={styles.connectButtonText}>接入</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#E5F1FE', // 浅蓝色背景
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    maxWidth: '65%', // 限制文本和按钮的宽度
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  cardButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exchangeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  connectButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20, // 圆角
    borderWidth: 1, // 边框宽度
    borderColor: 'gray', // 边框颜色
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  selectedButton: {
    borderColor: 'rgba(0, 208, 172, 1)', // 选中时的边框颜色
  },
  buttonText: {
    color: 'gray',
    fontSize: 16,
  },
  selectedButtonText: {
    color: 'rgba(0, 208, 172, 1)', // 选中时的文字颜色
  },
});

export default ExchangeSettings;
