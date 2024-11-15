import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { BottomSheet } from '@rneui/themed';
import EditApiForm from '../../../components/account/EditApiForm';

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
    switch (type) {
      case 'apiKey':
        return value.substring(0, 6) + '*'.repeat(value.length - 6);
      case 'secretKey':
      case 'password':
        return '*'.repeat(value.length);
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
      <BottomSheet
        isVisible={isBottomSheetVisible}
        onBackdropPress={() => setIsBottomSheetVisible(false)}
        modalProps={{
          statusBarTranslucent: true,  // 添加这个属性使遮罩层覆盖状态栏
          animationType: 'fade',
        }}
        backdropStyle={styles.backdrop}  // 添加自定义遮罩层样式
      >
        <EditApiForm 
          onClose={() => setIsBottomSheetVisible(false)}
          onSave={(newConfig) => {
            setApiConfig({
              ...apiConfig,
              ...newConfig
            });
            setIsBottomSheetVisible(false);
          }}
          initialValues={apiConfig}
          userBindExchangeId={accountInfo.id}
        />
      </BottomSheet>

      {/* 删除api账户 */}
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>删除</Text>
            <Text style={styles.modalMessage}>确定要删除 {accountName} 吗？</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setIsDeleteModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={() => {handleDelete(accountInfo.id)}}
              >
                <Text style={styles.modalConfirmText}>确定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 修改账户名称 */}
      <Modal
        visible={isEditingName}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>修改账户名称</Text>
            <TextInput
              style={styles.nameInput}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="请输入账户名称"
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => {
                  setEditedName(editedName);
                  setIsEditingName(false);
                }}
              >
                <Text style={styles.modalCancelText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={() => {
                  // 这里可以添加保存名称的逻辑
                  changeExchangeApiName(editedName, accountInfo.id);
                  setIsEditingName(false);
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
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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
    marginBottom: 24,
  },
});

export default AccountManage;
