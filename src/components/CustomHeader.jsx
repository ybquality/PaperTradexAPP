// DetailStackNavigator.js
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ titleName, rightText }) => {
    const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        {/* 返回按钮 */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* 居中的粗体标题 */}
        {titleName ? (
            <View style={styles.titleView}>
            <Text style={styles.titleText}>{titleName}</Text>
            </View>
        ) : null}
        

        {/* 右侧文本按钮 */}
        {rightText ? (
            <TouchableOpacity onPress={() => alert('按钮点击')} style={{ padding: 10 }}>
            <Text style={{ color: 'rgba(0, 0, 0, 0.4)' }}>{rightText}</Text>
            </TouchableOpacity>
        ) : null}
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10
    },
    backButton: {
        padding: 10,
    },
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    titleView: {
      position: 'absolute',
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    }
  
});

export default CustomHeader;