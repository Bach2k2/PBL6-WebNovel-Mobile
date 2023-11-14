import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

import { useEffect, useState, useContext } from "react";
import { Novel } from "../../models/Novel";
import { getNovelByGenre, getNovelById, getNovelData } from "../../hook/NovelApi";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import { Chapter } from '../../models/Chapter';
import { getChaptersByNovelId } from '../../hook/ChapterApi';
const NovelDetail = ({ route }: any) => {
    const navigation = useNavigation();
    const [novel, setNovel] = useState<Novel>();
    const [chapter, setChapters] = useState<Chapter>();
    const { novelId } = route.params;
    const [isDownload, setDownloadStatus] = useState(false);
    const [rcmNovel, setRcmNovels] = useState<Novel[]>([]);
    const [relatedNovel, setRelatedNovels] = useState<Novel[]>([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        // console.log(novelId);
        const fetchChapterByNovelId = async () => {
            await getChaptersByNovelId(novelId).then((data) => {
                console.log('data', data);
                setChapters(data);
            }).catch((error) => {
                console.log(error);
            })
        }
        fetchChapterByNovelId();
    }, []);

    useEffect(() => {
        // Simulate data loading delay (replace with your actual data fetching logic)
        const fetchRcmData = async () => {
            await getNovelData().then((data) => {
                console.log('I fire two')
                setRcmNovels(data);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
            })
        }
        fetchRcmData();
    }, []);

    useEffect(() => {
        const fetchRelatedData = async () => {
            getNovelByGenre(novel?.genreIds[0]).then((data) => {
                console.log(data);
                setRelatedNovels(data);
            }).catch((err) => {
                console.log(err);
            })
        };
        fetchRelatedData();
    }, []);


    function handleDownloadBtnPress(): void {
        setDownloadStatus(true);
        throw new Error("Function not implemented.");
    }

    function handleReadingBtnPress(): void {
        console.log('reading');
    }
    function handleAddingBtnPress(): void {
        console.log('function not implemented');
    }
    function handleNavigateToChapterList() {
        console.log("Navigate to chapter list")
        navigation.navigate('ChapterList', { NovelId: novel?.id });
    }

    const sampleData = [
        { id: 1, imageUrl: 'https://i.pinimg.com/474x/12/02/a9/1202a9d0bff60bc5675e3dea1f4d09c8.jpg' },
        { id: 2, imageUrl: 'https://i.pinimg.com/474x/a1/14/b0/a114b002719e272b96dba9ad6255935e.jpg' },
        { id: 3, imageUrl: 'https://i.pinimg.com/474x/a6/31/cd/a631cd4993dd1ebf00eeabbba0b4f768.jpg' },
        { id: 4, imageUrl: 'https://i.pinimg.com/474x/99/9e/c3/999ec3f203b28b61ac5ce19b48d6e8f5.jpg' },
        { id: 5, imageUrl: 'https://i.pinimg.com/474x/37/73/dc/3773dc7aebd77aa7c0155752dad1a41d.jpg' },
        { id: 6, imageUrl: 'https://i.pinimg.com/474x/37/73/dc/3773dc7aebd77aa7c0155752dad1a41d.jpg' },
        { id: 7, imageUrl: 'https://i.pinimg.com/474x/37/73/dc/3773dc7aebd77aa7c0155752dad1a41d.jpg' },
        { id: 8, imageUrl: 'https://i.pinimg.com/474x/37/73/dc/3773dc7aebd77aa7c0155752dad1a41d.jpg' },
    ];

    // Recommend System
    const renderRCMRow = (row: number) => {
        return (
            <View style={styles.row} key={row}>
                {rcmNovel.slice(row * 4, (row + 1) * 4).map((item, index) => (
                    <View style={styles.column} key={index}>
                        <TouchableOpacity style={styles.itemWrapper} onPress={() => {
                            navigation.navigate('NovelDetail', { novelId: item.id });
                        }}>
                            <View style={styles.itemWrapper}>
                                <Image source={{ uri: item.imagesURL }} style={styles.image} />
                                <Text numberOfLines={1} style={styles.text}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    };

    const renderRelatedRow = (row: number) => {
        return (
            <View style={styles.row} key={row}>
                {relatedNovel.slice(row * 4, (row + 1) * 4).map((item, index) => (
                    <View style={styles.column} key={index}>
                        <TouchableOpacity style={styles.itemWrapper} onPress={() => {
                            navigation.navigate('NovelDetail', { novelId: item.id });
                        }}>
                            <View style={styles.itemWrapper}>
                                <Image source={{ uri: item.imagesURL }} style={styles.image} />
                                <Text numberOfLines={1} style={styles.text}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    };



    return (
        <View style={styles.container} >
            <ScrollView>
                {/* <Text>Novel Detail</Text> */}
                <View style={styles.row}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={{ uri: novel?.imagesURL }} />
                    </View>
                    <View style={styles.inforColumn}>
                        <Text numberOfLines={4} style={styles.nameInfor}>{novel?.name}</Text>
                        <Text style={styles.authorInfor}>by {novel?.author}</Text>
                        <Text style={styles.authorInfor}>{novel?.genreName.join()}</Text>
                    </View>
                </View>
                <View style={styles.viewrow}>
                    <View style={styles.column}>
                        <Text style={styles.title}>Lượt xem</Text>
                        <Text>{novel?.views}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Đánh giá</Text>
                        <Text>{novel?.rating}</Text>
                    </View>
                </View>

                <View style={styles.descBox}>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.descHeader}>Mô tả:</Text>
                            <Text>{novel?.description}</Text>
                        </View>
                    </View>

                    <View style={styles.separator}>
                        <View style={styles.separatorLine}></View>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity onPress={handleNavigateToChapterList}>
                            <Text>Đã cập nhật {novel?.numChapter} chương</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.box1}>
                    <Text style={styles.title}>Bạn cũng có thể thích</Text>
                    <View style={styles.imageGrid}>
                        {Array.from({ length: Math.ceil(8 / 4) }, (_, i) => renderRCMRow(i))}
                    </View>
                </View>


                <View style={styles.box1}>
                    <Text style={styles.title}>Tác phẩm tương tự</Text>
                    <View style={styles.imageGrid}>
                        {Array.from({ length: Math.ceil(8 / 4) }, (_, i) => renderRelatedRow(i))}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonDownload} onPress={() => handleDownloadBtnPress()}>
                    {isDownload ? <Icon name="download" size={20} /> : <Icon name="check" size={20} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.readingButton} onPress={() => handleReadingBtnPress()}>
                    <Text>Đọc ngay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleAddingBtnPress()}>
                    <Icon name="plus" size={20} />
                </TouchableOpacity>
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
        width: '100%',
        flexDirection: 'row',
        marginLeft: 7,
    },
    imgContainer: {
        margin: 10,
        width: '30%',
        height: 200,
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    inforColumn: {
        width: '70%',
        marginLeft: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    nameInfor: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    authorInfor: {
        fontSize: 14,
        //   color: 'gray',
        // fontWeight:'bold'
    },
    viewrow: {
        margin: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        //    marginLeft: 7,
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
        // margin: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
        marginLeft: 10,
    },
    descBox: {
        margin: 10,
        borderWidth: 2,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 5,
    },
    separator: {
        width: '100%',
        alignItems: 'center',
        margin: 5,
    },
    separatorLine: {
        width: '90%',
        height: 1, // Độ cao của đường line
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'gray', // Màu của đường line
    },
    descHeader: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    //Recommendations:
    imageGrid: {
        flexDirection: 'row',
        //   height: 150,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        margin: 10,
    },
    gridItem: {
        width: '25%', // Khoảng cách nhỏ để chứa 2 ảnh trên mỗi hàng
        height: 150,
        aspectRatio: 1,
        margin: 5,
    },
    gridItemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    // Button section
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },
    buttonDownload: {

        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
    },
    readingButton: {
        width: '60%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightblue',
        textAlign: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'lightblue',

        padding: 10,
        borderRadius: 5,
    },

    box1: {

        margin: 10,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
    },
    box2: {

    }
    ,// Recommend 
    itemWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },
    image: {
        width: 70,
        height: 100,
        borderRadius: 3,
    },
    text: {
        marginTop: 5,
        textAlign: 'left',
        overflow: 'hidden',

    },
});

export default NovelDetail;
