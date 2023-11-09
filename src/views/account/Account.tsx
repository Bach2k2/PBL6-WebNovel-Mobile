import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login'
import Register from './Register';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../models/User';
import { AuthContext } from '../../context/AuthContext';
const AccountNavigator = createNativeStackNavigator();


type ParamList = {
    MainScreen: undefined;
    Login: undefined
    Register: undefined;
};
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
    const [user, setUserData] = useState<User>();
    const { getUserData } = useContext(AuthContext);
    const userData = getUserData();
    console.log("userData: " + userData);
    return (
        <View>
            <ScrollView>
                {/* <Header></Header> */}
                <View style={styles.container}>
                    <View style={styles.icon_container}>
                        <Icon name='mail' size={20} color={'gray'} />
                        <Icon name='settings' size={20} color={'gray'} />
                    </View>
                    {
                        userData ?
                            (
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Profile');
                                    }}>
                                        <View style={styles.avatar_container}>
                                            <Image source={require('../../assets/img/avt1.jpg')} style={styles.avatar} />
                                            <Text style={styles.username}>Nam Truong</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ) :
                            (<View>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Login');
                                }}>
                                    <View style={styles.avatar_container}>
                                        <Image source={require('../../assets/img/avt1.jpg')} style={styles.avatar} />
                                        <Text style={styles.username}>Bấm để đăng nhập</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            )
                    }


                    <View style={styles.infor_container}>
                        <View style={styles.coinRow}>
                            <View style={styles.infor_column}>
                                <Text>Số dư coins</Text>
                                <Text style={styles.infor_text}>-</Text>
                            </View>
                            <View style={styles.infor_column}>

                                <TouchableOpacity onPress={() => {
                                    {
                                        user ?
                                            navigation.navigate('CoinExchange')
                                            : navigation.navigate('CoinExchange')
                                    }
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
                                <Text style={styles.infor_text}>-</Text>
                                <Text>Xu của tôi</Text>
                            </View>
                            <View style={styles.infor_column}>
                                <Text style={styles.infor_text}>-</Text>
                                <Text>Điểm của tôi</Text>
                            </View>
                            <View style={styles.infor_column}>
                                <Text style={styles.infor_text}>-</Text>
                                <Text>Phiếu</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.infor_container}>
                        <View style={styles.infor_row}>
                            <Icon name='email' size={30} />
                            <Text>Hộp thư đến</Text>
                        </View>
                        <View style={styles.infor_row}>
                            <Icon name='email' size={30} />
                            <Text>Thiết bị của tôi</Text>
                        </View>
                        <View style={styles.infor_row}>
                            <Icon name='email' size={30} />
                            <Text>Ưu đãi</Text>
                        </View>
                        <View style={styles.infor_row}>
                            <Icon name='email' size={30} />
                            <Text>Lịch sử tiêu dùng</Text>
                        </View>
                    </View>

                    <View style={styles.infor_container}>
                        <View style={styles.infor_row}>
                            <Icon name='email' size={30} />
                            <Text>Quy đổi</Text>
                        </View>
                        <View style={styles.infor_row}>
                            <Icon name='email' size={30} />
                            <Text>Diễn đàn</Text>
                        </View>
                        <View style={styles.infor_row}>
                            <Icon name='email' size={30} />
                            <Text>Câu hỏi thường gặp</Text>
                        </View>
                        <View style={styles.infor_row}>
                            <Icon name='email' size={30} />
                            <Text>Dịch vụ khách hàng trực tuyến</Text>
                        </View>
                    </View>
                </View>
            </ScrollView >
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

    infor_container: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 25,
        flexDirection: 'column',
        justifyContents: 'center',
        width: '100%',
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
        justifyContents: 'space-between',
        alignItem: 'stretch',
        // height: 70,
    },
    infor_column: {
        flex: 1,
        justifyContents: 'space-between',
        alignItems: 'center',
        height: 60,
    },
    infor_text: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

const stylesSelection = StyleSheet.create({
});
export default Account;
