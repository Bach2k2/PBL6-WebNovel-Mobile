import { StyleSheet, View } from "react-native";
import getBookmarkedData from "../../hook/BookmarkedApi";
import { useEffect, useState, useContext } from "react";
import { Bookmarked } from "../../models/Bookmarked";
const PreferenceNovels = () => {
    //   const [bookmarkedData, setBookmarkedData] = useState<Bookmarked>([]);

    useEffect(() => {
        const fetchBookmarkedData = async () => {
            await getBookmarkedData().then((data) => {
                console.log(data);
                // setBookmarkedData(data);
            }).catch((error) => {
                console.log(error);
            })
        }
        fetchBookmarkedData();
    }, []);
    return (
        <View style={styles.container} >
            <View style={styles.row}>
                {/* {bookmarkedData.map((index, data)=>
            (
                <View>
                    <Text></Text>
                </View>
            )

            )} */}
            </View>
        </View>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        marginLeft: 7,
    }


});
export default PreferenceNovels; PreferenceNovels

