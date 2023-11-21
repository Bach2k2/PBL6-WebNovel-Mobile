import { MaterialTopTabBarProps, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomTabBar } from '../../../components/TabView/CustomTabBar';

//import CustomTabBar from './customTabBar';

const TabNav = createMaterialTopTabNavigator();

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text>This is Sign Up</Text>
    </View>
  );
}

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text>This is Sign Up</Text>
    </View>
  );
}

const CustomTabBarNew = () => (
  <TabNav.Navigator
    sceneContainerStyle={styles.sceneContainerStyle}
    style={styles.tabNavStyle}
    tabBar={CustomTabBar}
  >
    <TabNav.Screen
      component={SignUp}
      name={'Sing Up'}
      options={{ title: 'Sing Up' }}
    />
    <TabNav.Screen
      component={SignIn}
      name={'Sign In'}
      options={{ title: 'Sign In' }}
    />
  </TabNav.Navigator>
);

const styles = StyleSheet.create({
  tabNavStyle: {
    minHeight: 500,
    marginTop: 21,
  },
  sceneContainerStyle: { backgroundColor: 'white' },
  container: { flex: 1, alignSelf: 'center' },
  tabcontainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tab: {
    justifyContent: 'center',
    height: 50,
  },
  tabText: {
    textAlign: 'center',
    color: '#707070',
    paddingBottom: 2,
  },
  activeText: {
    color: '#424242',
    fontSize: 14,
  },
  inactiveText: {
    color: '#707070',
    fontSize: 14,
  },
  selectedTab: {
    height: 4,
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#434343',
    bottom: 0,
  },
});
export default CustomTabBarNew;