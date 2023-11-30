// import React, { useCallback, useContext, useState } from 'react';
// import { Button, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
// import Header from '../../components/Header/Header';
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import BookmarkNovels from './BookmarkNovels';
// import PreferenceNovels from './PreferenceNovels';
// import { AuthContext } from '../../context/AuthContext';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { CustomTabBar } from '../../components/TabView/CustomTabBar';
// import Modal from 'react-native-modal';
// import { CustomReadingTabBar } from '../../components/TabView/CustomReadingTabBar';
// import { Dimensions } from 'react-native';
// import CustomEditReading from '../../components/BottomSheet/PreferenceEditBS';
// import { useFocusEffect } from '@react-navigation/native';
// import getPreferenceData from '../../hook/PreferenceApi';
// import { Preference } from '../../models/Preference';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const TabNav = createMaterialTopTabNavigator();
// const height = Dimensions.get('window').height;
// function Reading({ navigation }: any) {

//     const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
//     const [activeScreen, setActiveScreen] = useState('Preferences'); // Track the active screen
//     const toggleBottomSheet = () => {
//         setBottomSheetVisible(!isBottomSheetVisible);
//     };

//     // adding preference Data:
//     const { authState, getUserData } = useContext(AuthContext);
//     const user = getUserData();
//     const [loading, setLoading] = useState(true);
//     const [isGrid, setIsGrid] = useState(true);
//     const [preferenceData, setPreferenceData] = useState<Preference[]>([]);
//     useFocusEffect(
//         useCallback(() => {
//             const fetchData = async () => {
//                 try {
//                     if (authState.authenticated) {
//                         console.log("call api preference");
//                         const data = await getPreferenceData(user, authState.accessToken);
//                         setPreferenceData(data);
//                         console.log(data); // Log the updated preferenceData
//                     } else {
//                         console.log("get preferList from AsyncStorage");
//                         const storedData = await AsyncStorage.getItem('preferList');
//                         if (storedData) {
//                             const parsedData = JSON.parse(storedData);
//                             setPreferenceData(parsedData); // add this array to understand
//                             console.log(parsedData.length);
//                         }
//                     }
//                 } catch (error) {
//                     console.error('Error fetching data:', error);
//                 }
//             };

//             fetchData();

//             return () => {
//                 // Cleanup or clear any subscriptions if needed
//             };
//         }, [authState.authenticated, user])
//     );


//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//             <View style={{ flex: 1, height: '100%' }}>
//                 <Header />
//                 <View style={{ flex: 1, flexDirection: 'row', }}>
//                     <TabNav.Navigator
//                         sceneContainerStyle={styles.sceneContainerStyle}
//                         style={styles.tabNavStyle}
//                         tabBar={CustomReadingTabBar}
//                     >
//                         <TabNav.Screen
//                             component={PreferenceNovels}
//                             name={'Preferences'}
//                             options={{ title: 'Tủ truyện' }}
//                         />
//                         <TabNav.Screen
//                             component={BookmarkNovels}
//                             name={'Bookmark'}
//                             options={{
//                                 title: 'Đã xem',

//                             }}
//                         />

//                     </TabNav.Navigator>
//                     {/* Toggle for edit */}
//                     <View style={{ position: 'absolute', right: 20, top: 15 }}>
//                         <TouchableOpacity onPress={toggleBottomSheet}>
//                             <Icon name='dots-horizontal' size={20} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//             </View>
//         </SafeAreaView>
//     );

// }

// export default Reading;


// const styles = StyleSheet.create({
//     tabNavStyle: {
//         // minHeight: 600,
//         maxHeight: '100%',
//         //   marginBottom:10,
//         // flex: 1,
//         backgroundColor: '#EBEBEB',
//         justifyContent: 'center',
//         alignSelf: 'center',
//         // alignItems:'center'
//     },
//     sceneContainerStyle: {
//         backgroundColor: '#FFFFFF',
//         borderRadius: 10,
//         height: '100%',
//         alignItems: 'center',
//     },
// }
// )
