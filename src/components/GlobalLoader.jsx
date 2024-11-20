// 页面加载动画
import React, { useEffect, useState, useRef } from 'react';
import { View, Modal, StyleSheet, Animated, Easing } from 'react-native';
import { loadingSubject } from '../utils/loadingManager';

const GlobalLoader = () => {
  const [loading, setLoading] = useState(false);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const subscription = loadingSubject.subscribe(
      isLoading => setLoading(isLoading)
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) {
      // 重置动画值
      spinAnim.setValue(0);
      scaleAnim.setValue(1);

      // 旋转动画
      const startSpinAnimation = () => {
        spinAnim.setValue(0);
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          if (loading) {
            startSpinAnimation();
          }
        });
      };

      // 缩放动画
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 0.6,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      );

      startSpinAnimation();
      pulseAnimation.start();

      return () => {
        pulseAnimation.stop();
        spinAnim.setValue(0);
        scaleAnim.setValue(1);
      };
    }
  }, [loading]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  if (!loading) return null;

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={loading}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.loader,
            {
              transform: [{ rotate: spin }]
            }
          ]}
        >
          <Animated.View 
            style={[
              styles.innerDot,
              {
                transform: [{ scale: scaleAnim }]
              }
            ]}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  loader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'rgba(128, 255, 233, 0.2)',
    borderTopColor: 'rgba(128, 255, 233, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(128, 255, 233, 0.3)',
  }
});

export default GlobalLoader; 