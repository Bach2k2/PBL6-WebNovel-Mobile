import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, TextInput, View, StyleSheet, Button, Dimensions, TouchableOpacity, Alert } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { Keyboard, KeyboardEvent } from 'react-native';
import Toast from "react-native-toast-message";
import { AuthContext } from "../../../context/AuthContext";
import { editChapterApi, postChapter } from "../../../hook/ChapterApi";
import Pdf from "react-native-pdf";
import { convertPdfToHtml } from "../../../hook/ConvertPdfToHtmlApi";
import { ActivityIndicator } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
var RNFS = require('react-native-fs');
const handleHead = ({ tintColor }: any) => <Text style={{ color: tintColor }}>H1</Text>;

const EditChapter = ({ route, navigation }: any) => {
    const { novel, chapter } = route.params
    const [title, setTitle] = useState(`${chapter.name}`);
    const [content, setContent] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const headerText = useRef();
    const richText = useRef();
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [keyboardShow, setKeyBoardShow] = useState(false);
    const [pdfFilePath, setPdfFilePath] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    // const [fileChapter, setFileChapter] = useState(null);
    // const [fileChapter, setFileChapter] = useState<string | null>(null);
    var fileChapter = null;
    const { authState } = useContext(AuthContext)

    // TH truyện đang cập nhật nội dung hoặc để trống nhưng creator bấm thoát ra
    useEffect(() => {

    })

    // useEffect(() => {
    //     const getContent = async () => {
    //         console.log(chapter.fileContent);
    //         const pdfContent = await RNFS.readFile({uri:chapter.fileContent}, 'base64');
    //         console.log('hello:', pdfContent);
    //     }
    //     getContent();
    // }, []);
    // useEffect(() => {
    //     // Fetch HTML file
    //     const fecthHTMLFromPdf = async () => {
    //         const formData = new FormData();
    //         formData.append('File', chapter.fileContent)
    //         formData.append('StoreFile', true);
    //         const resData = await convertPdfToHtml(formData);

    //         if (resData && resData.Files && resData.Files.length > 0) {
    //             const firstFile = resData.Files[0];

    //             if (firstFile && firstFile.Url) {
    //                 const url = firstFile.Url;
    //                 console.log('URL:', url);

    //                 // Now you can fetch the content using the obtained URL
    //                 fetch(url)
    //                     .then(response => response.text())
    //                     .then(data => {
    //                         // Update state with HTML content
    //                         // const bodyContentMatch = data.match(/<body.*?>([\s\S]*?)<\/body>/i);

    //                         // // Check if there's a match
    //                         // if (bodyContentMatch && bodyContentMatch.length > 1) {
    //                         //     data = bodyContentMatch[1];
    //                         //     // Remove style attribute from all elements
    //                         //     // data = data.replace(/class="[^"]*"/gi, '');
    //                         //     // data = data.replace(/style="[^"]*"/gi, '');
    //                         //     console.log(data);
    //                         // } else {
    //                         //     console.log('No <body> tag found or empty content.');
    //                         // }
    //                         setContent(data);
    //                         console.log(data);
    //                         setHtmlContent(`${data}`);
    //                         setIsLoading(false);
    //                     })
    //                     .catch(error => console.error('Error fetching HTML:', error));
    //             } else {
    //                 console.error('Error: No URL found in the response');
    //             }
    //         } else {
    //             console.error('Error: No files found in the response');
    //         }

    //     }
    //     fecthHTMLFromPdf();
    // }, []);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, [])

    const handleEditChapter = async () => {
        console.log('Title', title, 'content', content)

        if (title === '' || content === '') {
            Toast.show({
                type: 'error',
                text1: 'Your title or content is missing',
            });
            return;
        }

        console.log(content)
        let options = {
            html: `<html><body>${content}</body></html>`,
            // html: '<html><body><h1>Hello</h1><div><p>Hi</p></div></body></html>',
            fileName: 'newChapter',
            directory: 'Documents',
            base64: true,
        };

        try {
            // const pdfContent = await RNFS.readFile(chapter.fileContent, 'base64');
            // console.log('hello:', pdfContent);
            const file = await RNHTMLtoPDF.convert(options);
            console.log(file);
            if (file.filePath) {
                const data = {
                    Id: novel.id,
                    Name: chapter.name,
                    Discount: chapter.discount,
                    FeeId: chapter.feeId,
                    IsPublished: chapter.isPublished,
                    Views: novel.views,
                    IsLocked: true,
                    ApprovalStatus: chapter.approvalStatus,
                    File: file.filePath,
                    accessToken: authState.accessToken
                }
                const response = await editChapterApi(data);

                console.log(response);
            }
            setPdfFilePath(file.filePath || null);
        } catch (error) {
            console.error('Error creating PDF:', error);
        }
    };

    const handleSetHeader = async (header: string) => {
        setTitle(header);
    }
    const handleSetContent = async (content: string) => {
        setContent(content);
    }

    useEffect(() => {
        function onKeyboardDidShow(e: KeyboardEvent) {
            setKeyboardHeight(e.endCoordinates.height);
            setKeyBoardShow(true);
        }

        function onKeyboardDidHide() {
            setKeyboardHeight(0);
            setKeyBoardShow(false);
        }

        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        console.log(keyboardHeight);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };

    }, [keyboardHeight]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    if (content == '') {
                        Alert.alert('You are editing your chapter', 'Do you want to save your change', [
                            {
                                text: 'Cancel',
                                onPress: () => {
                                    navigation.goBack();
                                },
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: () => {

                                },
                                style: 'cancel',
                            }
                        ]);
                    }
                }}>
                    <Icon style={{ marginRight: 10 }} name="arrow-left" size={24} />
                </TouchableOpacity>
            ),
            title: chapter.name,
            headerRight: () => (
                <Button
                    onPress={() => {
                        handleEditChapter()
                    }}
                    title="Edit"
                />
            ),
        });
    }); //, [navigation, novel]


    const setHeaderTextRef = (ref: any) => {
        if (ref) {
            headerText.current = ref;
        }
    };

    const setRichTextRef = (ref: any) => {
        if (ref) {
            richText.current = ref;
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView>
                <ActivityIndicator color="black" size={"large"} />
            </SafeAreaView>
        );

    }

    return (
        <SafeAreaView style={{ backgroundColor: '#333' }}>
            <ScrollView style={{ height: '100%' }}>
                <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.container}>
                    <TextInput
                        placeholder="Nhập tiêu đề chương"
                        onChangeText={(header) => {
                            console.log(header)
                            setTitle(header);
                            handleSetHeader(header)
                        }}
                        value={title}
                        ref={setHeaderTextRef}
                        style={styles.headerInput}
                    />
                    <RichEditor
                        placeholder="Nhập văn bản chính ..."
                        ref={setRichTextRef}
                        onChange={(descriptionText) => {
                            console.log(descriptionText)
                            setContent(descriptionText);
                            handleSetContent(descriptionText);
                        }}
                        // initialContentHTML={content}
                        initialContentHTML={content}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

            <RichToolbar
                editor={richText}
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.keyboard, actions.undo, actions.redo]}
                iconMap={{ [actions.heading1]: handleHead }}
                style={[styles.toolbar, !keyboardShow && { height: 50 }]}
            />


        </SafeAreaView >
    );
};
export default EditChapter;
const styles = StyleSheet.create({
    container: {
        minHeight: 600,
        backgroundColor: '#FFFFFF',
        margin: 10,
        flex: 1,
        borderRadius: 10,
        padding: 10,
        height: '100%',
    },
    headerContainer: {
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerInput: {
        // flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textInput: {
        fontSize: 16,
    },
    toolbar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        //zIndex: 1,
    },
    pdf: {
        // flex: 1,
        backgroundColor: '#EBEBEB',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});


