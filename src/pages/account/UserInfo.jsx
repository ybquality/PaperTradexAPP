import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import NavBar from '../../components/common/navbar';
import { Icon } from '@rneui/themed';

const UserInfoScreen = ({ navigation }) => {
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
                source={require('../../../assets/icon.png')}
                style={styles.avatar}
                resizeMode="cover"
              />
          </View>

          {/* 信息列表 */}
          <View style={styles.infoList}>
            <TouchableOpacity 
              style={styles.infoItem}
              onPress={() => navigation.navigate('EditUsername')}
            >
              <Text style={styles.infoLabel}>昵称</Text>
              <View style={styles.infoRight}>
                <Text style={styles.infoValue}>david</Text>
                <Icon
                  name="edit"
                  type="feather"
                  size={16}
                  color="rgba(0, 0, 0, 0.4)"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.infoItem}>
              <Text style={styles.infoLabel}>关于PaperTradex</Text>
              <View style={styles.infoRight}>
                <Text style={styles.infoValue}>v 1.0.0</Text>
                <Icon
                  name="settings"
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
    paddingBottom: 60,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(243, 244, 246, 1)',
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
});

export default UserInfoScreen;