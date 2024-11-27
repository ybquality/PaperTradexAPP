import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

let toastInstance = null;

const Toast = {
  show: ({ content, icon, duration = 2000 }) => {
    // 如果已经有实例，先清除之前的定时器
    if (toastInstance?.timer) {
      clearTimeout(toastInstance.timer);
    }

    // 创建/更新 toast 实例
    if (!toastInstance) {
      toastInstance = {
        visible: false,
        content: '',
        icon: null,
        timer: null,
        setVisible: null,
      };
    }

    // 更新内容
    toastInstance.content = content;
    toastInstance.icon = icon;

    // 显示 toast
    if (toastInstance.setVisible) {
      toastInstance.setVisible(true);
      
      // 设置定时器自动关闭
      toastInstance.timer = setTimeout(() => {
        toastInstance.setVisible(false);
      }, duration);
    }
  }
};

// Toast 容器组件
export const ToastContainer = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (toastInstance) {
      toastInstance.setVisible = setVisible;
    }
    return () => {
      if (toastInstance) {
        toastInstance.setVisible = null;
      }
    };
  }, []);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {toastInstance?.icon && (
            <View style={styles.icon}>{toastInstance.icon}</View>
          )}
          <Text style={styles.content}>{toastInstance?.content}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
  },
  icon: {
    marginRight: 8,
  },
  content: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default Toast;
