import React from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
const Header = () => {
    return (
        <View>
            <View style={styles.header}>
                <Image source={require('../../assets/img/TTQBA.png')} style={styles.logo}></Image>
                <View style={styles.searchContainer}>
                    <Icon name="search" size={24} color="black" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tác giả/ Tác phẩm"
                        placeholderTextColor="gray"
                    />
                </View>
                <TouchableOpacity style={styles.settingButton}>
                    <Icon name="settings" size={24} color="black"></Icon>
                </TouchableOpacity>
            </View>
            {/* <View style={{ marginLeft: 20 }}>
                <Text>Novels</Text>
            </View> */}
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        // position: 'sticky', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 50,
        padding: 5
    },
    searchInput: {
        flex: 1,
        marginLeft: 5
    },
    settingButton: {
        width: '15%',
        alignItems: 'center',
    }
});  
export default Header