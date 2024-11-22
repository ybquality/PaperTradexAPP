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
      <View style={styles.left}>
        {(back !== null || backIcon) && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBack}
          >
            {renderBackIcon()}
            {back && <Text style={styles.backText}>{back}</Text>}
          </TouchableOpacity>
        )}
        {left}
      </View>

      <View style={styles.title}>
        {typeof children === 'string' ? (
          <Text style={styles.titleText}>{children}</Text>
        ) : (
          children
        )}
      </View>

      <View style={styles.right}>
        <Text style={styles.rightText}>{right}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  backText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.9)',
    marginLeft: 4,
  },
  title: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.4)',
  }
});

export default NavBar;
