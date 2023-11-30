import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const BookmarkEditBS= ({ isVisible, onClose }: any) => {
    const navigation = useNavigation();
    const handleEdit = () => {
        navigation.navigate('BookmarkEdit');
    }
    useEffect(() => {

    })
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.bottomModal}
            backdropOpacity={0.5}
        >
            <View style={styles.modalContent}>
                <TouchableOpacity onPress={handleEdit} style={styles.editContainer}>
                    <Icon name='pencil' size={20} />
                    <Text style={styles.bodyText}>Biên tập</Text>
                </TouchableOpacity>

                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => {

                    }} style={styles.selectItem}>
                        <View style={styles.selectItemContent}>
                            <Image style={styles.googleBtnImage} source={require('../../assets/logo/google.png')} />
                            <Text style={styles.googleText}>Dạng lưới</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {

                    }} style={styles.selectItem}>
                        <View style={styles.selectItemContent}>
                            <Image style={styles.googleBtnImage} source={require('../../assets/logo/google.png')} />
                            <Text style={styles.googleText}>Dạng danh sách</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

export default BookmarkEditBS

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#EBEBEB',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    closeButton: {
        marginTop: 10,
        color: 'blue',
        fontSize: 18,
    }, editContainer: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 10,
    }
    , titleText: {
        fontSize: 22,
        fontWeight: 'bold',
    }, bodyText: {
        fontSize: 18,
    },
    selectItem: {
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        flex: 0.48,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    selectItemContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleBtn: {
        // width: '70%',
        width: '80%', // Adjusted width
        height: 50, // Adjusted height
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        color: 'black'
    },
    googleBtnImage: {
        marginLeft: 10,
        width: 30,
        height: 30,
    },
    googleText: {
        marginLeft: 40,
        color: "black",
        fontSize: 18,
        fontWeight: 'bold',
    },
    facebookBtn: {
        width: '80%',
        height: 50, // Adjusted height
        backgroundColor: "#3b5998",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 10,
    },
    facebookIcon: {
        marginLeft: 10,
    },
    facebookText: {
        marginLeft: 40,
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    },
    roundButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        marginTop: 60,
    },
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: 'gray', // Change the background color as needed
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },

    zaloRoundBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    roundButtonImage: {
        width: 50, // Adjust the width and height to fit the round button
        height: 50, // Adjust the width and height to fit the round button
        borderRadius: 50,
    },
    lineRoundBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    twitterRoundBtn: {
        width: 50, // Adjust the width and height to fit the round button
        height: 50, // Adjust the width and height to fit the round button
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1da1f2',
    }
    , createAccountText: {
        color: 'black',
        marginTop: 20,
        fontSize: 18,
    }
});
