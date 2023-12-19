import { AuthContext } from '../../context/AuthContext';
import React, { useContext, useState } from 'react';
import { User } from '../../models/User';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native-paper';
const Profile = ({ navigation }: any) => {
    const { getUserData } = useContext(AuthContext);
    const [like, setLike] = useState(false);

    const handleEditBtn = () => {
        navigation.navigate('EditProfile');
    }

    const user = getUserData();
    if (user) {
        return (
            <View style={styles.container}>
                <View style={styles.coverImgContainer}>
                    <ImageBackground style={styles.coverImg} source={{ uri: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-bia-dep-10.jpg' }} />
                </View>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <View style={styles.avatar_container}>
                            <Image style={styles.avatar} source={{ uri: user.imagesURL }} />
                            <Text numberOfLines={2} style={styles.username}>{user.nickName || user.username}</Text>
                            <Text style={styles.userid}>ID:{user.id}</Text>
                        </View>
                        <View style={styles.funcBtn}>

                            <View style={styles.likeBtn}>
                                <TouchableOpacity onPress={() => { setLike(!like) }}>
                                    <Icon name='heart' size={20} style={styles.likeBtnIcon} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.editBtn}>
                                <TouchableOpacity onPress={() => { handleEditBtn() }}>
                                    <Text style={styles.editBtnText}>Edit profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                <Icon name='pencil' size={20} />
                                <Text>Tell us more about yourself</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lastRow}>
                        <View style={{ marginTop: 5, flexDirection: 'row' }}>
                            <Icon name='calendar' size={20} />
                            <Text>2023-11-07 Joined</Text>
                        </View>
                        <View style={{ marginTop: 5, flexDirection: 'row' }}>
                            <Icon name='account-wrench' size={20} />
                            <Text>Toàn cầu </Text>
                        </View>
                    </View>
                </View>


                {/* Add for cooler */}
                <View style={styles.moreContent}>
                    <View style={styles.inforBox}>
                        <View style={styles.boxRow}>
                            <View style={styles.column}>
                                <Text>1h</Text>
                                <Text>đang đọc</Text>
                            </View>
                            <View style={styles.column}>
                                <Text>14</Text>
                                <Text>Đọc sách</Text>
                            </View>
                        </View>

                    </View>
                </View>

            </View>
        );
    } else {
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={"large"} color="#333" />
        </View>
    }

};

export default Profile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    }, coverImgContainer: {
        height: '20%',
        width: '100%',
    }
    , coverImg: {
        height: '100%',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignItems:'flex-start',
        alignSelf: 'flex-start',
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
    // Text:
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    userid: {
        fontSize: 13,
    },
    content: {
        //   backgroundColor:'black'
        margin: 10,
    },
    moreContent: {
        margin: 10,
    },
    funcBtn: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    likeBtn: {
        margin: 10,
        width: 50,
        // paddingBottom: 5,
        // paddingTop: 5,
        padding:10,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
    },
    likeBtnIcon: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical:'center',
    },
    editBtn: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    editBtnText: {
        margin: 1,
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    }
    , lastRow: {
        backgroundColor: 'lightGray',
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    inforBox: {
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: 'white',
        width: '97%',
        height: 70,

    },
    boxRow: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 70,
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }

});
