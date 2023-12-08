import React, { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput, ToastAndroid, Alert, Pressable } from "react-native";

import { useEffect, useState, useContext } from "react";
import { Novel } from "../../models/Novel";
import { getNovelByGenre, getNovelById, getNovelData, getNovelDataExcept, getRelatedNovelByGenre } from "../../hook/NovelApi";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Chapter } from '../../models/Chapter';
import { getChaptersByNovelId } from '../../hook/ChapterApi';
import NovelDetailSkeleton from '../../components/Loading/NovelDetailSkeleton';
import { getCommentFromNovelId, postCommentApi } from '../../hook/CommentApi';
import { Comment } from '../../models/Comment';

import getPreferenceData, { postPreferenceData } from '../../hook/PreferenceApi';
import { Preference } from '../../models/Preference';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from '../../components/StarRating/StarRating';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { deleteRatingApi, getRatingByUserApi, postRatingApi } from '../../hook/RatingApi';
import GetAccountApi from '../../hook/AccountApi';
import { Rating } from '../../models/Rating';
import Stars from '../../components/StarRating/Stars';
import { User } from '../../models/User';
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
    const [commentText, setCommentText] = useState('');
    const [ratingList, setRatingList] = useState<Rating[]>([]);
    const [stars, setStars] = useState(0);
    const [isRating, setIsRating] = useState(false);

    const { authState, getUserData } = useContext(AuthContext);
    const [user, setUser] = useState<User | null>()
    // const  = useContext(AuthContext);
    // const user = getUserData();

    const [generalStarCount, setGeneralStarCount] = useState(3.5);
    const [customStarCount, setCustomStarCount] = useState(2.5);

    const onGeneralStarRatingPress = (rating: number) => {
        setGeneralStarCount(rating);
    };

    const onCustomStarRatingPress = (rating: number) => {
        setCustomStarCount(rating);
    };

    useEffect(() => {
        navigation.setOptions({
            title: novel?.title,
            headerStyle: {
                backgroundColor: '#EBEBEB'
            }

        })
    })
    useEffect(() => {
        setUser(getUserData());
    }, [user, getUserData])

    // Call api get rating before if it is exist
    useEffect(() => {
        const fetchRating = async () => {
            try {
                setLoading(true);
                await setUser(getUserData());// this is important
                if (user) {
                    const rating = await getRatingByUserApi(novel?.id, user?.id, authState.accessToken);
                    console.log(`rating: ${rating}`);
                    if (rating) {
                        setStars(rating.rateScore);
                        setIsRating(true);

                    } else {
                        setStars(0);
                        setIsRating(false);
                    }
                    setLoading(false);
                } else {
                    console.log('not login')
                }

            } catch (error) {
                console.error('Error fetching rating:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRating();
    }, [, user]);
    useFocusEffect(
        useCallback(() => {
            const fetchRating = async () => {
                try {
                    setLoading(true);
                    await setUser(getUserData());// this is important
                    if (user) {
                        const rating = await getRatingByUserApi(novel?.id, user?.id, authState.accessToken);
                        console.log(`rating: ${rating}`);
                        if (rating) {
                            setStars(rating.rateScore);
                            setIsRating(true);

                        } else {
                            setStars(0);
                            setIsRating(false);
                        }
                        setLoading(false);
                    } else {
                        console.log('not login')
                    }

                } catch (error) {
                    console.error('Error fetching rating:', error);
                } finally {
                    setLoading(false);
                }
            };
            if (user) {
                fetchRating();
            }

            return () => {
                // Cleanup or clear any subscriptions if needed
            };

        }, [,novel,user])
    )

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
            console.log(data)
            // setCommentsLength(data.length);
        }).catch((err) => {
            console.log('Lay danh sach truyen binh luan that bai')
        });
    }
    // const fetchRatingFromNovel = async () => {
    //     comments.map((comment) => {
    //         console.log(comment.accountId)
    //         getRatingByUserApi(novelId, comment.accountId, authState).then((data) => {
    //             comment.ratingScore = data.ratingScore;
    //         });
    //     })
    // }


    // Fetch novels and comments
    useEffect(() => {
        fetchNovelDetailData();
        fetchChapterByNovelId();
        fetchRcmData();
        if (novel?.genreIds[0]) { // them dieu kien
            fetchRelatedData();
        }
        fetchCommentFromNovel();
        // fetchRatingFromNovel();
        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }, []);
    const [preferList, setPreferList] = useState<Preference[]>([]);
    useEffect(() => {
        const fetchPreferenceData = async () => {
            if (authState.authenticated && user) {
                getPreferenceData(user, authState.accessToken).then((data) => {
                    setPreferList(data);
                }).catch((error) => {
                    console.log(error);
                })

            } else {
                const data = await AsyncStorage.getItem('preferList');
                if (data) {
                    setPreferList(JSON.parse(data));
                } else {
                    setPreferList([]);
                }

            }
        }
        fetchPreferenceData()
    }, [])

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
            await postPreferenceData(user.id, novel.id, authState.accessToken).then((response) => {
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
    const handleDeleteRating = async () => {
        if (user) {
            const res = await deleteRatingApi(novelId, user.id, authState.accessToken);
            console.log(res);
            Alert.alert('Delete your rating successfully');
            setStars(0);
        } else {
            Alert.alert('You should sign in first')
        }

    }
    const handleCreateRating = async () => {
        if (user) {
            const res = await postRatingApi(novelId, user.id, stars, authState.accessToken);
            console.log(res);
            Alert.alert('Post your rating successfully');
        } else {
            Alert.alert('You should sign in first')
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
    async function handleSendComment() {
        if (user) {
            if (commentText.length > 40) {
                const data = {
                    novelId: novel?.id,
                    accountId: user?.id,
                    text: commentText
                }
                const res = await postCommentApi(data, authState.accessToken);
                console.log(res);
                if (res.code == 200) {
                    Alert.alert('Add comment successfully');
                    setCommentText('');
                    fetchCommentFromNovel();
                    // fetchRatingFromNovel();
                }
            } else {
                Alert.alert('Please enter more than 40 characters')
            }
        } else {
            Alert.alert('You should sign in first.')
        }

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
        if (relatedNovel.length > 0) {
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
        }

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
                        <Image style={styles.img} source={{ uri: novel?.imagesURL }} defaultSource={require('../../assets/img/waiting_img.jpg')} />
                        {/* source={{ uri: novel?.imagesURL }} */}
                    </View>
                    <View style={styles.inforColumn}>
                        <Text numberOfLines={4} style={styles.nameInfor}>{novel?.name}</Text>
                        <Text style={styles.authorInfor}>by {novel?.author}</Text>
                        <Text style={styles.genreInfor}>{novel?.genreName}</Text>
                    </View>
                </View>
                <View style={styles.viewrow}>
                    <View style={styles.column}>
                        <Text style={styles.title}>Views</Text>
                        <Text>{novel?.views}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Rating</Text>
                        <Text>{novel?.rating}</Text>
                    </View>
                </View>

                <View style={styles.descBox}>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.descHeader}>Description:</Text>
                            <Text>{novel?.description}</Text>
                        </View>
                    </View>

                    <View style={styles.separator}>
                        <View style={styles.separatorLine}></View>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={handleNavigateToChapterList}>
                            <Text style={{ fontSize: 18 }} >{novel?.numChapter} Chapters updated</Text>
                            <Icon style={{ alignSelf: 'flex-end' }} name='chevron-right' size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Danh sach binh luan */}
                <View style={styles.box1}>
                    <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.title}>Reviews</Text>
                            <Text style={{ marginLeft: 2, marginBottom: 3 }}>{comments.length}</Text>
                            {/* {commentLength > 0 ?
                                (<Text style={{top:1}}>{commentLength}</Text>) :
                                (<></>)
                            } */}

                        </View>
                        {
                            comments.length > 0 ?
                                (<TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { }}>
                                    <Text style={styles.title}>More</Text>
                                    <Icon style={{ alignSelf: 'flex-end' }} name='chevron-right' size={20} color={'black'} />
                                </TouchableOpacity>) :
                                (<TouchableOpacity style={{ flexDirection: 'row', margin: 10 }} onPress={() => { }}>
                                    <Text style={{ fontSize: 16 }}>Write the first review!</Text>
                                    <Icon style={{ alignSelf: 'flex-end' }} name='chevron-right' size={20} color={'gray'} />
                                </TouchableOpacity>)
                        }
                    </View>
                    {
                        comments.map((comment, index) => (
                            <React.Fragment key={index}>
                                <View style={[styles.row]}>
                                    <View style={styles.avatar_container}>
                                        <Image style={styles.avatar} source={{ uri: 'https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3' }} />
                                    </View>
                                    <View style={{ marginLeft: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', flex: 1 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{comment.nickName || comment.username}</Text>
                                        <View style={styles.stars}>
                                            <MaterialIcons name="star-border" size={15} style={(comment.ratingScore >= 1) ? styles.starSelected : styles.starUnselected} />
                                            <MaterialIcons name="star-border" size={15} style={(comment.ratingScore >= 2) ? styles.starSelected : styles.starUnselected} />
                                            <MaterialIcons name="star-border" size={15} style={(comment.ratingScore >= 3) ? styles.starSelected : styles.starUnselected} />
                                            <MaterialIcons name="star-border" size={15} style={(comment.ratingScore >= 4) ? styles.starSelected : styles.starUnselected} />
                                            <MaterialIcons name="star-border" size={15} style={(comment.ratingScore == 5) ? styles.starSelected : styles.starUnselected} />
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'column', justifyContent: 'center', right: 20, alignItems: 'flex-end'
                                    }}>
                                        <Text>6mth ago</Text>
                                    </View>
                                </View>
                                <View style={[styles.row, { flex: 1 }]}>
                                    <View style={styles.avatar_container}>
                                        <View style={styles.avatar_1}></View>
                                    </View>
                                    <View style={{ flex: 2, flexDirection: 'column', alignItems: 'flex-start', marginTop: 5, marginRight: 10, }}>
                                        <Text>{comment.text}</Text>
                                    </View>
                                </View>
                            </React.Fragment>
                        ))
                    }
                    <View style={{ marginTop: 10, borderRadius: 10, borderWidth: 1, borderColor: '#EBEBEB', width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            multiline numberOfLines={2}
                            placeholder='Please write your comment here. At least 40 characters'
                            value={commentText}
                            onChangeText={(comment) => { setCommentText(comment) }}
                            style={{ margin: 10, width: '80%', textAlignVertical: 'top' }} />
                        <Pressable onPress={() => {
                            handleSendComment()
                        }}>
                            <Icon name='send' size={25} style={{ alignSelf: 'flex-end' }} />
                        </Pressable>
                        <Text style={styles.characterCount}>
                            {commentText.length}/{40}
                        </Text>

                    </View>
                    <View style={styles.separator}>
                        <View style={styles.separatorLine}></View>
                    </View>
                    {/* onPress={() => { navigation.navigate('AddReview') }} */}
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} >
                        <View style={styles.textInput} >
                            <Text style={{ fontSize: 16, color: '#333' }}>Rate this book</Text>

                            <Stars stars={stars} setStarRating={setStars} />
                            <TouchableOpacity onPress={() => {
                                if (isRating) {
                                    Alert.alert('Rating alert', 'Do you want to delete this rating', [
                                        {
                                            text: 'Cancel',
                                            onPress: () => { setIsRating(true); },
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'OK', onPress: () => {
                                                handleDeleteRating();
                                                setIsRating(false);
                                            }
                                        },
                                    ]);
                                    // setIsRating(false);
                                } else {
                                    if (stars > 0) {
                                        handleCreateRating();
                                        setIsRating(true);
                                    } else {
                                        Alert.alert('Please rate before submit')
                                    }

                                }
                            }}>
                                {isRating ? <Icon name='trash-can-outline' size={20} style={{ right: 10 }} /> : <Icon name='check' size={20} style={{ right: 10 }} />}
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.box1}>
                    <Text style={styles.title}>May be you can like: </Text>
                    <View style={styles.imageGrid}>
                        {Array.from({ length: Math.ceil(8 / 4) }, (_, i) => renderRCMRow(i))}
                    </View>
                </View>


                <View style={styles.box1}>
                    <Text style={styles.title}>Relating novels:</Text>
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
                    <Text>Reading now</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 10,
    },
    stars: {
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
    },
    starSelected: {
        color: '#ffb300',
    },
    starUnselected: {
        color: '#aaa',
    },
    avatar_container: {
        marginLeft: 10,
        flexDirection: 'row',
        // width: '90%',
        // height: '100%',
        // position: 'relative',
        justifyContent: 'flex-start',
        // marginBottom:20,
        // alignItems:'center'
    },
    avatar: {
        marginLeft: 5,
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar_1: {
        marginLeft: 5,
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    characterCount: {
        alignSelf: 'flex-end',
        color: 'gray',
        marginTop: 5,
        right: 20,
    },
});

export default NovelDetail;
