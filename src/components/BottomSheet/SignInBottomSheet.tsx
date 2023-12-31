import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import handleLoginByGG from '../../auth/handleLoginByGG';
import { AuthContext } from '../../context/AuthContext';

import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../../theme/theme';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const SignInBottomSheet = ({ isVisible, onClose }: any) => {

    const navigation = useNavigation();
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const handleLoginByEmail = () => {
        navigation.navigate('LoginByEmail');
        // console.log('handleLoginByEmail');
    }
    const loginByGG = async () => {
        try {
            const userData = handleLoginByGG(authContext)
            onClose();
            setTimeout(() => {
                setLoading(true);
                // navigation.navigate('Account');
                // navigation.goBack(); // Go back
            }, 5000);
        } catch (error) {
        }
    }
    
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
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Sign in/Register to continue</Text>
                    <Text style={styles.bodyText}>Sign in for exclusive perks: missions, rewards, and daily check-in bonuses</Text>
                </View>

                <View style={styles.btnLoginContainer}>
                    <TouchableOpacity onPress={() => { loginByGG() }} style={styles.googleBtn}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Image style={styles.googleBtnImage} source={require('../../assets/logo/google.png')} />
                            <Text style={styles.googleText}>Login with Google</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={styles.facebookBtn}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Icon name='facebook' size={30} color="white" style={styles.facebookIcon} />
                            <Text style={styles.facebookText}>Login with Facebook</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={styles.roundButtonsContainer}>
                    {/* Add your 4 round buttons here */}
                    <TouchableOpacity style={styles.zaloRoundBtn}>
                        <Image style={styles.roundButtonImage} source={require('../../assets/logo/zalo.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lineRoundBtn}>
                        <Image style={styles.roundButtonImage} source={require('../../assets/logo/line.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.twitterRoundBtn}>
                        <Icon name='twitter' size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton} onPress={handleLoginByEmail}>
                        <Icon name='gmail' size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} onPress={() => {
                    navigation.navigate('Register');
                }}>
                    <Text style={styles.createAccountText}>Create an account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};
export default SignInBottomSheet;

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalHeader: {
        backgroundColor: COLORS.primaryWhiteHex,
        shadowColor: COLORS.primaryBlackHex,
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: SPACING.space_15,
        borderTopLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: SPACING.space_36,
        height: SPACING.space_8,
        borderRadius: BORDERRADIUS.radius_4,
        backgroundColor: COLORS.secondaryLightGreyHex,
    },
    modalContent: {
        backgroundColor: COLORS.primaryWhiteHex,
        padding: SPACING.space_15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
        color: 'blue',
        fontSize: 18,
    }, textContainer: {
        alignSelf: 'flex-start'
    }
    , titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.primaryBlackHex,
    }, bodyText: {
        fontSize: 18,
        color: COLORS.primaryBlackHex,
    },
    btnLoginContainer: {
        width: '100%',
        alignItems: 'center',
        height:'auto',
    },
    googleBtn: {
        width: 'auto', // Adjusted width
        height: 'auto', // Adjusted height
        minWidth: '80%',
        minHeight: 50,
        marginTop: SPACING.space_10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.primaryBlackHex,
        color: COLORS.primaryBlackHex,
        justifyContent: 'center',
    },
    googleBtnImage: {
        marginLeft: 10,
        width: 30,
        height: 30,
    },
    googleText: {
        marginLeft: 40,
        color: "black",
        fontSize: FONTSIZE.size_18,
        fontWeight: 'bold',
    },
    facebookBtn: {
        width: 'auto', // Adjusted width
        height: 'auto', // Adjusted height
        minWidth: '80%',
        minHeight: 50,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        marginTop:SPACING.space_15,
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
        marginTop: SPACING.space_10,
        fontSize: 18,
    }
});

