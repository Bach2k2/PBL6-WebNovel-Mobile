import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


const Welcome = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    useEffect(() => {

        setTimeout(() => {
            // setLoading(false);
            navigation.navigate('Home');
        }, 4000);
    },);
    // if (loading) {
    //     return (
    //         <SafeAreaView style={styles.container} >
    //             <ActivityIndicator />
    //         </SafeAreaView>
    //     )
    // }
    return (
        <SafeAreaView style={styles.container} >
            <ImageBackground style={styles.container} source={require('../../assets/background/bg_welcome.jpg')}>
                <Image source={require('../../assets/img/logo-login.png')} style={styles.image} />
                <View style={styles.bottom}>
                    <View style={styles.btn}>
                        <Button title='Explore' onPress={() => { navigation.navigate('Home') }} />
                    </View>

                    <Text style={styles.madeByText}>Made by TTQBA devs</Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: '100%',
    },
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }
    , image: {
        width: 300, height: 300,
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
    },
    btn: {
        marginBottom: 10,
    },
    madeByText: {
        fontSize: 16,
        color: '#555',
    }
})