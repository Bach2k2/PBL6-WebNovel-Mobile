import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import Modal from 'react-native-modal'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RadioButton } from 'react-native-paper';
import { postReportApi } from '../../hook/ReportApi';

const ReportIssues = ({ isVisible, onClose, novel }: any) => {
    const navigation = useNavigation();
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(''); // 'preference' or 'language'
    const [disableReport, setDisableReport] = useState(false);
    const { getUserData, authState } = useContext(AuthContext)
    const handleRadioButtonPress = (option: any) => {
        setSelectedOption(option);
    };
    const handleReport = () => {
        console.log(selectedOption)
        if (getUserData()) {
            const sendReport = async () => {
                const data = {
                    accountId: getUserData()?.id,
                    novelId: novel.id,
                    reason: selectedOption
                }
                const res = await postReportApi(data, authState.accessToken)
                console.log(res)
                Alert.alert('Success')
                onClose()
            }
            sendReport()
        } else {
            Alert.alert('Please sign in first')
            onClose();
        }

    }

    useEffect(() => {
        if (selectedOption == '') {
            setDisableReport(true);
        } else {
            setDisableReport(false)
        }
    })


    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.bottomModal}
            backdropOpacity={0.5}
        >
            <View style={styles.modalHeader}>
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle}></View>
                </View>
            </View>
            <View style={styles.modalContent}>
                <Text style={styles.titleText}>Report abuse</Text>
                <Text style={styles.titleText}>copyright infringement issues please send mail to </Text>
                <View style={styles.textContainer}>
                    <View style={{ margin: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.selectedText}>Pornographic content</Text>
                            <RadioButton
                                value="Pornographic content"
                                status={selectedOption === 'Pornographic content' ? 'checked' : 'unchecked'}
                                onPress={() => handleRadioButtonPress('Pornographic content')}
                            />
                        </View>

                        <View style={styles.panelLine}>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.selectedText}>Hate or bullying</Text>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <RadioButton
                                    value="Hate or bullying"
                                    status={selectedOption === 'Hate or bullying' ? 'checked' : 'unchecked'}
                                    onPress={() => handleRadioButtonPress('Hate or bullying')}
                                />
                            </View>
                        </View>

                        <View style={styles.panelLine}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.selectedText}>Release of personal info</Text>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <RadioButton
                                    value="Release of personal info"
                                    status={selectedOption === 'Release of personal info' ? 'checked' : 'unchecked'}
                                    onPress={() => handleRadioButtonPress('Release of personal info')}
                                />
                            </View>
                        </View>
                        <View style={styles.panelLine}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.selectedText}>Other inappropriate material</Text>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <RadioButton
                                    value="Other inappropriate material"
                                    status={selectedOption === 'Other inappropriate material' ? 'checked' : 'unchecked'}
                                    onPress={() => handleRadioButtonPress('Other inappropriate material')}
                                />
                            </View>
                        </View>
                        <View style={styles.panelLine}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.selectedText}>Spam</Text>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <RadioButton
                                    value="Spam"
                                    status={selectedOption === 'Spam' ? 'checked' : 'unchecked'}
                                    onPress={() => handleRadioButtonPress('Spam')}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#67F5DD', marginTop: 10, borderRadius: 10, flex: 0.48, justifyContent: 'center', alignItems: 'center', marginRight: 10, }} onPress={onClose}>
                        <Text style={styles.closeButton}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={disableReport ? styles.disableReportButton : styles.reportButton} onPress={() => { handleReport() }}>
                        <Text style={disableReport ? styles.disableReportButtonText : styles.reportButtonText}>Report</Text>
                    </TouchableOpacity>
                </View>

            </View >
        </Modal >
    );
};
export default ReportIssues;

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,

    },
    modalHeader: {
        // backgroundColor: '#FFFFFF',
        backgroundColor: '#f5f6fc',
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
        backgroundColor: '#f5f6fc',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
    },
    closeButton: {
        // marginTop: 10,
        padding: 10,
        color: '#333',
        fontSize: 18,
    }, panelLine: {
        width: '95%',
        height: 1,
        backgroundColor: '#EBEBEB',
        marginTop: 10,
        marginBottom: 10,
    }
    , textContainer: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        width: '97%',
        borderRadius: 15,
        marginTop: 5,
        padding: 10,
    }
    , titleText: {
        color: '#333',
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 'auto',
    }, bodyText: {
        fontSize: 18,
    },
    selectedText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '700',
        marginRight: 'auto',
        marginLeft: 10,
    },
    reportButtonText: {
        // marginTop: 10,
        padding: 10,
        color: '#333',
        fontSize: 18,
    },
    reportButton: {
        backgroundColor: '#67F5DD',
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.48
    },

    disableReportButton: {
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.48,
        backgroundColor: '#F0F0F0'
    },
    disableReportButtonText: {
        // marginTop: 10,
        padding: 10,
        color: 'gray',
        fontSize: 18,
    },
});

