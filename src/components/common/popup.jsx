import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
  Platform,
  Easing,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 50;
const MASK_ANIMATION_DURATION = 200; // 遮罩层动画时长
const SLIDE_ANIMATION_DURATION = 150; // 弹出层动画时长

// 修改动画配置
const SPRING_CONFIG = {
  tension: 120,  // 弹簧张力，控制动画速度
  friction: 24,  // 摩擦力，控制回弹
  useNativeDriver: true,
};

const TIMING_CONFIG = {
  duration: 250,
  easing: Easing.bezier(0.4, 0, 0.2, 1), // Material Design 标准缓动曲线
  useNativeDriver: true,
};

export const Popup = ({
  visible = false,
  position = 'bottom',
  mask = true,
  closeOnMaskClick = false,
  closeOnSwipe = true,
  onClose,
  onMaskClick,
  afterClose,
  afterShow,
  children,
  bodyStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const slideAnim = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const maskAnim = React.useRef(new Animated.Value(0)).current;
  
  // 处理滑动手势
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnSwipe,
      onMoveShouldSetPanResponder: () => closeOnSwipe,
      onPanResponderMove: (_, gestureState) => {
        if (position === 'bottom' && gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SWIPE_THRESHOLD) {
          handleClose();
        } else {
          // 回弹动画
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.sequence([
        // 遮罩层渐入
        Animated.timing(maskAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        // 内容弹出使用弹簧动画
        Animated.spring(slideAnim, {
          toValue: 0,
          ...SPRING_CONFIG,
        })
      ]).start(() => {
        afterShow?.();
      });
    } else {
      handleClose();
    }
  }, [visible]);

  const handleClose = () => {
    // 关闭时使用 timing 动画，更自然
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      ...TIMING_CONFIG,
    }).start(() => {
      // 弹出层消失后执行遮罩层消失动画
      Animated.timing(maskAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(() => {
        setModalVisible(false);
        onClose?.();
        afterClose?.();
      });
    });
  };

  const handleMaskClick = (event) => {
    onMaskClick?.(event);
    if (closeOnMaskClick) {
      handleClose();
    }
  };

  const getSlideAnimStyle = () => {
    const positionStyles = {
      bottom: { transform: [{ translateY: slideAnim }] },
      top: { transform: [{ translateY: Animated.multiply(slideAnim, -1) }] },
      left: { transform: [{ translateX: Animated.multiply(slideAnim, -1) }] },
      right: { transform: [{ translateX: slideAnim }] },
    };
    return positionStyles[position];
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {mask && (
          <Animated.View
            style={[
              styles.mask,
              {
                opacity: maskAnim
              }
            ]}
          >
            <TouchableOpacity
              style={styles.maskTouchable}
              activeOpacity={1}
              onPress={handleMaskClick}
            />
          </Animated.View>
        )}
        <Animated.View
          {...(closeOnSwipe ? panResponder.panHandlers : {})}
          style={[
            styles.content,
            styles[position],
            getSlideAnimStyle(),
            bodyStyle,
          ]}
        >
          <View style={styles.dragIndicatorContainer}>
            <View style={styles.dragIndicator} />
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  maskTouchable: {
    flex: 1,
  },
  dragIndicatorContainer: {
    width: '100%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  dragIndicator: {
    width: 56,
    height: 5,
    backgroundColor: '#E8E8E8',
    borderRadius: 100,
  },
  content: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: -3 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 3,
    //   },
    //   android: {
    //     elevation: 24,
    //   },
    // }),
  },
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  top: {
    top: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  left: {
    left: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  right: {
    right: 0,
    top: 0,
    bottom: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default Popup;
