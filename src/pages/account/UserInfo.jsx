// 首页
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

const UserInfoScreen = ({ navigation }) => {
  const [avatarUri, setAvatarUri] = useState(null);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [editedNickname, setEditedNickname] = useState('用户昵称');

  const pickImage = async () => {
    try {
      // 请求权限
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('提示', '需要相册权限才能选择图片');
        return;
      }

      // 打开相册选择图片
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,  // 改为 false，不裁剪
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
        // 调用上传API
        console.log('选择的图片:', result.assets[0].uri);
        
        // 上传API
        // const formData = new FormData();
        // formData.append('avatar', {
        //   uri: result.assets[0].uri,
        //   type: 'image/jpeg',
        //   name: 'avatar.jpg'
        // });
      }
    } catch (error) {
      console.error('选择图片错误:', error);
      Alert.alert('错误', '选择图片失败，请重试');
    }
  };

  const changeNickname = async (newNickname) => {
    try {
      // 调用修改昵称的API
      // await request.put('/api/', { nickname: newNickname })
      console.log('修改昵称:', newNickname);
      Alert.alert('成功', '昵称修改成功');
    } catch (error) {
      console.error('修改昵称错误:', error);
      Alert.alert('错误', '修改失败，请重试');
    }
  };

  const handleNicknamePress = () => {
    setIsEditingNickname(true);
  };

  return (
    <View style={styles.screen}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Icon
            name="chevron-left"
            type="feather"
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {/* 用户信息列表 */}
      <View style={styles.userInfoList}>
        <TouchableOpacity 
          style={styles.listItem}
          onPress={pickImage}
        >
          <Text>头像</Text>
          <View style={styles.rightContent}>
            <Image 
              source={avatarUri ? { uri: avatarUri } : require('../../../assets/adaptive-icon.png')}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <Icon name="chevron-right" type="feather" size={20} color="#999" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.listItem}
          onPress={handleNicknamePress}
        >
          <Text>昵称</Text>
          <View style={styles.rightContent}>
            <Text style={styles.nickname}>{editedNickname}</Text>
            <Icon name="chevron-right" type="feather" size={20} color="#999" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.listItem}>
          <Text>用户条款</Text>
          <Icon
            name="chevron-right"
            type="feather"
            size={20}
            color="#999"
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.listItem}>
          <Text>隐私政策</Text>
          <Icon
            name="chevron-right"
            type="feather"
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* 底部版权信息 */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>PaperTradex, LTD. 2024</Text>
          <Icon 
            name="copyright"
            type="material-community"
            size={12}
            color="#999"
            containerStyle={styles.versionIcon}
          />
          <Text style={styles.footerText}>v1.0</Text>
        </View>
      </View>

      {/* 添加修改昵称的弹窗 */}
      <Modal
        visible={isEditingNickname}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>修改昵称</Text>
            <TextInput
              style={styles.nicknameInput}
              value={editedNickname}
              onChangeText={setEditedNickname}
              placeholder="请输入昵称"
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => {
                  setEditedNickname(editedNickname);
                  setIsEditingNickname(false);
                }}
              >
                <Text style={styles.modalCancelText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={() => {
                  changeNickname(editedNickname);
                  setIsEditingNickname(false);
                }}
              >
                <Text style={styles.modalConfirmText}>确定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
    marginLeft: -4,
  },
  userInfoList: {
    paddingHorizontal: 12,
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 4,
    backgroundColor: '#f0f0f0',
  },
  nickname: {
    color: '#666',
    marginRight: 4,
  },
  versionIcon: {
    marginHorizontal: 4,
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#999',
    fontSize: 12,
    lineHeight: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  nicknameInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  modalCancelButton: {
    backgroundColor: '#f5f5f5',
  },
  modalConfirmButton: {
    backgroundColor: '#80FFE9',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#666',
  },
  modalConfirmText: {
    fontSize: 16,
    color: '#000',
  },
});

export default UserInfoScreen;