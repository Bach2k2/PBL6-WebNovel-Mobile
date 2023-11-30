import * as React from 'react';
import { Text, View, StyleSheet, Image, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'react-native-linear-gradient';

export default function CoinExchange() {
    const data = [
        { coin: 50, money: '24000.0' },
        { coin: 250, money: '122000.0' },
        { coin: 500, money: '244000.0' },
        { coin: 1000, money: '489000.0' },
        { coin: 2500, money: '12000000.0' },
        { coin: 5000, money: '2450000.0' },
    ];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

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
                        data.map((level, index) => (
                            <View key={index}>
                                <View key={index} style={styles.row}>
                                    <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Image source={require('../../assets/icons/coin_icon.png')} style={{ width: 50, height: 50 }} />
                                        </View>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ color: 'black', fontSize: 18 }}>{level.coin}</Text>
                                            <Text style={{ color: 'green' }}>+156 Bonus</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: 'column', flex: 1 }}>
                                            <TouchableOpacity style={{ flex: 1, margin: 10, justifyContent: 'center', backgroundColor: 'green', borderRadius: 5, marginRight: 0 }} onPress={() => { }}>
                                                <Text style={{ color: 'white', fontWeight: '500' }}> {level.money} </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                                <View style={{ marginTop: 10, marginBottom: 10, width: '90%', backgroundColor: 'gray', height: 1, alignSelf: 'center' }}>
                                </View>
                            </View>
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



