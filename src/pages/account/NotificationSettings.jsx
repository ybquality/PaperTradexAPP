import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import NavBar from '../../components/common/navbar';
import Switch from '../../components/common/switch';
const NotificationSettingsScreen = () => {
  const navigation = useNavigation();
  
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [nightModeEnabled, setNightModeEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  
  return (
    <View style={styles.container}>
      <View style={styles.navBarContainer}>
        <NavBar
          onBack={() => navigation.goBack()}
        >
          <Text style={styles.title}>推送设置</Text>
        </NavBar>
      </View>
      <View style={styles.content}>
        <View style={[styles.itemContainer, styles.withBorder]}>
          <Text style={[
            styles.itemLabel,
            notificationEnabled && styles.itemLabelActive
          ]}>
            开启通知提示
          </Text>
          <Switch 
            defaultChecked
            onChange={setNotificationEnabled}
          />
        </View>
        <View style={[styles.itemContainer, styles.withBorder]}>
          <Text style={[
            styles.itemLabel,
            nightModeEnabled && styles.itemLabelActive
          ]}>
            夜间免打扰(00:00-08:00)
          </Text>
          <Switch
            onChange={setNightModeEnabled}
          />
        </View>
        
        <View style={styles.emailContainer}>
          <View style={[styles.emailItem, styles.emailItemBorder]}>
            <Text style={[
              styles.emailTitle,
              emailEnabled && styles.itemLabelActive
            ]}>
              邮箱通知
            </Text>
            <Switch
              onChange={setEmailEnabled}
            />
          </View>
          <View style={[styles.emailItem, styles.emailPadding]}>
            <Text style={styles.emailText}>邮箱号</Text>
            <Text style={styles.emailValue}>1234567890@qq.com</Text>
          </View>
          <View style={styles.emailItem}>
            <Text style={styles.emailText}>推送测试</Text>
            <Text style={styles.emailValue}>立即测试</Text>
          </View>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
  navBarContainer: {
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.9)',
  },
  content: {
    margin: 24,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(243, 244, 246, 1)',
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(156, 163, 175, 1)',
  },
  itemLabelActive: {
    color: 'rgba(0, 0, 0, 1)',
  },
  emailContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
  },
  emailItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 4,
  },
  emailTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(156, 163, 175, 1)',
  },
  emailText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  emailValue: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 1)',
  },
  emailItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(243, 244, 246, 1)',
    paddingBottom: 12,
  },
  emailPadding: {
    paddingVertical: 12,
  }
});

export default NotificationSettingsScreen;
