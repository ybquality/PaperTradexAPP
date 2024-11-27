import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

const TradeLog = ({ status = 'success', title, content, time }) => {
  return (
      <View style={styles.container}>
        {/* 左侧状态图标 */}
        <View style={[styles.iconContainer, status === 'success' ? styles.successIcon : styles.failIcon]}>
          <Icon
            name={status === 'success' ? 'bell' : 'alert-circle'}
            type="feather"
            size={16}
            color={status === 'success' ? 'rgba(0, 208, 172, 1)' : 'rgba(255, 77, 79, 1)'}
          />
        </View>

        {/* 右侧内容 */}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{content}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(243, 243, 243, 1)',
    borderRadius: 16,
    padding: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    backgroundColor: 'rgba(0, 208, 172, 0.1)',
  },
  failIcon: {
    backgroundColor: 'rgba(255, 77, 79, 0.1)',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(17, 24, 39, 1)',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(17, 24, 39, 1)',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(156, 163, 175, 1)',
  },
});

export default TradeLog;