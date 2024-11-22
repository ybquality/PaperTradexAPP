import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal as RNModal,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

const Modal = ({ 
  visible, 
  onClose,
  children,
  title,
  showCloseIcon = true,
  showConfirmButton = false,
  showCancelButton = false,
  onConfirm,
  onCancel,
  confirmText = '确定',
  cancelText = '取消',
}) => {
  const hasButtons = showConfirmButton || showCancelButton;
  
  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[
          styles.content,
          !hasButtons && styles.contentWithoutButtons
        ]}>
          {showCloseIcon && (
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={onClose}
              >
                <Icon
                  name="x"
                  type="feather"
                  size={24}
                  color="rgba(156, 163, 175, 1)"
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.mainContent}>
            {title && (
              <Text style={styles.title}>{title}</Text>
            )}
            {children && (
              <Text style={styles.children}>
                {children}
              </Text>
            )}
          </View>
          {hasButtons && (
            <View style={styles.buttonContainer}>
              {showCancelButton && (
                <TouchableOpacity 
                  style={[
                    styles.button, 
                    styles.cancelButton,
                    !showConfirmButton && styles.fullWidthButton
                  ]} 
                  onPress={onCancel || onClose}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
              )}
              {showConfirmButton && (
                <TouchableOpacity 
                  style={[
                    styles.button, 
                    styles.confirmButton,
                    !showCancelButton && styles.fullWidthButton
                  ]}
                  onPress={onConfirm}
                >
                  <Text style={styles.confirmButtonText}>{confirmText}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: width * 0.8,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 24,
    padding: 16,
    minHeight: 216,
    paddingBottom: 84,
  },
  contentWithoutButtons: {
    paddingBottom: 16,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(17, 24, 39, 1)',
  },
  children: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(156, 163, 175, 1)',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(228, 228, 228, 1)',
  },
  confirmButton: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  cancelButtonText: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 14,
    fontWeight: '500',
  },
  confirmButtonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
    fontWeight: '500',
  },
  fullWidthButton: {
    flex: 1,
  },
});

export default Modal;