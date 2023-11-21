import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import getBookmarkedData from "../../hook/BookmarkedApi";
import { useEffect, useState, useContext } from "react";
import { Bookmarked } from "../../models/Bookmarked";
import { AuthContext } from "../../context/AuthContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
const BookmarkNovels = ({navigation}:any) => {

    // const authContext = useContext(AuthContext);
    const { authState, getUserData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isGrid, setIsGrid] = useState(true);
    const [bookmarkedData, setBookmarkedData] = useState<Bookmarked[]>([]);
  //  const navigation = useNavigation();

    useEffect(() => {
        console.log("auth: ", authState.accessToken);
        const user = getUserData();
        const fetchBookmarkedData = async () => {
            await getBookmarkedData(user, authState.accessToken).then((data) => {

                setBookmarkedData(data);
                // console.log("n", bookmarkedData)
            }).catch((error) => {
                console.log(error);
            })
        }
        if (authState.accessToken) {
            console.log("call api bookmark");
            fetchBookmarkedData();
        }

    }, []);

    if (!authState.authenticated) {
        return (
            <View style={styles.container} >
                <Text style={styles.warningText} numberOfLines={2} >Bạn hãy đăng nhập để có thể xem danh sach truyện đã thêm vào thư viện</Text>
            </View>
        );
    }

    if (bookmarkedData.length == 0) {
        return (
            <View style={styles.nodataContainer} >
                <Image source={require('../../assets/img/nodatapresent.png')} style={{height:100,width:100}}/>
                <Text style={styles.warningText}>Không có dữ liệu</Text>
            </View>
        );
    }
    return (
        <View style={styles.mycontainer} >
            <View style={styles.row}>
                {bookmarkedData.map((novel, index) => (
                    <TouchableOpacity key={index} onPress={() => {
                        console.log('Press to novel detail');
                        navigation.navigate('NovelDetail', { novelId: novel.novelId });
                    }}>
                        <View style={styles.novelContainer} >
                            <Image source={{ uri: novel.imagesURL }} alt='image' style={styles.novelImage} />
                            <View style={styles.novelContent}>
                                <Text numberOfLines={1} style={styles.novelTitle}>{novel.name}</Text>
                                <Text numberOfLines={1} style={styles.novelAuthor}>{novel.author}</Text>
                                <Text numberOfLines={1} style={styles.novelGenre}>{novel.genreName.join(' ')} . <Icon name='description' size={16} color="gray" />{novel.views}</Text>
                            </View>
                            {/* <Icon.Button name='add-box' size={24} color="black" backgroundColor="transparent" /> */}
                        </View>
                    </TouchableOpacity>
                ))
                }
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 10,
        width: '100%',
    },
    mycontainer: {
        // flex: 1,
        margin: 10,
        width: '100%',

    },
    nodataContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
    },
    warningText: {
        fontSize: 20,
        textAlign: "center",
        color:'black',

    },
    row: {
        flexDirection: 'row',
    },
    novelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        width: '100%',
    },
    novelContent: {
        // flex: 1,
        flexDirection: 'column',
    },
    novelImage: {
        width: 100,
        height: 120,
        marginRight: 10,
    },
    novelTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    }, novelTag: {
        fontSize: 22,
        color: 'black',
    },
    novelAuthor: {
        fontSize: 14,
        color: 'black',
    },
    novelGenre: {
        fontSize: 16,
        color: 'black',
    },

});

export default BookmarkNovels;
