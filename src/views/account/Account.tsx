import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './auth/Login'
import Register from './auth/Register';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../models/User';
import { AuthContext } from '../../context/AuthContext';
import SignInBottomSheet from '../../components/BottomSheet/SignInBottomSheet';
import GetAccountApi from '../../hook/AccountApi';
import { AxiosContext } from '../../context/AxiosContext';
import { LogBox } from 'react-native';

import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../../theme/theme';
import Spinner from '../../components/Spinner/Spinner';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
const AccountNavigator = createNativeStackNavigator();

function Account() {

    return (
        <AccountNavigator.Navigator initialRouteName='MainScreen'>
            <AccountNavigator.Screen name="MainScreen" component={AccountMainPage}
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: 'white',
                    headerShown: false,

                }}></AccountNavigator.Screen>
        </AccountNavigator.Navigator>
    );
}

const AccountMainPage = ({ navigation }: { navigation: any }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const { authState, getUserData, setUserData } = useContext(AuthContext);
    const { authAxios } = useContext(AxiosContext);
    const [isShownBottomSheet, setShowBottomSheet] = useState(false);
    const toggleBottomSheet = () => {
        setShowBottomSheet(!isShownBottomSheet);
    }

    useEffect(() => {
        if (getUserData()) {
            const fetchUserData = async () => {
                try {
                    setIsLoading(true);
                    const newUserData = await GetAccountApi(authAxios, getUserData().id, authState.accessToken);
                    setUser(newUserData);
                    setUserData(newUserData);
                    console.log('call user when user changes in account page:', newUserData);
                } catch (error) {
                    // Handle any errors that might occur during the async operation
                    console.error('Error fetching user data:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUserData(); // Call the async function
        }
        else {
            console.log('user is not authorized')
            setUserData(null);
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const userData = getUserData();
        setUser(userData);
        console.log('call user when user change', user)
    }, [user, getUserData]); // Cập nhật khi có sự thay đổi cua

    function handleNavigate(path: string) {
        console.log(path);
        switch (path) {
            case 'EmailBox':
                {
                    navigation.navigate('EmailBox');
                    break;
                }
            case 'PaymentHistory':
                {
                    navigation.navigate('PaymentHistory');
                    break;
                }
            case 'FAQ':
                {
                    navigation.navigate('FAQ');
                    break;
                }

        }
    }
    const handleCoinExchange = () => {
        if (user) {
            navigation.navigate('CoinExchange');
        } else {
            toggleBottomSheet();
        }
    }

    return (
        <View>
            <Spinner visible={isLoading}/>
            <ScrollView>
                {/* <Header></Header> */}
                <View style={styles.container}>
                    <View style={styles.icon_container}>
                        <TouchableOpacity>
                            <Icon name='mail' size={25} color={'gray'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('SettingAccount')
                        }}>
                            <Icon name='settings' size={25} color={'gray'} />
                        </TouchableOpacity>
                    </View>
                    {user ? (
                        <View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Profile');
                            }}>
                                <View style={styles.avatar_container}>
                                    {user.imagesURL ? (
                                        <Image source={{ uri: user.imagesURL }} style={styles.avatar} />
                                    ) :
                                        (<Image source={require('../../assets/img/avt1.jpg')} style={styles.avatar} />)
                                    }
                                    <Text style={styles.username}>{user?.nickName || user?.username}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>) :
                        (<View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Login');
                            }}>
                                <View style={styles.avatar_container}>
                                    <Image source={require('../../assets/img/avt1.jpg')} style={styles.avatar} />
                                    <Text style={styles.username}>Bấm để đăng nhập</Text>
                                </View>
                            </TouchableOpacity>
                        </View>)
                    }
                    <View style={styles.allIn4container}>
                        <View style={styles.inforContainer}>
                            <View style={styles.coinRow}>
                                <View style={styles.inforColumn}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../assets/icons/coin_icon.png')} style={{ width: 30, height: 30 }} />
                                        <Text style={styles.coinText}>Coins balance</Text>
                                    </View>

                                    <Text style={styles.inforText}>{user ? user.walletAmmount : '-'}</Text>
                                </View>
                                <View style={styles.inforColumn}>

                                    <TouchableOpacity onPress={() => {
                                        handleCoinExchange();
                                    }}>
                                        <LinearGradient colors={['#EADEDB', '#BC70A4', '#BFD641']} start={{ x: 0.0, y: 0.0 }}
                                            end={{ x: 1.0, y: 1.0 }}
                                            locations={[0.0, 0.5, 0.75]} style={styles.CoinExBtn}>
                                            <Text style={{ color: 'black', fontSize: 17 }}>Top Up</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={styles.inforRow}>
                                <View style={styles.inforColumn}>
                                    <Text style={styles.inforText}>{user ? 0 : '-'}</Text>
                                    <Text style={styles.textItem}>Votes</Text>
                                </View>
                                <View style={styles.inforColumn}>
                                    <Text style={styles.inforText}>{user ? 0 : '-'}</Text>
                                    <Text style={styles.textItem}>Points</Text>
                                </View>
                                <View style={styles.inforColumn}>
                                    <Text style={styles.inforText}>{user ? 0 : '-'}</Text>
                                    <Text style={styles.textItem}>Vouchers</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.userContainer}>
                            <TouchableOpacity onPress={() => handleNavigate('EmailBox')}>
                                <View style={styles.row4User}>
                                    <Icon style={styles.iconItem} name='email' size={30} />
                                    <Text style={styles.textItem}>Inbox</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                handleNavigate('PaymentHistory')
                            }}>
                                <View style={styles.row4User}>
                                    <Icon style={styles.iconItem} name='shopping-cart' size={30} />
                                    <Text style={styles.textItem}>Purchase History</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.row4User}>
                                <Icon style={styles.iconItem} name='try' size={30} />
                                <Text style={styles.textItem} >Redeem</Text>
                            </View>
                        </View>
                        {/* Row 2 */}
                        <View style={styles.userContainer}>

                            <View style={styles.row4User}>
                                <Icon style={styles.iconItem} name='question-answer' size={30} />
                                <Text style={styles.textItem} >Forum</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                handleNavigate('FAQ')
                            }}>
                                <View style={styles.row4User}>
                                    <Icon style={styles.iconItem} name='question-mark' size={30} />
                                    <Text style={styles.textItem}>FAQ</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.row4User}>
                                <Icon style={styles.iconItem} name='quickreply' size={30} />
                                <Text style={styles.textItem}>Customer online service</Text>
                            </View>
                        </View>

                    </View>

                </View>
            </ScrollView >
            <SignInBottomSheet isVisible={isShownBottomSheet} onClose={toggleBottomSheet} />
        </View >
    );
}

