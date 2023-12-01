import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, TextInput, View, StyleSheet, Button, Dimensions, TouchableOpacity } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { Keyboard, KeyboardEvent } from 'react-native';
import Toast from "react-native-toast-message";
import { AuthContext } from "../../../context/AuthContext";
import { postChapter } from "../../../hook/ChapterApi";
import Pdf from "react-native-pdf";
var RNFS = require('react-native-fs');
const handleHead = ({ tintColor }: any) => <Text style={{ color: tintColor }}>H1</Text>;

const CreateChapter = ({ route, navigation }: any) => {
    const { novel } = route.params
    const [chapterTitle, setChapterTitle] = useState("");
    const [chapterContent, setChapterContent] = useState("");
    const headerText = useRef();
    const richText = useRef();
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [keyboardShow, setKeyBoardShow] = useState(false);
    const [pdfFilePath, setPdfFilePath] = useState<string | null>(null);
    // const [fileChapter, setFileChapter] = useState(null);
    // const [fileChapter, setFileChapter] = useState<string | null>(null);
    var fileChapter = null;
    const { authState } = useContext(AuthContext)

    const handleCreateChapter = async () => {
        // const { htmlContent } = content;
        console.log('Title', chapterTitle, 'content', chapterContent)

        if (chapterTitle === '' || chapterContent === '') {
            Toast.show({
                type: 'error',
                text1: 'Your title or content is missing',
            });
            return;
        }

        let options = {
            html: `<html><body>${chapterContent}</body></html>`,
            // html: '<html><body><h1>Hello</h1><div><p>Hi</p></div></body></html>',
            fileName: 'newChapter',
            directory: 'Documents',
            base64: true,
        };

        try {
            const file = await RNHTMLtoPDF.convert(options);
            console.log(file);
            if (file.filePath) {
                //  const pdfContent = await RNFS.readFile(file.filePath, 'base64');
                // console.log(pdfContent);
                // const fileBlob = await fetch(file.filePath).then(response => response.blob());//type network error
                const data = {
                    name: chapterTitle,
                    novelId: novel.id,
                    file: file,
                    accessToken: authState.accessToken,
                }
                const response = await postChapter(data);

                console.log(response);
            }
            // setPdfFilePath(file.filePath || null);
        } catch (error) {
            console.error('Error creating PDF:', error);
        }
    };

    useEffect(() => {
        console.log('Title updated:', chapterTitle);
    }, [chapterTitle]);

    useEffect(() => {
        console.log('Content updated:', chapterContent);
    }, [chapterContent]);
    // useEffect(() => {
    //     if (chapterTitle !== '' && chapterContent !== '') {
    //         handleCreateChapter();
    //     }
    // }, [chapterTitle, chapterContent]);
    // const handleSetHeader = async (header: string) => {
    //     setChapterTitle(header);
    // }
    // const handleSetContent = async (content: string) => {
    //     setChapterContent(content);
    // }

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
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };

    }, [keyboardHeight]);

    useEffect(() => {
        navigation.setOptions({
            title: novel.name,
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    handleCreateChapter()
                }} style={styles.button}>
                    <Text style={styles.buttonText}>Publish</Text>
                </TouchableOpacity>

            ),
        });
    }, [navigation, novel]);


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

    return (
        <SafeAreaView style={{ backgroundColor: '#333' }}>
            <ScrollView style={{ height: '100%' }}>
                <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.container}>
                    <TextInput
                        placeholder="Type the title for chapter"
                        onChangeText={(header) => {
                            setChapterTitle(header);
                            console.log('title', chapterTitle)
                            // handleSetHeader(header)
                        }}
                        value={chapterTitle}
                        ref={setHeaderTextRef}
                        style={styles.headerInput}
                    />
                    <RichEditor
                        placeholder="Type your main story"
                        ref={setRichTextRef}
                        onChange={(descriptionText) => {
                            setChapterContent(descriptionText);
                            console.log('content: ', chapterContent)
                            // handleSetContent(descriptionText);
                        }}
                        initialContentHTML={chapterContent}
                    />
                    {/* {pdfFilePath && (<Pdf
                        trustAllCerts={false}
                        source={{ uri: pdfFilePath }}
                        style={styles.pdf} />)

                    } */}

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
export default CreateChapter;
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
    button: {
        borderRadius: 10,
        backgroundColor: '#00a2ed',
        padding: 10,
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
        margin: 2
    }
});


