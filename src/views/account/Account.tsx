import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './auth/Login'
import Register from './auth/Register';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../models/User';
import { AuthContext } from '../../context/AuthContext';
import SignInBottomSheet from '../../components/BottomSheet/SignInBottomSheet';
const AccountNavigator = createNativeStackNavigator();

function Account() {
    const navigation = useNavigation();

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
    const [user, setUserData] = useState<User | null>(null);
    const { getUserData } = useContext(AuthContext);
    const [isShownBottomSheet, setShowBottomSheet] = useState(false);
    const toggleBottomSheet = () => {
        setShowBottomSheet(!isShownBottomSheet);
    }


    useEffect(() => {
        setUserData(getUserData());
        console.log('call user when user change', user)
    }, [user, getUserData]); // Cập nhật khi có sự thay đổi cua

    function handleNavigate(path: string) {
        console.log(path);
        switch (path) {
            case 'EmailBox':
                {
                    navigation.navigate('EmailBox');
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
            <ScrollView>
                {/* <Header></Header> */}
                <View style={styles.container}>
                    <View style={styles.icon_container}>
                        <TouchableOpacity>
                            <Icon name='mail' size={20} color={'gray'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('SettingAccount')
                        }}>
                            <Icon name='settings' size={20} color={'gray'} />
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
                                    <Text style={styles.username}>{user?.username}</Text>
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
                        <View style={styles.infor_container}>
                            <View style={styles.coinRow}>
                                <View style={styles.infor_column}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../../assets/icons/coin_icon.png')} style={{ width: 25, height: 25 }} />
                                        <Text style={styles.textItem}>Số dư coins</Text>
                                    </View>

                                    <Text style={styles.infor_text}>{user ? user.walletAmmount : '-'}</Text>
                                </View>
                                <View style={styles.infor_column}>

                                    <TouchableOpacity onPress={() => {
                                        handleCoinExchange();
                                    }}>
                                        <LinearGradient colors={['#EADEDB', '#BC70A4', '#BFD641']} start={{ x: 0.0, y: 0.0 }}
                                            end={{ x: 1.0, y: 1.0 }}
                                            locations={[0.0, 0.5, 0.75]} style={styles.CoinExBtn}>
                                            <Text style={{ color: 'black', fontSize: 17 }}>Nạp tiền</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={styles.infor_row}>
                                <View style={styles.infor_column}>
                                    <Text style={styles.infor_text}>{user ? 0 : '-'}</Text>
                                    <Text style={styles.textItem}>Phiếu đọc sách</Text>
                                </View>
                                <View style={styles.infor_column}>
                                    <Text style={styles.infor_text}>{user ? 0 : '-'}</Text>
                                    <Text style={styles.textItem}>Điểm của tôi</Text>
                                </View>
                                <View style={styles.infor_column}>
                                    <Text style={styles.infor_text}>{user ? 0 : '-'}</Text>
                                    <Text style={styles.textItem}>Phiếu</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.userContainer}>
                            <TouchableOpacity onPress={() => handleNavigate('EmailBox')}>
                                <View style={styles.row4User}>
                                    <Icon style={styles.iconItem} name='email' size={30} />
                                    <Text style={styles.textItem} >Hộp thư đến</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.row4User}>
                                <Icon style={styles.iconItem} name='dock' size={30} />
                                <Text style={styles.textItem} >Thiết bị của tôi</Text>
                            </View>
                            <View style={styles.row4User}>
                                <Icon style={styles.iconItem} name='discount' size={30} />
                                <Text style={styles.textItem} >Ưu đãi</Text>
                            </View>
                            <View style={styles.row4User}>
                                <Icon style={styles.iconItem} name='shopping-cart' size={30} />
                                <Text style={styles.textItem} >Lịch sử tiêu dùng</Text>
                            </View>
                        </View>
                        {/* Row 2 */}
                        <View style={styles.userContainer}>
                            <View style={styles.row4User}>
                                <Icon style={styles.iconItem} name='try' size={30} />
                                <Text style={styles.textItem} >Quy đổi</Text>
                            </View>
                            <View style={styles.row4User}>
                                <Icon style={styles.iconItem} name='question-answer' size={30} />
                                <Text style={styles.textItem} >Diễn đàn</Text>
                            </View>
                            <View style={styles.row4User}>
                                <Icon style={styles.iconItem} name='question-mark' size={30} />
                                <Text style={styles.textItem} >Câu hỏi thường gặp</Text>
                            </View>
                            <View style={styles.row4User}>
                                <Icon style={styles.iconItem} name='quickreply' size={30} />
                                <Text style={styles.textItem} >Dịch vụ khách hàng trực tuyến</Text>
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

    infor_container: {
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
        justifyContents: 'space-between',
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
    infor_row: {
        margin: 10,
        flexDirection: 'row',
        justifyContents: 'center',
        alignItem: 'center',
        // height: 70,
    },
    infor_column: {
        flex: 1,
        justifyContents: 'center',
        alignItems: 'center',
        height: 100,
    },
    infor_text: {
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

    },
    textItem: {
        marginLeft: 10,
        color: '#080808',
        fontSize: 15
    }
});

const stylesSelection = StyleSheet.create({
});
export default Account;
