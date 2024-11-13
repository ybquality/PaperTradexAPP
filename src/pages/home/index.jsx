import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from 'react-native';
import CustomTopNavBar from '../../components/TopNavBar';

const HomeStack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <CustomTopNavBar/>
    </View>
  );
};

const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <HomeStack.Screen name="Home" component={HomeScreen} />
      </HomeStack.Navigator>
    );
  };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default HomeStackScreen;