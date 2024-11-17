// 页面加载动画
import React, { useEffect, useState, useRef } from 'react';
import { View, Modal, StyleSheet, Animated } from 'react-native';
import { loadingSubject } from '../utils/loadingManager';

const GlobalLoader = () => {
  const [loading, setLoading] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const subscription = loadingSubject.subscribe(
      isLoading => setLoading(isLoading)
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [loading]);

  const spin = spinValue.interpolate({
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
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.threeBody, { transform: [{ rotate: spin }] }]}>
          <View style={[styles.dot, styles.dot1]}>
            <Animated.View style={styles.dotInner} />
          </View>
          <View style={[styles.dot, styles.dot2]}>
            <Animated.View style={styles.dotInner} />
          </View>
          <View style={[styles.dot, styles.dot3]}>
            <Animated.View style={styles.dotInner} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  threeBody: {
    width: 35,
    height: 35,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    height: '100%',
    width: '30%',
  },
  dotInner: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#5D3FD3',
    borderRadius: 50,
  },
  dot1: {
    bottom: '5%',
    left: 0,
    transform: [
      { rotate: '60deg' },
      { translateY: 14 }  // 85% of height
    ],
  },
  dot2: {
    bottom: '5%',
    right: 0,
    transform: [
      { rotate: '-60deg' },
      { translateY: 14 }
    ],
  },
  dot3: {
    bottom: '-5%',
    left: 0,
    transform: [
      { translateX: 20 }  // 116.666% of width
    ],
  },
});

export default GlobalLoader; 