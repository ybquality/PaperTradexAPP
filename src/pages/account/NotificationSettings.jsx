import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';

const NotificationSettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [nightModeEnabled, setNightModeEnabled] = useState(false);
  
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleNightMode = () => setNightModeEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      {/* 开启通知提醒 */}
      <View style={styles.settingItem}>
        <Text style={styles.label}>开启通知提醒</Text>
        <Switch
          trackColor={{ false: '#ddd', true: '#00C1A4' }}
          thumbColor={isEnabled ? '#fff' : '#fff'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* 夜间免打扰 */}
      <View style={styles.settingItem}>
        <View style={styles.row}>
          <Text style={styles.label}>夜间免打扰(00:00-08:00)</Text>
          <TouchableOpacity onPress={toggleNightMode} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 邮箱通知 */}
      <View style={[styles.settingItem, styles.emailNotification]}>
        <View style={styles.row}>
          <Text style={styles.label}>邮箱通知</Text>
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emailInfo}>
          <Text style={styles.emailLabel}>邮箱号</Text>
          <Text style={styles.emailValue}>186****9512</Text>
        </View>
        <TouchableOpacity style={styles.testButton}>
          <Text style={styles.testButtonText}>推送测试</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  settingItem: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  emailNotification: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  emailInfo: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailLabel: {
    fontSize: 14,
    color: '#888',
  },
  emailValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  testButton: {
    marginTop: 16,
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 24,
  },
  testButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default NotificationSettingsScreen;
