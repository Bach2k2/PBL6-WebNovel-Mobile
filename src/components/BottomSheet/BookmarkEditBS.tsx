import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const BookmarkEditBS = ({ isVisible, onClose }: any) => {
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
                        <View style={[styles.selectItemContent,{alignSelf:'center'}]}>
                            <Icon name='view-grid-outline' size={25} color={'#333'} />
                            <Text style={styles.itemText}>Grid</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {

                    }} style={styles.selectItem}>
                        <View style={styles.selectItemContent}>
                            <Icon name='view-list-outline' size={25} color={'#333'} />
                            <Text style={styles.itemText}>List</Text>
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
        flex:1,
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
    itemText: {
        color: "black",
        fontSize: 18,
        fontWeight: 'bold',
    },

});
