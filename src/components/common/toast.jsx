import React from 'react';
import { View, Text, StyleSheet, Modal, Platform } from 'react-native';

// 初始化 toastInstance
const toastInstance = {
  visible: false,
  content: '',
  icon: null,
  timer: null,
  setVisible: null,
};

const Toast = {
  show: ({ content, icon, duration = 2000 }) => {
    console.log('Toast.show called:', { content });
    
    if (toastInstance.timer) {
      clearTimeout(toastInstance.timer);
    }

    toastInstance.content = content;
    toastInstance.icon = icon;

    if (toastInstance.setVisible) {
      toastInstance.setVisible(true);
      
      toastInstance.timer = setTimeout(() => {
        toastInstance.setVisible(false);
      }, duration);
    }
  }
};

export const ToastContainer = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // 确保 toastInstance 存在
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
      statusBarTranslucent={true}
      hardwareAccelerated={Platform.OS === 'android'}
    >
      <View style={styles.overlay}>
        <View style={[
          styles.container,
          Platform.OS === 'android' && styles.androidShadow
        ]}>
          {toastInstance.icon && (
            <View style={styles.icon}>{toastInstance.icon}</View>
          )}
          <Text style={styles.content}>{toastInstance.content}</Text>
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
    minWidth: 100,
    ...Platform.select({
      android: {
        elevation: 24,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  androidShadow: {
    elevation: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  icon: {
    marginRight: 8,
  },
  content: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Toast;
