import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CoinExchange() {
    const data=[
        {}
    ];
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'black',justifyContent:'center',alignItems:'center'}}>
            <View style={styles.container} >
                <View style={styles.row}>
                    <Text style={styles.header}>Nạp tiền</Text>
                    <Text style={styles.subheader}>Đơn vị: VND</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        margin: 10,
        marginRight: 10,
        marginBottom: 0,
    },
    row: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        margin: 15
    },
    header: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    subheader: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'gray',
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


