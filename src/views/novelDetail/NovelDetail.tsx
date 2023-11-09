import { StyleSheet, View, Text, Image } from "react-native";

import { useEffect, useState, useContext } from "react";
import { Novel } from "../../models/Novel";
import { getNovelById } from "../../hook/NovelApi";
const NovelDetail = ({ route }: any) => {
    const [novel, setNovel] = useState<Novel>();
    const { novelId } = route.params;

    useEffect(() => {
        // console.log(novelId);
        const fetchNovelDetailData = async () => {
            await getNovelById(novelId).then((data) => {
                console.log('data', data);
                setNovel(data);
            }).catch((error) => {
                console.log(error);
            })
        }
        fetchNovelDetailData();
    }, []);
    return (
        <View style={styles.container} >
            <Text>Novel Detail</Text>
            <View style={styles.row}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{ uri: novel?.imagesURL }} />
                </View>
                <View style={styles.inforColumn}>
                    <Text numberOfLines={4} style={styles.nameInfor}>{novel?.name}</Text>
                    <Text style={styles.authorInfor}>by {novel?.author}</Text>
                    <Text style={styles.authorInfor}>{novel?.genreName[0]}</Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    row: {
        flexDirection: 'row',
        marginLeft: 7,
    },
    imgContainer: {
        width:'40%',
        height:200,
    },
    img: {
        width: '100%',
        height:'100%',
        borderRadius: 5,
    },
    inforColumn:{
        marginLeft:5,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'flex-start',
    },
    nameInfor:{
        fontSize:18,
        color: 'while',
        fontWeight:'bold'
    },
    authorInfor:{
        fontSize:14,
        color: 'gray',
        // fontWeight:'bold'
    },


});

export default NovelDetail;
