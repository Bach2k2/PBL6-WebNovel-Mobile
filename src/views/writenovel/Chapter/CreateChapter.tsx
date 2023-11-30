import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, TextInput, View, StyleSheet, Button, Dimensions, } from "react-native";
import { PermissionsAndroid } from 'react-native';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { printToFileAsync } from 'expo-print';
import { Keyboard, KeyboardEvent } from 'react-native';
import Toast from "react-native-toast-message";
import { AuthContext } from "../../../context/AuthContext";
import { postChapter } from "../../../hook/ChapterApi";
import Pdf from "react-native-pdf";
const handleHead = ({ tintColor }: any) => <Text style={{ color: tintColor }}>H1</Text>;

const CreateChapter = ({ route, navigation }: any) => {
    const { novel } = route.params
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const headerText = useRef();
    const richText = useRef();
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [keyboardShow, setKeyBoardShow] = useState(false);
    const [pdfFilePath, setPdfFilePath] = useState<string | null>(null);
    // const [fileChapter, setFileChapter] = useState(null);
    // const [fileChapter, setFileChapter] = useState<string | null>(null);
    var fileChapter = null;
    const { authState } = useContext(AuthContext)
    // const isPermitted = async () => {
    //     if (Platform.OS === 'android') {
    //         try {
    //             const rationale: PermissionsAndroid.Rationale = {
    //                 title: 'External Storage Write Permission',
    //                 message: 'App needs access to Storage data',
    //                 buttonPositive: 'OK', // Add this property
    //             };

    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //                 rationale,
    //             );

    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         } catch (err) {
    //             alert('Write permission err', err);
    //             return false;
    //         }
    //     } else {
    //         return true;
    //     }
    // };


    const isPermitted = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs access to Storage data',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err: any) {
                Alert.alert('Write permission err', err);
                return false;
            }
        } else {
            return true;
        }
    };

    const handleCreateChapter = async () => {
        // const { htmlContent } = content;
        // if (await isPermitted()) {
        console.log('Title', title, 'content', content)

        // if (title === '' || content === '') {
        //     Toast.show({
        //         type: 'error',
        //         text1: 'Your title or content is missing',
        //     });
        //     return;
        // }

        let options = {
            //   html: `<html><body>${content}</body></html>`,
            html: '<h1>HelloBaba</h1>',
            fileName: 'lol',
            directory: 'Documents',
            // base64: true,
        };

        try {
            // const file = await RNHTMLtoPDF.convert(options);
            const file = await printToFileAsync({
                html: '<html><body><h1>HelloHowaboutyouhahahah?</h1></body></html>',
                base64: true,
            });
            console.log(file);

            if (file.uri) {
                // const fileBlob = await fetch(file.filePath).then(response => response.blob());//type network error
                const data = {
                    name: title,
                    novelId: novel.id,
                    file: file,
                    accessToken: authState.accessToken,
                }
                const response = await postChapter(data);

                console.log(response);
            }


            setPdfFilePath(file.uri || null);

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
            title: novel.name,
            headerRight: () => (
                <Button
                    onPress={() => {
                        handleCreateChapter()
                    }}
                    title="Publish this chapter"
                />
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
            <ScrollView>
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
                        initialContentHTML={content}
                    />
                    {/* {pdfFilePath && (<Pdf
                        trustAllCerts={false}
                        source={{ uri: pdfFilePath, cache: false }}
                        style={styles.pdf} />)

                    } */}

                </KeyboardAvoidingView>
            </ScrollView>

            <RichToolbar
                editor={richText}
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.keyboard, actions.undo, actions.redo]}
                iconMap={{ [actions.heading1]: handleHead }}
                style={[styles.toolbar]}
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});


