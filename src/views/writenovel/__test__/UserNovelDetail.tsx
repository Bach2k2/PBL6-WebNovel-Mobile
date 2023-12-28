import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import UserChaptersDetail from '../Chapter/UserChaptersDetail'
import NovelInforSettings from '../NovelInforSettings'

const listTab = [
    {
        status: 'All',
    },
    {
        status: 'Danh sách chương',
    },
    {
        status: 'Cài đặt thông tin',
    }
]
const routes = [
    { key: 'chapterList', title: 'Danh sách chương' },
    { key: 'novelInfor', title: 'Thông tin chương' },

]
const renderScene = ({ route }: any) => {
    switch (route.key) {
        case 'chapterList':
            return <UserChaptersDetail />
            break;
        case 'novelInfor':
            return <NovelInforSettings />
            break
    }
}
const UserNovelDetail = () => {
    const [status, setStatus] = useState('chapterList');
    const setStatusFilter = (status: string) => {
        setStatus(status);
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.listTab}>
                    {
                        routes.map((item) => (
                            <TouchableOpacity key={item.key}
                                onPress={() => {
                                    setStatusFilter(item.key)
                                    // renderScene(item);
                                    
                                }}
                                style={[styles.btnTab, status == item.key && styles.btnTabStatus]}>
                                <Text style={[styles.textTab, status == item.key && styles.textTabStatus]}>{item.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default UserNovelDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    listTab: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        flexDirection: 'row'
    },
    btnTab: {
        // width: Dimensions.get('window').width / 3.5,
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#EBEBEB',
        padding: 10,
        justifyContent: 'center',
        height: 70,
    },
    textTab: {
        fontSize: 16,
        color: 'black'
    },
    btnTabStatus: {
        backgroundColor: '#E6838D',
    },
    textTabStatus: {
        color: '#fff'
    }
})