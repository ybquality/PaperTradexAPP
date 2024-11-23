import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Animated, 
  StyleSheet,
  Easing,
} from 'react-native';
import { Icon } from '@rneui/themed';

const Switch = ({ 
  checked: propChecked,
  defaultChecked = false,
  disabled = false,
  loading = false,
  onChange,
}) => {
  // 内部状态
  const [checked, setChecked] = useState(propChecked ?? defaultChecked);
  const [innerLoading, setInnerLoading] = useState(loading);
  
  // 使用 useRef 来存储动画值
  const translateX = useRef(new Animated.Value(
    propChecked ?? defaultChecked ? 20 : 0
  )).current;
  
  // 添加旋转动画值
  const spinValue = useRef(new Animated.Value(0)).current;

  // 创建旋转动画
  useEffect(() => {
    if (loading || innerLoading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [loading, innerLoading]);

  // 创建旋转插值
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  // 监听外部checked变化
  useEffect(() => {
    if (propChecked !== undefined) {
      setChecked(propChecked);
      animateSwitch(propChecked);
    }
  }, [propChecked]);

  // 切换动画
  const animateSwitch = (value) => {
    Animated.spring(translateX, {
      toValue: value ? 20 : 0,
      useNativeDriver: true,
      bounciness: 0,
      speed: 20,
    }).start();
  };

  // 处理切换
  const handleToggle = async () => {
    if (disabled || loading || innerLoading) return;
    
    const newValue = !checked;
    
    // 立即开始动画
    animateSwitch(newValue);
    
    if (onChange) {
      try {
        setInnerLoading(true);
        const result = onChange(newValue);
        
        // 如果是Promise，等待完成
        if (result instanceof Promise) {
          await result;
        }
        
        // 如果是非受控组件，更新内部状态
        if (propChecked === undefined) {
          setChecked(newValue);
        }
      } catch (error) {
        // 如果发生错误，恢复动画
        animateSwitch(checked);
        console.error('Switch onChange error:', error);
      } finally {
        setInnerLoading(false);
      }
    } else {
      // 非受控且没有onChange
      setChecked(newValue);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleToggle}
      style={[
        styles.container,
        checked && styles.containerActive,
        disabled && styles.containerDisabled,
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX }],
          },
          disabled && styles.circleDisabled,
        ]}
      >
        {(loading || innerLoading) ? (
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Icon 
              name="loading1"
              type="antdesign"
              size={14}
              color="rgba(0, 208, 172, 1)"
            />
          </Animated.View>
        ) : (
          <Icon
            name={checked ? "check" : "x"}
            type="feather"
            size={14}
            color={checked ? "rgba(0, 208, 172, 1)" : "#999"}
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 24,
    borderRadius: 833,
    backgroundColor: 'rgba(238, 239, 242, 1)',
    padding: 2,
  },
  containerActive: {
    backgroundColor: 'rgba(0, 208, 172, 1)',
  },
  containerDisabled: {
    opacity: 0.4,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDisabled: {
    backgroundColor: '#F5F5F5',
  },
});

export default Switch;
