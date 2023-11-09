import { AuthContext } from '../../context/AuthContext';
import React, { useContext } from 'react';
import { User } from '../../models/User';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Profile = () => {
    const { getUserData } = useContext(AuthContext);
    const user = {
        email: "namtruong0900@gmail.com",
        id: "dckfGkjWXEG7jy4u0zc_rg",
        isAdmin: true,
        nickName: "SkywoodNick",
        phone: "0353670461",
        refreshToken: "3ZzbRuZW8wj7GTdF7ASHY39Rq22+qTWPhhMV4pA2HGI=",
        refreshTokenExpiryTime: "2023-11-15T08:11:45.884609",
        roleIds: ["ADMIN", "DEV"],
        status: 0,
        username: "Skywood",
    }
    const userData= getUserData();
    return (
        <View style={styles.container}>
            <View style={styles.coverImgContainer}>
                <ImageBackground style={styles.coverImg} source={{ uri: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-bia-dep-10.jpg' }} />
            </View>
            <View style={styles.row}>
                <View style={styles.avatar_container}>
                    <Image style={styles.avatar} source={{ uri: 'https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3' }} />
                    <Text>{user.username}</Text>
                    <Text>ID:{user.id}</Text>
                </View>
                <View style={styles.funcBtn}>
                    <View style={styles.likeBtn}>
                        <TouchableOpacity onPress={() => { }}>
                            <Icon name='heart' style={styles.likeBtnIcon} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.editBtn}>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={styles.editBtnText}>Chỉnh sửa hồ sơ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => { }}>
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Icon name='pencil' size={20} />
                        <Text>Nói cho chúng tôi thêm về sở thích của bạn</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.lastRow}>
                <View style={{ marginTop: 5, flexDirection: 'row' }}>
                    <Icon name='calendar' size={20} />
                    <Text>Đã tham gia vào 2023-11-07 </Text>
                </View>
                <View style={{ marginTop: 5, flexDirection: 'row' }}>
                    <Icon name='account-wrench' size={20} />
                    <Text>Toàn cầu </Text>
                </View>
            </View>

        </View>
    );
};

export default Profile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        flexDirection: 'column'
    }, coverImgContainer: {
        height: '20%',
        width: '100%',
    }
    , coverImg: {
        height: '100%',
        width: '100%',
    },
    row: {
        backgroundColor: 'lightGray',
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatar_container: {
        marginLeft: 10,
        flexDirection: 'column',
        width: '50%',
        height: '100%',
    },
    avatar: {
        marginLeft: 5,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    funcBtn: {
        flexDirection: 'row',
        width: '50%',
        height: '100%',
        // backgroundColor: 'green'
    },
    likeBtn: {
        margin: 10,
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 3,
    },
    likeBtnIcon: {
        margin: 1,
        width: 25,
        height: 25,
        color: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    editBtn: {
        margin: 10,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
    },
    editBtnText: {
        margin: 1,
        color: 'black',
    }
    ,lastRow:{
        backgroundColor: 'lightGray',
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }

});
