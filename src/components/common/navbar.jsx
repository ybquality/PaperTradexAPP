import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { Icon } from '@rneui/themed';

const NavBar = ({ 
  back = '',
  backIcon = true,
  children,
  left,
  onBack,
  right,
}) => {
  const renderBackIcon = () => {
    if (backIcon === true) {
      return (
        <Icon
          name="arrow-left"
          type="feather"
          size={24}
          color="rgba(0, 0, 0, 0.9)"
        />
      );
    }
    if (backIcon) {
      return backIcon;
    }
    return null;
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.side}>
        {(back !== null || backIcon) && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBack}
          >
            {renderBackIcon()}
            {back && <Text style={styles.backText}>{back}</Text>}
          </TouchableOpacity>
        )}
        {left && <View style={styles.left}>{left}</View>}
      </View>

      <View style={styles.title}>
        {typeof children === 'string' ? (
          <Text 
            style={styles.titleText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </View>

      <View style={[styles.side, styles.rightSide]}>
        {right && (
          <View style={styles.right}>
            {typeof right === 'string' ? (
              <Text style={styles.rightText}>{right}</Text>
            ) : (
              right
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  side: {
    minWidth: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    justifyContent: 'flex-end',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.9)',
    marginLeft: 4,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.4)',
  }
});

export default NavBar;
