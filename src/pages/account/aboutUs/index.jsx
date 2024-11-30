import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import NavBar from '../../../components/common/navbar';
import { Icon } from '@rneui/themed';
import Modal from '../../../components/common/modal';

// 模拟检查更新接口
const mockCheckUpdate = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 随机返回有更新或无更新
      const hasUpdate = Math.random() > 0.5;
      resolve({
        hasUpdate,
        currentVersion: '1.0.0',
        latestVersion: hasUpdate ? '1.1.0' : '1.0.0',
        updateContent: hasUpdate ? [
          '1. 优化交易体验',
          '2. 新增数据分析功能',
          '3. 修复已知问题',
          '4. 提升整体性能'
        ] : null
      });
    }, 500);
  });
};

const AboutUsScreen = ({ navigation }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(null);

  const handleCheckUpdate = async () => {
    const result = await mockCheckUpdate();
    setUpdateInfo(result);
    setUpdateModal(true);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.navBarContainer}>
          <NavBar
            onBack={() => navigation.goBack()}
          />
        </View>
        
        <View style={styles.content}>
          {/* 头像区域 */}
          <View style={styles.avatarContainer}>
           
              <Image 
                source={require('../../../../assets/icon.png')}
                style={styles.avatar}
                resizeMode="cover"
              />
              <Text style={styles.appName}>PaperTradex</Text>
              <Text style={styles.appVersion}>版本：v 1.0.0</Text>
          </View>

          {/* 信息列表 */}
          <View style={styles.infoList}>
            <TouchableOpacity 
              style={styles.infoItem}
            >
              <Text style={styles.infoLabel}>用户条款</Text>
              <View style={styles.infoRight}>
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={16}
                  color="rgba(0, 0, 0, 0.4)"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.infoItem}
            >
              <Text style={styles.infoLabel}>隐私政策</Text>
              <View style={styles.infoRight}>
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={16}
                  color="rgba(0, 0, 0, 0.4)"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.infoItem} onPress={handleCheckUpdate}>
              <Text style={styles.infoLabel}>检查更新</Text>
              <View style={styles.infoRight}>
                <Text style={styles.infoValue}>v 1.0.0</Text>
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={16}
                  color="rgba(0, 0, 0, 0.4)"
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* 版权信息 */}
          <Text style={styles.copyright}>
            Paper Tradex, Inc. 2024 © v1.0
          </Text>
        </View>
      </SafeAreaView>

      <Modal
        visible={updateModal}
        onClose={() => setUpdateModal(false)}
        title={updateInfo?.hasUpdate ? "版本更新" : "检查更新"}
        showConfirmButton={updateInfo?.hasUpdate}
        showCancelButton={true}
        confirmText="立即更新"
        cancelText={updateInfo?.hasUpdate ? "暂不更新" : "我知道了"}
        onConfirm={() => {
          // 这里添加更新逻辑
          setUpdateModal(false);
        }}
        onCancel={() => setUpdateModal(false)}
      >
        <View style={styles.updateContent}>
          <Text style={styles.versionInfo}>APP版本：v {updateInfo?.latestVersion}</Text>
          {updateInfo?.hasUpdate ? (
            <>
              <Text style={styles.updateTitle}>更新内容：</Text>
              {updateInfo.updateContent.map((item, index) => (
                <Text key={index} style={styles.updateItem}>{item}</Text>
              ))}
            </>
          ) : (
            <Text style={styles.updateDesc}>已是最新版本</Text>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 250, 251, 1)',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  navBarContainer: {
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(243, 244, 246, 1)',
    shadowColor: 'rgba(129, 130, 131, 0.15)',
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(17, 24, 39, 1)',
  },
  appVersion: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(156, 163, 175, 1)',
  },
  infoList: {
    borderRadius:16,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    gap: 16,
    margin: 24,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(243, 244, 246, 1)',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(156, 163, 175, 1)',
  },
  infoRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(17, 24, 39, 1)',
  },
  copyright: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  updateContent: {
    padding: 16,
  },
  versionInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  updateTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  updateItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 4,
  },
  updateDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default AboutUsScreen;