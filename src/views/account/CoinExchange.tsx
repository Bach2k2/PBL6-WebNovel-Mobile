import * as React from 'react';
import { Alert, Text, View, StyleSheet, Image, Touchable, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'react-native-linear-gradient';
import { createOrderApi, createPaymentApi, getBundlesApi } from '../../hook/PaymentApi';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../models/User';
import { Linking } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Spinner from '../../components/Spinner/Spinner';
import { Bundle } from '../../models/Bundle';
// import Hyperlink from 'react-native-hyperlink'

export default function CoinExchange({ navigation }: any) {
    // const data = [
    //     { coin: 50, money: '24000.0' },
    //     { coin: 250, money: '122000.0' },
    //     { coin: 500, money: '244000.0' },
    //     { coin: 1000, money: '489000.0' },
    //     { coin: 2500, money: '12000000.0' },
    //     { coin: 5000, money: '2450000.0' },
    // ];
    const [loading, setLoading] = React.useState(true);
    const [bundles, setBundles] = React.useState<Bundle[]>([]);
    const [user, setUser] = React.useState<User | null>();
    const { authState, getUserData } = React.useContext(AuthContext);
    React.useEffect(() => {
        setUser(getUserData())
    });
    React.useEffect(() => {
        const fetchBundles = async () => {
            const data = await getBundlesApi();
            setBundles(data);
            setLoading(false);
            // console.log(data);
        }
        fetchBundles();
    }, []);


    const redirectToVNPAY = async (vnpayPaymentUrl: string) => {
        // Alert.alert(`Don't know how to open this URL: ${vnpayPaymentUrl}`);
        try {
            // const url = 'https://expo.dev'
            // const supported = await Linking.canOpenURL(url);

            // if (supported) {
            await Linking.openURL(vnpayPaymentUrl);
            // } else {
            //     Alert.alert(`Don't know how to open this URL: ${url}`);
            //     // console.error(`Don't know how to open this URL: ${url}`);
            // }
        } catch (error) {
            console.error("Error opening the VNPAY payment URL: ", error);
        }
    };

    // const handleBuyCoin = async (bundle: any) => {
    //     const res = await createOrderApi(user?.id, bundle, authState.accessToken)
    //     console.log(res.data);
    //     const paymentRes = await createPaymentApi(res.data.OrderId, res.data.Price, authState.accessToken)
    //     console.log(paymentRes);
    //     console.log(paymentRes.paymentUrl)
    //     redirectToVNPAY(paymentRes.paymentUrl)//
    //     console.log('hello');
    //     // Call handleDeepLink when the app is reopened
    //     handleDeepLink();
    // }

    // const handleDeepLink = async () => {
    //     try {
    //         const url = await Linking.getInitialURL();

    //         if (url) {
    //             console.log('Deep link URL:', url);
    //             // Add your logic here based on the deep link URL
    //         }
    //         else {
    //             console.log('Nothing ');
    //         }
    //     } catch (error) {
    //         console.error("Error handling deep link: ", error);
    //     }
    // };

    React.useEffect(() => {
        const doWait = () => {
            Linking.getInitialURL().then(ev => {
                console.warn(ev)
            })
        };
        Linking.addEventListener('url', doWait);
        return () => Linking.removeAllListeners('url');
    }, [navigation])

    // if(loading){
    //     return (
    //         <ActivityIndicator size={'large'} color='black'/>
    //     );
    // }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Spinner visible={loading} />
            <View style={styles.container}>
                <ScrollView>
                    <View style={[styles.row, { marginTop: 10 }]}>
                        <Text style={styles.header}>Top Up</Text>
                        <Text style={styles.subheader}>Unit: VND</Text>
                    </View>
                    <LinearGradient
                        colors={['#3f5efb', '#fc466b']}
                        style={styles.discountContainer}>
                        <View style={styles.row}>
                            <Text style={{ color: 'yellow' }}>Month</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Image source={require('../../assets/icons/coin_icon.png')} style={{ width: 50, height: 50 }} />
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ color: 'white' }}>250</Text>
                                    <Text style={{ color: 'yellow' }}>+156 Bonus</Text>
                                </View>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Text style={{ color: 'black' }}>89000.0</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </LinearGradient>
                    {/* Row1 - but use loop */}
                    {
                        bundles.map((bundle, index) => (
                            <Pressable key={index} onPress={() => {
                                // handleBuyCoin(bundle);
                                navigation.navigate("PaymentScreen", { bundle: bundle })
                            }}>
                                <View >
                                    <View key={index} style={styles.row}>
                                        <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Image source={require('../../assets/icons/coin_icon.png')} style={{ width: 50, height: 50 }} />
                                            </View>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: 'black', fontSize: 18 }}>{bundle.coinAmount}</Text>
                                                <Text style={{ color: 'green' }}>+156 Bonus</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                                <TouchableOpacity style={{ flex: 1, margin: 10, justifyContent: 'center', backgroundColor: 'green', borderRadius: 5, marginRight: 0 }} onPress={() => { }}>
                                                    <Text style={{ color: 'white', fontWeight: '500' }}> {bundle.price}.000 </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 10, marginBottom: 10, width: '90%', backgroundColor: 'gray', height: 1, alignSelf: 'center' }}>
                                    </View>
                                </View>
                            </Pressable>
                        ))
                    }
                    <View style={styles.row}>
                        <Text>Rules</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>1. Purchased Coins don't be expire, are non-transferrable, and can be used for various reading services</Text>

                    </View>
                    <View style={[styles.row, { marginBottom: 15 }]}>
                        <Text>2. Click here to manage your subscription</Text>
                    </View>
                    {/* <Hyperlink
                        linkStyle={{ color: '#2980b9', fontSize: 20 }}
                        linkText={url => url === 'https://www.facebook.com/' ? 'Hyperlink' : url}
                    >
                        <Text style={{ fontSize: 15 }}>
                            Make clickable strings cleaner with https://www.facebook.com/
                        </Text>
                    </Hyperlink> */}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderRadius: 10,
        margin: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    row: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginLeft: 15,
        marginTop: 10,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        marginBottom: 5,
    },
    subheader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray',
        marginTop: 10,
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
    },

    //discount container:
    discountContainer: {
        width: '90%', borderRadius: 10, height: 150, alignSelf: 'center', marginTop: 10, marginBottom: 10
    }
});



