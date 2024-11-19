import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const HomeQuickMenu = () => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuButton}>
        <Image 
          source={require('../../../assets/GettingStarted.png')} 
          style={styles.menuIcon} 
        />
        <Text style={styles.menuText}>新手入门</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Image 
          source={require('../../../assets/FAQ.png')} 
          style={styles.menuIcon} 
        />
        <Text style={styles.menuText}>常见问题</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Image 
          source={require('../../../assets/ReferralRewards.png')} 
          style={styles.menuIcon} 
        />
        <Text style={styles.menuText}>推荐奖励</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Image 
          source={require('../../../assets/Recharge.png')} 
          style={styles.menuIcon} 
        />
        <Text style={styles.menuText}>充值</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  menuButton: {
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  menuText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default HomeQuickMenu;