import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ToastAndroid, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { EditNovel } from '../../../hook/NovelApi';
import { AuthContext } from '../../../context/AuthContext';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import getGenreData from '../../../hook/GenreApi';
import { Genre } from '../../../models/Genre';


type genreType = {
    'key': string,
    'value': string
}
const TitleEditBottomSheet = ({ pos, isVisible, onClose, novel }: any) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [novelTitle, setNovelTitle] = useState('');
    const [genreList, setGenreList] = useState<genreType[]>([]);
    // const [selectGenres, setSelectedGenres] = useState([]);
    const [defaultGenres, setDefaultGenres] = useState([{ key: '', value: '' }]);
    const [selectGenreIds, setSelectedGenreIds] = useState([]);
    const [disableButton, setDisableButton] = useState(false);
    const { authState } = useContext(AuthContext)

    useEffect(() => {
        let disable = false;

        if ((pos === 'novelTitle' || pos === 'description') && novelTitle === '') {
            disable = true;
        }

        if (pos === 'genre' && selectGenreIds.length === 0) {
            disable = true;
        }

        setDisableButton(disable);
    }, [novelTitle, selectGenreIds, pos]);

    useEffect(() => {
        const fetchGenreData = async () => {
            getGenreData().then((data) => {
                console.log(data)
                var temp: { key: string; value: string }[] = data.map((d: Genre) => ({
                    key: d.id,
                    value: d.name,
                }));

                // let defaultOption = novel.genreIds.filter((item: any) => item.id = temp.key)
                let defaultOptions = temp.filter((tempItem: any) => {
                    return novel.genreIds.some((genreId: any) => genreId === tempItem.key);
                });

                let defaultSelectedOptions = data.filter((tempItem: any) => {
                    return novel.genreIds.some((genreId: any) => genreId === tempItem.id);
                });
                let selectedGenreIds = defaultSelectedOptions.map((genre:any) => genre.id);

                setSelectedGenreIds(selectedGenreIds)
                setDefaultGenres(defaultOptions)
                // setDefaultGenres((prev) => ({
                //     ...prev,
                //     defaultOptions,
                // }));
                console.log('df2', selectedGenreIds)
                console.log('df', defaultOptions)
                // console.log()
                setGenreList(temp);
                console.log('here ' + genreList)
            }).catch((err) => {
                throw err;
            });
        }
        fetchGenreData();
    }, []);

    const handleSubmit = async () => {
        // Xử lý hành động submit ở đây

        switch (pos) {
            case 'novelTitle':
                novel.name = novelTitle;
                novel.title = novelTitle;

                break;
            case 'description':
                novel.description = novelTitle;

                break;
            case 'genre':
                novel.genreIds = selectGenreIds;
                console.log('novelId after edit',novel.genreIds)
                break;
            default:
                return;
        }
        const res = await EditNovel(novel, authState.accessToken);
        console.log(res);
        ToastAndroid.showWithGravity(
            'Edit your novel successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
        onClose();

    }


    const render = () => {
        if (pos == 'novelTitle') {
            return (
                <Modal
                    onBackdropPress={onClose}
                    style={styles.bottomModal}
                    backdropOpacity={0.5}
                    isVisible={isVisible}>
                    <View style={styles.modalHeader}>
                        <View style={styles.panelHeader}>
                            <View style={styles.panelHandle}></View>
                        </View>
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={styles.titleText}>Title</Text>
                        <View style={{ margin: 10 }}>
                            <TextInput defaultValue={novel.title} style={{ backgroundColor: '#EBEBEB', borderRadius: 10, }} onChangeText={setNovelTitle} />
                        </View>
                        <TouchableOpacity disabled={disableButton} style={styles.submitBtn} onPress={() => {
                            handleSubmit()
                        }}>
                            <Text style={disableButton ? { color: 'red' } : { color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            );
        } else if (pos == 'description') {
            return (
                <Modal
                    onBackdropPress={onClose}
                    style={styles.bottomModal}
                    backdropOpacity={0.5}
                    isVisible={isVisible}>
                    <View style={styles.modalHeader}>
                        <View style={styles.panelHeader}>
                            <View style={styles.panelHandle}></View>
                        </View>
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={styles.titleText}>Description</Text>
                        <View style={{ margin: 10 }}>
                            <TextInput numberOfLines={3} defaultValue={novel.description} style={{ marginLeft: 10, backgroundColor: '#EBEBEB', borderRadius: 10, }} onChangeText={setNovelTitle} />
                        </View>
                        <TouchableOpacity style={styles.submitBtn} onPress={() => {
                            handleSubmit()
                        }}>
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            );
        } else {
            return (
                <Modal
                    onBackdropPress={onClose}
                    style={styles.bottomModal}
                    backdropOpacity={0.5}
                    isVisible={isVisible}>
                    <View style={styles.modalHeader}>
                        <View style={styles.panelHeader}>
                            <View style={styles.panelHandle}></View>
                        </View>
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={styles.titleText}>Genres</Text>
                        <View style={{ margin: 10 }}>
                            <MultipleSelectList
                                setSelected={(val: any) => setSelectedGenreIds(val)}
                                data={genreList}
                                searchPlaceholder="---- select genres -----"
                                //data={genreList.map((genre) => ({ label: genre.value, value: genre.key }))}
                                save="key"
                                // onSelect={() => {
                                //   console.log()
                                // }}
                                label="Genres"
                                // defaultOption={defaultGenres}
                                defaultOption={defaultGenres[0]}


                            />
                        </View>
                        <TouchableOpacity style={styles.submitBtn} onPress={() => {
                            handleSubmit()
                        }}>
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            );
        }
    }
    return render();
};
export default TitleEditBottomSheet;

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalHeader: {
        backgroundColor: '#FFFFFF',
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
        backgroundColor: 'white',
        padding: 10,
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
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
    }, bodyText: {
        fontSize: 18,
    },
    //Modal
    submitBtn: {
        borderRadius: 10, margin: 10,
        backgroundColor: '#00a2ed', padding: 10,
        alignItems: 'center'
    }
});

