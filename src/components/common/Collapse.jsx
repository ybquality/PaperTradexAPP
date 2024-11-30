import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Icon } from '@rneui/themed';

// 启用 LayoutAnimation 在 Android 上的支持
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Collapse = ({ 
  title, 
  children, 
  defaultExpanded = false,
  titleStyle,
  contentStyle,
  containerStyle,
  showArrow = true,
  arrowColor = 'rgba(0, 0, 0, 0.4)',
  renderTitle,
  onToggle,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [rotateAnimation] = useState(new Animated.Value(defaultExpanded ? 1 : 0));

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
    Animated.timing(rotateAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    onToggle?.(!expanded);
  };

  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity 
        style={[styles.titleContainer, titleStyle]} 
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        {renderTitle ? (
          renderTitle(expanded)
        ) : (
          <>
            <Text style={styles.title}>{title}</Text>
            {showArrow && (
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Icon
                  name="chevron-down"
                  type="feather"
                  size={20}
                  color={arrowColor}
                />
              </Animated.View>
            )}
          </>
        )}
      </TouchableOpacity>
      
      {expanded && (
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    color: '#333',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default Collapse;
