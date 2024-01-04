import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../../../theme/theme';
import PaymentFooter from '../../../components/Payment/PaymentFooter';

import LinearGradient from 'react-native-linear-gradient';
import { createOrderApi, createPaymentApi } from '../../../hook/PaymentApi';
import { AuthContext } from '../../../context/AuthContext';
import { User } from '../../../models/User';
const PaymentList = [
    {
        name: 'VN Pay',
        icon: require('../../../assets/logo/vnpay.png'),
        isIcon: false,
    },
    {
        name: 'Google Pay',
        icon: require('../../../assets/logo/vnpay.png'),
        isIcon: false,
    },
    {
        name: 'Zalo Pay',
        icon: require('../../../assets/logo/vnpay.png'),
        isIcon: false,
    },
];

interface PaymentMethodProps {
    paymentMode: string;
    name: string;
    icon: any;
    isIcon: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
    paymentMode,
    name,
    icon,
    isIcon,
}) => {
    return (
        <View
            style={[
                styles.PaymentCardContainer,
                {
                    borderColor:
                        paymentMode == name
                            ? COLORS.primaryOrangeHex
                            : COLORS.primaryGreyHex,
                },
            ]}>
            {isIcon ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.LinearGradientWallet}>
                    <View style={styles.WalletRow}>
                        {/* <CustomIcon
                name={'wallet'}
                color={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_30}
              /> */}
                        <Text style={styles.PaymentTitle}>{name}</Text>
                    </View>
                </LinearGradient>
            ) : (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.LinearGradientRegular}>
                    <Image source={icon} style={styles.PaymentImage} />
                    <Text style={styles.PaymentTitle}>{name}</Text>
                </LinearGradient>
            )}
        </View>
    );
};



const Payment = ({ navigation, route }: any) => {
    const [user, setUser] = React.useState<User | null>();
    const { authState, getUserData } = React.useContext(AuthContext);
    React.useEffect(() => {
        setUser(getUserData())
    });

    const [paymentMode, setPaymentMode] = useState('VN pay');
    // const [showAnimation, setShowAnimation] = useState(false);

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
    const handleBuyCoin = async (bundle: any) => {
        const res = await createOrderApi(user?.id, bundle, authState.accessToken)
        console.log('res',res.data);
        const paymentRes = await createPaymentApi(res.data.OrderId, res.data.Price, authState.accessToken)
        console.log(paymentRes);
        console.log(paymentRes.paymentUrl)
        redirectToVNPAY(paymentRes.paymentUrl)//
       // console.log('hello');
        // Call handleDeepLink when the app is reopened
        //handleDeepLink();
    }

    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <View style={styles.HeaderContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.pop();
                        }}>
                        <MaterialCommunityIcons
                            name="arrow-left"
                            color={COLORS.primaryLightGreyHex}
                            size={FONTSIZE.size_16}
                        />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText}>Payments</Text>
                    <View style={styles.EmptyView} />
                </View>
            )

        })
    })
    return (
        <View style={styles.ScreenContainer}>

            {/* {showAnimation ? (
                <PopUpAnimation
                    style={styles.LottieAnimation}
                    source={require('../lottie/successful.json')}
                />
            ) : (
                <></>
            )} */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View style={styles.PaymentOptionsContainer}>
                    {PaymentList.map((data: any) => (
                        <TouchableOpacity
                            key={data.name}
                            onPress={() => {
                                setPaymentMode(data.name);
                            }}>
                            <PaymentMethod
                                paymentMode={paymentMode}
                                name={data.name}
                                icon={data.icon}
                                isIcon={data.isIcon}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <PaymentFooter
                buttonTitle={`Pay with ${paymentMode}`}
                bundle={route.params.bundle}
                buttonPressHandler={handleBuyCoin}
            />
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    LottieAnimation: {
        flex: 1,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    HeaderContainer: {
        paddingHorizontal: SPACING.space_24,
        paddingVertical: SPACING.space_15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryBlackHex,
    },
    EmptyView: {
        height: SPACING.space_36,
        width: SPACING.space_36,
    },
    PaymentOptionsContainer: {
        padding: SPACING.space_15,
        gap: SPACING.space_15,
    },
    CreditCardContainer: {
        padding: SPACING.space_10,
        gap: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_15 * 2,
        borderWidth: 3,
    },
    CreditCardTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginLeft: SPACING.space_10,
    },
    CreditCardBG: {
        backgroundColor: COLORS.primaryGreyHex,
        borderRadius: BORDERRADIUS.radius_25,
    },
    LinearGradientStyle: {
        borderRadius: BORDERRADIUS.radius_25,
        gap: SPACING.space_36,
        paddingHorizontal: SPACING.space_15,
        paddingVertical: SPACING.space_10,
    },
    CreditCardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    CreditCardNumberContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
    },
    CreditCardNumber: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
        letterSpacing: SPACING.space_4 + SPACING.space_2,
    },
    CreditCardNameSubitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    CreditCardNameTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    CreditCardNameContainer: {
        alignItems: 'flex-start',
    },
    CreditCardDateContainer: {
        alignItems: 'flex-end',
    },
    //Payment method:

    PaymentCardContainer: {
        borderRadius: BORDERRADIUS.radius_15 * 2,
        backgroundColor: COLORS.primaryGreyHex,
        borderWidth: 3,
    },
    LinearGradientWallet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.space_12,
        paddingHorizontal: SPACING.space_24,
        gap: SPACING.space_24,
        borderRadius: BORDERRADIUS.radius_15 * 2,
    },
    WalletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_24,
    },
    LinearGradientRegular: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        paddingHorizontal: SPACING.space_24,
        gap: SPACING.space_24,
        borderRadius: BORDERRADIUS.radius_15 * 2,
    },
    PaymentTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    PaymentPrice: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex,
    },
    PaymentImage: {
        height: SPACING.space_30,
        width: SPACING.space_30,
    },
});