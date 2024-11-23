import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const Ellipsis = ({ 
  children, 
  rows = 1, 
  defaultExpanded = false,
  style,
  expandText = "展开",
  collapseText = "收起",
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [showButton, setShowButton] = useState(false);
  const [textHeight, setTextHeight] = useState(0);

  // 分别处理 iOS 和 Android 的文本布局
  const onTextLayout = useCallback(({ nativeEvent: { lines, height } }) => {
    if (Platform.OS === 'ios') {
      // iOS: 使用文本高度来判断
      const lineHeight = style?.lineHeight || 20;
      const maxHeight = lineHeight * rows;
      if (!showButton && height > maxHeight) {
        setShowButton(true);
      }
    } else {
      // Android: 使用行数来判断
      if (!showButton && lines.length > rows) {
        setShowButton(true);
      }
    }
    setTextHeight(height);
  }, [rows, showButton, style]);

  return (
    <View style={styles.container}>
      {/* 用于测量的完整文本 */}
      {Platform.OS === 'ios' && !expanded && (
        <Text
          style={[
            styles.text,
            style,
            styles.measureText
          ]}
          onLayout={({ nativeEvent: { layout } }) => {
            if (!showButton && layout.height > (style?.lineHeight || 20) * rows) {
              setShowButton(true);
            }
          }}
        >
          {children}
        </Text>
      )}

      {/* 实际显示的文本 */}
      <Text
        numberOfLines={expanded ? undefined : rows}
        onTextLayout={onTextLayout}
        style={[
          styles.text,
          style,
          Platform.OS === 'ios' && !expanded && {
            maxHeight: (style?.lineHeight || 20) * rows
          }
        ]}
      >
        {children}
      </Text>

      {showButton && (
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {expanded ? collapseText : expandText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  text: {
    fontSize: 14,
    // fontWeight: '400',
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  measureText: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
  },
  button: {
    marginTop: 4,
  },
  buttonText: {
    fontSize: 14,
    color: '#00D0AC',
    textAlign: 'right',
  },
});

export default Ellipsis;