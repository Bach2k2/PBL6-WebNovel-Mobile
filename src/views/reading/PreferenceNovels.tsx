import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import getBookmarkedData from "../../hook/BookmarkedApi";
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { Bookmarked } from "../../models/Bookmarked";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import getPreferenceData from "../../hook/PreferenceApi";
import { Preference } from "../../models/Preference";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import CustomEditReading from "../../components/BottomSheet/PreferenceEditBS";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from 'prop-types';
const PreferenceNovels = (props:any) => {
    const { authState, getUserData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    // const [isGrid, setIsGrid] = useState(true);
    const isGrid = props.isGrid;
    const [preferenceData, setPreferenceData] = useState<Preference[]>([]);
    const navigation = useNavigation();
    const user = getUserData();

    const prevPreferenceDataRef = useRef<Preference[]>([]);

    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const toggleBottomSheet = () => {
        setBottomSheetVisible(!isBottomSheetVisible);
    };
    // Fetch preference data
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    if (authState.authenticated) {
                        // console.log("call api preference");
                        const data = await getPreferenceData(user, authState.accessToken);
                        setPreferenceData(data);
                        // console.log(data); // Log the updated preferenceData
                    } else {
                        console.log("get preferList from AsyncStorage");
                        const storedData = await AsyncStorage.getItem('preferList');
                        if (storedData) {
                            const parsedData = JSON.parse(storedData);
                            setPreferenceData(parsedData); // add this array to understand
                            // console.log(parsedData.length);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();

            return () => {
                // Cleanup or clear any subscriptions if needed
            };
        }, [authState.authenticated, user])
    );

    // Process with each row of grid
    const renderRow = (row: number) => {
        return (
            <View style={styles.row} key={row}>
                {preferenceData.slice(row * 3, (row + 1) * 3).map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.itemContainer}
                        onPress={() => {
                            navigation.navigate('NovelDetail', { novelId: item.novelId, title: item.name });
                        }}
                    >
                        <Image source={{ uri: item.imagesURL }} style={styles.image} />
                        <Text numberOfLines={1} style={styles.text}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    // if (!authState.authenticated) {
    //     return (
    //         <View style={styles.container} >
    //             <Text style={styles.warningText} numberOfLines={2} >Bạn hãy đăng nhập để có thể xem lại dấu trang của truyện đã đọc</Text>
    //         </View>
    //     );
    // }
    if (preferenceData.length == 0) {
        return (
            <View style={styles.nodataContainer} >
                <Image source={require('../../assets/img/nodatapresent.png')} style={{ height: 100, width: 100 }} />
                <Text style={styles.warningText}>Không có dữ liệu</Text>
            </View>
        );
    }
   // Process with each row of grid
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>{Array.from({ length: Math.ceil(preferenceData.length / 3) }, (_, i) => renderRow(i))}</View>
            </ScrollView>
        </View>
    );

};
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // width: '100%',
        // alignItems: 'stretch',
        // // backgroundColor:'red',
    },
    warningText: {
        fontSize: 20,
        textAlign: "center",
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    nodataContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '33%',
        flexDirection: 'column',
    },
    image: {
        width: 90,
        height: 120,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black'
    },
    text: {
        marginTop: 5,
        textAlign: 'center',
    },
});

export default PreferenceNovels;

