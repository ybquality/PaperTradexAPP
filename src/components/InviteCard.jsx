import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const InviteCard = ({ onPress }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image 
          source={require('../../assets/Vector.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.leftContent}>
          <Text style={styles.title}>邀请返佣</Text>
          <Text style={styles.description}>邀请好友，享高90%反佣</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>立即邀请</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightContent}>
          <Image 
            source={require('../../assets/img/coin.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'visible',
    marginTop: 16,
  },
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    position: 'relative',
    height: 88,
    overflow: 'visible',
    backgroundColor: '#f3f3f3',
  },
  leftContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    zIndex: 2,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  description: {
    fontSize: 10,
    fontWeight: '500',
    color: '#666',
  },
  rightContent: {
    position: 'absolute',
    right: 5,
    top: -25,
    zIndex: 1,
    overflow: 'visible',
  },
  icon: {
    width: 108,
    height: 100,
  },
  button: {
    backgroundColor: '#000',
    width: 64,
    height: 21,
    borderRadius: 32,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default InviteCard;