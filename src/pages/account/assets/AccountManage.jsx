import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Popup from '../../../components/common/popup';
import EditApiForm from '../../../components/account/EditApiForm';
import Modal from '../../../components/common/modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import request from '../../../utils/request';

const AccountManage = ({ navigation, route }) => {
  console.log('AccountManage', route);
  
  const accountInfo = route.params.accountInfo;
  
  const accountName = accountInfo?.account_name;
  
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  // 删除弹窗状态
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  
  // API模拟
  const [apiConfig, setApiConfig] = useState({
    apiKey: accountInfo.api_key, 
    secretKey: accountInfo.secret_key,
    password: accountInfo.passphrase,
    authTime: '2024/2/4'
  });

  // 添加账户名称编辑状态
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(accountName || 'OKX-test');

  // 添加遮挡显示函数
  const maskValue = (value, type) => {
    if (!value) return '';
    const length = value.length;
    
    switch (type) {
      case 'apiKey':
        if (length <= 6) return value;
        return value.substring(0, 6) + '*'.repeat(Math.min(length - 6, 50));
      case 'secretKey':
      case 'password':
        return '*'.repeat(Math.min(length, 50));
      default:
        return value;
    }
  };

  // 渲染信息项
  const renderInfoItem = (label, value, type) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>
        {type ? maskValue(value, type) : value}
      </Text>
    </View>
  );

  // 渲染底部操作按钮
  const renderActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => setIsBottomSheetVisible(true)}
      >
        <Icon name="edit" type="font-awesome" size={20} color="#333" />
        <Text style={styles.actionButtonText}>编辑</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => setIsDeleteModalVisible(true)}
      >
        <Icon name="trash" type="font-awesome" size={20} color="#ff4d4f" />
        <Text style={styles.deleteButtonText}>删除</Text>
      </TouchableOpacity>
    </View>
  );

  // 删除api账户函数
  const handleDelete = async (user_bind_exchange_id) => {
    // 这里添加删除逻辑
    await request.delete('/api/exchange/deleteExchange?user_bind_exchange_id=' + user_bind_exchange_id)
    .then(response => {

      if (response.data.code === 200) {
        alert('删除成功');
      }else {
        alert(response.data.msg);
      }
    })
    .catch(error => {
          console.error(error);
    })

    
    
    setIsDeleteModalVisible(false);
    navigation.goBack(); // 删除后返回上一页
  };

  // 修改账户名称函数
  const changeExchangeApiName = async (newName, user_bind_exchange_id) => {
    // 这里添加修改名称逻辑

    await request.put('/api/exchange/changeExchangeApiName', {account_name: newName, user_bind_exchange_id: user_bind_exchange_id})
    .then(response => {
      console.log(response);
      if (response.data.code === 200) {
        alert('修改成功');
      }else{
        alert(response.data.msg);
      }
    })
    .catch(error => {
      console.error(error);
      alert('修改失败');  // 添加错误处理
    })
  }

  const scrollViewRef = useRef(null);

  // 修改初始高度状态
  const [popupHeight, setPopupHeight] = useState('60%');

  // 添加键盘监听
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setPopupHeight('80%');
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setPopupHeight('60%');
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* 导航 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" type="font-awesome" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>API账户管理</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 基本信息区域 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>基本信息</Text>
          <View style={styles.infoItem}>
            <Text style={styles.label}>交易所</Text>
            <Text style={styles.value}>OKX</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>账户名称</Text>
            <TouchableOpacity 
              style={styles.nameEditContainer}
              onPress={() => setIsEditingName(true)}
            >
              <Text style={styles.value}>{editedName}</Text>
              <Icon 
                name="edit" 
                type="font-awesome" 
                size={16} 
                color="#999"
                containerStyle={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>账户类型</Text>
            <Text style={styles.value}>API账户</Text>
          </View>
        </View>

        {/* API信息区域 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API信息</Text>
          {renderInfoItem('API KEY', apiConfig.apiKey, 'apiKey')}
          {renderInfoItem('Secret KEY', apiConfig.secretKey, 'secretKey')}
          {renderInfoItem('密码', apiConfig.password, 'password')}
          {renderInfoItem('授权时间', apiConfig.authTime)}
        </View>

        {/* 操作按钮 */}
        {renderActionButtons()}
      </ScrollView>

      {/* 底部编辑弹窗 */}
      <Popup
        visible={isBottomSheetVisible}
        position="bottom"
        closeOnMaskClick
        closeOnSwipe
        mask={true}
        onClose={() => {
          Keyboard.dismiss();
          setIsBottomSheetVisible(false);
        }}
        onMaskClick={() => {
          Keyboard.dismiss();
          setIsBottomSheetVisible(false);
        }}
        bodyStyle={{ height: popupHeight }}
      >
      <KeyboardAwareScrollView
  enableOnAndroid
  enableResetScrollToCoords={false}
  keyboardShouldPersistTaps="handled"
  extraScrollHeight={Platform.OS === 'ios' ? 20 : 10}
  contentContainerStyle={{ 
    flexGrow: 1,
    paddingBottom: 20 
  }}
  showsVerticalScrollIndicator={false}
  bounces={false}
  scrollEventThrottle={8}  // 降低滚动事件节流时间
  overScrollMode="never"
  scrollToOverflowEnabled={false}
  enableAutomaticScroll={true}
  keyboardOpeningTime={10}  // 设置非常短的动画时间
  keyboardDismissMode="interactive"
  scrollAnimationDuration={10}  // 添加快速的滚动动画时间
  onKeyboardWillShow={() => setPopupHeight('80%')}
  onKeyboardWillHide={() => setPopupHeight('60%')}
>
          <EditApiForm 
            onClose={() => {
              Keyboard.dismiss();
              setIsBottomSheetVisible(false);
            }}
            onSave={(newConfig) => {
              Keyboard.dismiss();
              setApiConfig({
                ...apiConfig,
                ...newConfig
              });
              setIsBottomSheetVisible(false);
            }}
            initialValues={apiConfig}
            userBindExchangeId={accountInfo.id}
          />
        </KeyboardAwareScrollView>
      </Popup>

      {/* 删除api账户 */}
      <Modal
        visible={isDeleteModalVisible}
        title="删除"
        showConfirmButton
        showCancelButton
        onClose={() => setIsDeleteModalVisible(false)}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={() => handleDelete(accountInfo.id)}
      >
        <Text style={styles.modalText}>
          确定要删除 {accountName} 吗？
        </Text>
      </Modal>

      {/* 修改账户名称弹窗 */}
      <Modal
        visible={isEditingName}
        title="修改账户名称"
        showConfirmButton
        showCancelButton
        onClose={() => setIsEditingName(false)}
        onCancel={() => {
          setEditedName(editedName);
          setIsEditingName(false);
        }}
        onConfirm={() => {
          changeExchangeApiName(editedName, accountInfo.id);
          setIsEditingName(false);
        }}
      >
        <View style={styles.modalContent}>
          <TextInput
            style={styles.nameInput}
            value={editedName}
            onChangeText={setEditedName}
            placeholder="请输入账户名称"
            placeholderTextColor="#999"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    backgroundColor: '#fff',
  },
  backButton: {
    width: 28,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 0,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: -1,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deleteButton: {
    margin: 16,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4d4f',
  },
  deleteText: {
    fontSize: 16,
    color: '#ff4d4f',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusRunning: {
    backgroundColor: '#f6ffed',
    borderColor: '#b7eb8f',
  },
  statusError: {
    backgroundColor: '#fff7e6',
    borderColor: '#ffd591',
  },
  statusText: {
    fontSize: 12,
  },
  statusRunningText: {
    color: '#52c41a',
  },
  statusErrorText: {
    color: '#FFA940',
  },
  inputItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    height: 44,
    borderRadius: 4,
  },
  saveButton: {
    backgroundColor: '#80FFE9',
    height: 44,
    borderRadius: 4,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
  },
  placeholder: {
    width: 28,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderTopWidth: 8,
    borderTopColor: '#f5f5f5',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    flex: 0.48,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#fff7f7',
  },
  deleteButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#ff4d4f',
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
    width: '100%',
  },
  nameEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: 8,
    height: 22,
    justifyContent: 'center',
  },
  nameInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalContent: {
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default AccountManage;
