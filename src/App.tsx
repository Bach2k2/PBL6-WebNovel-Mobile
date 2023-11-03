import React, { useState } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import HomeTabs from './views/home/HomeTabs';
import Login from './views/account/Login';
import Register from './views/account/Register';
import CoinExchange from './views/account/CoinExchange';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeTabs} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="CoinExchange" component={CoinExchange} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}



export default App;
