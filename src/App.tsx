import React, { useState } from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import HomeTabs from './views/home/HomeTabs';
import Login from './views/account/auth/Login';
import Register from './views/account/auth/Register';
import CoinExchange from './views/account/CoinExchange';
import LoginByEmail from './views/account/auth/LoginByEmail';

import { AuthContext, AuthProvider } from './context/AuthContext';
import Profile from './views/account/Profile';
import Reading from './views/reading/Reading';
import NovelDetail from './views/novelDetail/NovelDetail';
import ChapterDetail from './views/novelDetail/ChapterDetail';
import ChapterList from './views/novelDetail/ChapterList';
import EditProfile from './views/account/EditProfile';
import SettingAccount from './views/account/SettingAccount';
import SkeletonComponent from './components/Loading/SkeletonComponent';
import CreateNovel from './views/writenovel/CreateNovel';
import Toast from 'react-native-toast-message'
// import UserNovelDetailForme from './views/writenovel/__test__/UserNovelDetailForme';
import MailBox from './views/account/MailBox';
import UserNovelDetail from './views/writenovel/UserNovelDetail';
import Welcome from './views/home/Welcome';
import PreferenceEdit from './views/reading/PreferenceEdit';
import BookmarkEdit from './views/reading/BookmarkEdit';
import CreateChapter from './views/writenovel/Chapter/CreateChapter';
import Search from './views/home/Search';
import EditChapter from './views/writenovel/Chapter/EditChapter';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeTabs} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Search" component={Search} options={{
            headerShown: true,
          }} />

          <Stack.Screen name="NovelDetail" component={NovelDetail} options={({ route }: any) => ({ title: route.params.title })} />
          <Stack.Screen name="ChapterList" component={ChapterList} options={({ route }: any) => ({ title: 'Nội dung', headerTitleAlign: 'center' })} />
          <Stack.Screen name="ChapterDetail" component={ChapterDetail} options={({ route }: any) => ({ title: route.params.title })} />
          <Stack.Screen name="CreateNovel" component={CreateNovel} options={({ route }: any) => ({ title: 'Add new novel', headerTitleAlign: 'center' })} />
          <Stack.Screen name="UserNovelDetail" component={UserNovelDetail} />
          {/* Chapter */}
          <Stack.Screen name="CreateChapter" component={CreateChapter} />
          <Stack.Screen name="EditChapter" component={EditChapter} />

          {/* Account */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="CoinExchange" component={CoinExchange} options={({ route }: any) => ({ title: 'Top Up', headerTitleAlign: 'center' })} />
          <Stack.Screen name="LoginByEmail" component={LoginByEmail} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerTitle: 'Chỉnh sửa hồ sơ' }} />
          <Stack.Screen name="SettingAccount" component={SettingAccount} />
          <Stack.Screen name="EmailBox" component={MailBox} options={{ headerTitle: 'Hộp thư đến' }} />

          <Stack.Screen name="PreferenceEdit" component={PreferenceEdit} options={
            ({ route }: any) => ({
              title: 'Edit library',
              headerTitleAlign: 'center',
            })
          } />
          <Stack.Screen name="BookmarkEdit" component={BookmarkEdit} options={
            ({ route }: any) => ({
              title: 'Edit history',
              headerTitleAlign: 'center',
            })
          } />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
