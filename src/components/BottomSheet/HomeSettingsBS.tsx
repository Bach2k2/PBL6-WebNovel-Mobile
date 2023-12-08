import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import Modal from 'react-native-modal'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const HomeSettingsBS = ({ isVisible, onClose }: any) => {
    const navigation = useNavigation();
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.bottomModal}
            backdropOpacity={0.5}
        >
            <View style={styles.modalHeader}>
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle}></View>
                </View>
            </View>
            <View style={styles.modalContent}>
                <Text style={styles.titleText}>Preference</Text>
                <View style={styles.textContainer}>
                    <View style={{ margin: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='heart-outline' size={20} />
                            <Text style={styles.selectedText}>Reading Preference</Text>
                        </View>

                        <View style={styles.panelLine}>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='earth' size={20} />
                            <Text style={styles.selectedText}>Content language</Text>
                        </View>

                    </View>


                </View>

                <TouchableOpacity style={{backgroundColor:'#67F5DD', width:'100%',marginTop:10, borderRadius:10,justifyContent:'center', alignItems:'center'  }} onPress={onClose}>
                    <Text style={styles.closeButton}>Cancel</Text>
                </TouchableOpacity>
            </View >
        </Modal >
    );
};
export default HomeSettingsBS;

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,

    },
    modalHeader: {
        // backgroundColor: '#FFFFFF',
        backgroundColor: '#EBEBEB',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    modalContent: {
        // backgroundColor: 'white',
        backgroundColor: '#EBEBEB',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
    },
    closeButton: {
        // marginTop: 10,
        padding:10,
        color: '#333',
        fontSize: 18,
    }, panelLine: {
        width: '95%',
        height: 1,
        backgroundColor: '#EBEBEB',
        marginTop: 10,
        marginBottom: 10,
    }
    , textContainer: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        width: '97%',
        borderRadius: 15,
        marginTop: 5,
        padding: 10,
    }
    , titleText: {
        color: '#333',
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 'auto',
    }, bodyText: {
        fontSize: 18,
    },
    selectedText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '700',
        marginRight: 'auto',
        marginLeft: 10,
    }
});

