import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput, ToastAndroid } from "react-native";

import { useEffect, useState, useContext } from "react";
import { Novel } from "../../models/Novel";
import { getNovelByGenre, getNovelById, getNovelData, getNovelDataExcept, getRelatedNovelByGenre } from "../../hook/NovelApi";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import { Chapter } from '../../models/Chapter';
import { getChaptersByNovelId } from '../../hook/ChapterApi';
import NovelDetailSkeleton from '../../components/Loading/NovelDetailSkeleton';
import { getCommentFromNovelId } from '../../hook/CommentApi';
import { Comment } from '../../models/Comment';

import getPreferenceData, { postPreferenceData } from '../../hook/PreferenceApi';
import { Preference } from '../../models/Preference';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NovelDetail = ({ navigation, route }: any) => {
    // const navigation = useNavigation();
    const [novel, setNovel] = useState<Novel>();
    const [chapter, setChapters] = useState<Chapter[]>([]);
    const { novelId } = route.params;
    const [isDownload, setDownloadStatus] = useState(false);
    const [rcmNovel, setRcmNovels] = useState<Novel[]>([]);
    const [relatedNovel, setRelatedNovels] = useState<Novel[]>([]);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<Comment[]>([]);
    const {authState, getUserData } = useContext(AuthContext);
    // const  = useContext(AuthContext);
    const user = getUserData();

    // Fetch novels and comments
    useEffect(() => {

        const fetchNovelDetailData = async () => {
            await getNovelById(novelId).then((data) => {
                setNovel(data);
                // setLoading(false);
            }).catch((error) => {
                console.log('Lay thong tin chi tiet cua novel that bai')
                console.log(error);
            })
        }
        // ----------------------------------------------------------------
        const fetchChapterByNovelId = async () => {
            await getChaptersByNovelId(novelId).then((data) => {
                setChapters(data);
            }).catch((error) => {
                console.log('Lay thong tin chi tiet cua chapter that bai')
                console.log(error);
            })
        }
        // ----------------------------------------------------------------
        const fetchRcmData = async () => {
            await getNovelDataExcept(novelId).then((data) => {
                setRcmNovels(data);
                // setLoading(false);
            }).catch((err) => {
                console.error(err);
                console.log('Lay danh sach recommend that bai')
            })
        }
        // ----------------------------------------------------------------
        const fetchRelatedData = async () => {
            console.log("nv genre", novel?.genreIds[0])
            getRelatedNovelByGenre(novelId, novel?.genreIds[0]).then((data) => {
                setRelatedNovels(data);
            }).catch((err) => {
                console.log(err);
                console.log('Lay danh sach truyen lien quan that bai')
            })
        };
        // ----------------------------------------------------------------
        const fetchCommentFromNovel = async () => {
            getCommentFromNovelId(novelId).then((data) => {
                setComments(data);
            }).catch((err) => {
                console.log('Lay danh sach truyen binh luan that bai')
            });
        }

        fetchNovelDetailData();
        fetchChapterByNovelId();
        fetchRcmData();
        if (novel?.genreIds[0]) { // them dieu kien
            fetchRelatedData();
        }
        fetchCommentFromNovel();
        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }, []);
    const [preferList, setPreferList] = useState<Preference[]>([]);
    useEffect(() => {
        const fetchPreferenceData= async()=>{
            if (authState.authenticated) {
                getPreferenceData(user, authState.accessToken).then((data) => {
                    setPreferList(data);
                }).catch((error) => {
                    console.log(error);
                })
    
            }else{
                const data= AsyncStorage.getItem('preferList');
                setPreferList(data);
            }
        }
        fetchPreferenceData()
    },[])

    const handleAddToLib = async (novel: Novel) => {
        console.log('add novel into lib', novel.id);
        console.log(preferList)
        if (user) {
            if (
                preferList &&
                preferList.some(item => item.novelId === novel.id && item.accountId === user.id)
            ) {
                novel.isExistLib = true;
                console.log("Mảng chứa phần tử có cả novelId và accountId đều bằng với giá trị cần kiểm tra");
            } else {
                novel.isExistLib = false;
                console.log("Mảng không chứa phần tử thỏa mãn điều kiện hoặc preferList không tồn tại");
            }
            await postPreferenceData(user.id, novel.id, authState.getAccessToken()).then((response) => {
                console.log(response)

            }).catch((err) => {
                ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
            })
        } else {
            const newPreferList = {
                novelId: novel.id,
                accountId: '',
                name: novel.name,
                title: novel.title,
                author: novel.author,
                year: novel.year,
                views: novel.views,
                rating: novel.rating,
                imagesURL: novel.imagesURL,
                genreName: novel.genreName,
                genreIds: novel.genreIds,
                description: novel.description,
                status: novel.status,
                approvalStatus: novel.approvalStatus,
                numChapter: novel.numChapter
            };
            if (
                preferList &&
                preferList.some(item => item.novelId === novel.id)
            ) {
                novel.isExistLib = true;
                console.log("Mảng chứa phần tử có cả novelId và accountId đều bằng với giá trị cần kiểm tra");
            } else {
                novel.isExistLib = false;
                console.log("Mảng không chứa phần tử thỏa mãn điều kiện hoặc preferList không tồn tại");
            }

            // Lưu danh sách mới vào AsyncStorage
            try {
                setPreferList([...preferList, newPreferList]);
                await AsyncStorage.setItem('preferList', JSON.stringify(preferList));
                // console.log('Danh sách đã lưu vào AsyncStorage:', newPreferList);
                // setPreferList([...preferList, newPreferList]);
            } catch (error) {
                ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
                // console.error('Lỗi khi lưu danh sách vào AsyncStorage:', error);
            }
            // console.log('chua dang nhap');
        }
    }



    function handleDownloadBtnPress(): void {
        setDownloadStatus(true);
        throw new Error("Function not implemented.");
    }

    function handleReadingBtnPress(): void {
        console.log('reading');
        navigation.navigate('ChapterDetail', { chapterId: chapter[0].id, novel: novel });
    }
    function handleAddingBtnPress(): void {
        // console.log('function not implemented');
        try {
            if (novel) {
                handleAddToLib(novel);
            }

        } catch (err) {
        }

    }
    function handleNavigateToChapterList() {
        console.log("Navigate to chapter list")
        navigation.navigate('ChapterList', { novel: novel });
    }

    // Recommend System
    const renderRCMRow = (row: number) => {
        return (
            <View style={styles.row} key={row}>
                {rcmNovel.slice(row * 4, (row + 1) * 4).map((item, index) => (
                    <View style={styles.column} key={index}>
                        <TouchableOpacity style={styles.itemWrapper} onPress={() => {
                            console.log('Navigating to NovelDetail with novelId:', item.id);
                            navigation.push('NovelDetail', { novelId: item.id, title: item.name });
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

    // Related story
    const renderRelatedRow = (row: number) => {
        return (
            <View style={styles.row} key={row}>
                {relatedNovel.slice(row * 4, (row + 1) * 4).map((item, index) => (
                    <View style={styles.column} key={index}>
                        <TouchableOpacity style={styles.itemWrapper} onPress={() => {
                            console.log('Navigating to NovelDetail with novelId:', item.id);
                            navigation.push('NovelDetail', { novelId: item.id, title: item.name });
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

    if (loading) {
        return <NovelDetailSkeleton />
    }

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
                        <Text style={styles.genreInfor}>{novel?.genreName.join()}</Text>
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
                        <TouchableOpacity style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={handleNavigateToChapterList}>
                            <Text style={{ fontSize: 18 }} >Đã cập nhật {novel?.numChapter} chương</Text>
                            <Icon style={{ alignSelf: 'flex-end' }} name='chevron-right' size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Danh sach binh luan */}
                <View style={styles.box1}>
                    <Text style={styles.title}>Comments for this novel</Text>
                    {
                        comments.map((comment, index) => (
                            <View style={styles.row} key={index}>
                                <Text>{comment.text}</Text>
                            </View>
                        ))
                    }
                    <View style={styles.textInput} >
                        <TextInput placeholder='Add your opinions fir this novels' />
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
                    {isDownload ? <Icon name="check" size={20} /> : <Icon name="download" size={20} />}
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
        width: '60%',
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
    genreInfor: {
        fontSize: 15,
        //   color: 'gray',
        // fontWeight:'bold'
    },
    viewrow: {
        margin: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        // borderWidth: 2,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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
        // borderWidth: 2,
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

    // Comments:
    textInput: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EBEBEB',

    }
});

export default NovelDetail;
