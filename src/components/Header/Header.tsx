import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
const Header = () => {
    const navigation = useNavigation();
    return (

        <View style={styles.header}>
            <TouchableOpacity onPress={
                () => { navigation.navigate('Welcome') }
            }>
                <Image source={require('../../assets/img/TTQBA.png')} style={styles.logo} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.searchContainer} onPress={
                () => { navigation.navigate('Search') }
            }>
                <View style={styles.searchInnerContainer}>
                    <Icon name="search" size={24} color="black" />
                    <Text style={styles.searchInput}>Search for novels</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingButton}>
                <Icon name="settings" size={24} color="black"></Icon>
            </TouchableOpacity>
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
        flex: 1,
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 50,
        padding: 15,
        marginLeft: 10,
    },
    searchInnerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        marginLeft: 5,
        textAlignVertical: 'center',
    },
    settingButton: {
        width: 40,
        // flex:1,
        right: 0,
        alignItems: 'center',
    }
});
export default Header