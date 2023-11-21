import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import getBookmarkedData from "../../hook/BookmarkedApi";
import { useEffect, useState, useContext } from "react";
import { Bookmarked } from "../../models/Bookmarked";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import getPreferenceData from "../../hook/PreferenceApi";
import { Preference } from "../../models/Preference";
const PreferenceNovels = () => {
    const { authState, getUserData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isGrid, setIsGrid] = useState(true);
    const [preferenceData, setPreferenceData] = useState<Preference[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        console.log("auth: ", authState.accessToken);
        const user = getUserData();
        const fetchPrefenceData = async () => {
            await getPreferenceData(user, authState.accessToken).then((data) => {
                setPreferenceData(data);
                console.log(preferenceData);
            }).catch((error) => {
                console.log(error);
            })
        }
        if (authState.accessToken) {
            console.log("call api preference");
            fetchPrefenceData();
        }

    }, []);

    const renderRow = (row: number) => {
        return (
            <View style={styles.row} key={row}>
                {preferenceData.slice(row * 3, (row + 1) * 3).map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.itemContainer}
                        onPress={() => {
                            navigation.navigate('NovelDetail', { novelId: item.novelId });
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
    if (!authState.authenticated) {
        return (
            <View style={styles.container} >
                <Text style={styles.warningText} numberOfLines={2} >Bạn hãy đăng nhập để có thể xem lại dấu trang của truyện đã đọc</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View>{Array.from({ length: Math.ceil(preferenceData.length / 3) }, (_, i) => renderRow(i))}</View>
        </View>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningText: {
        fontSize: 20,
        textAlign: "center",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
    },
    image: {
        width: 70,
        height: 100,
        borderRadius: 3,
    },
    text: {
        marginTop: 5,
        textAlign: 'center',
    },
});
export default PreferenceNovels; PreferenceNovels