const mySelection = () => {

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    icon_container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    avatar_container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    avatar: {
        width: 50, // Điều chỉnh kích thước hình tròn ở đây
        height: 50, // Điều chỉnh kích thước hình tròn ở đây
        borderRadius: 50, // Để làm cho nó hình tròn
        backgroundColor: 'lightgrey', // Đổi màu nền nếu cần
        alignItems: 'center',
        justifyContent: 'center',
    },
    username: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },

    //All infor container:
    allIn4container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inforContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 25,
        flexDirection: 'column',
        justifyContents: 'center',
        width: '95%',
        margin: 5,
        alignItems: 'stretch'// độ height phụ thuộc vào content
    },
    coinRow: {
        flexDirection: 'row',
        justifyContents: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        // height: '50%',
    },
    CoinExBtn: {
        height: '70%',
        width: 100,
        // backgroundColor: '#1fc8db',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inforRow: {
        margin: 10,
        flexDirection: 'row',
        justifyContents: 'center',
        alignItem: 'center',
        // height: 70,
    },
    inforColumn: {
        flex: 1,
        justifyContents: 'center',
        alignItems: 'center',
        height: 100,
    },
    inforText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
    ,
    userContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 25,
        flexDirection: 'column',
        // justifyContents: 'center',
        // alignItems:center,
        width: '95%',
        margin: 5,

    },
    row4User: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: 50,
        margin: 10,
    },
    iconItem: {
        color: COLORS.primaryBlackHex,
        // fontSize: FONTSIZE.size_18,
    },
    textItem: {
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_18,
        // fontWeight:'500',
        marginLeft: SPACING.space_10,
    },
    coinText: {
        color: COLORS.coinTextHex,
        fontSize: FONTSIZE.size_18,
    }
});


export default Account;
