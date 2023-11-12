import React, { useContext } from 'react';
import { View, Text, useWindowDimensions } from 'react-native'
import Header from '../../../components/Header/Header';
import { TabView, SceneMap } from 'react-native-tab-view';
import BookmarkNovels from '../BookmarkNovels';
import PreferenceNovels from '../PreferenceNovels';
import { AuthContext } from '../../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
function ReadingTest() {
    const layout = useWindowDimensions();
    const authContext = useContext(AuthContext);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'preference', title: 'Library' },
        { key: 'bookmarked', title: 'History' },
    ]);

    return (
        <SafeAreaView>
            <Header />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </SafeAreaView>


    );
}
// const BookmarkNovels = () => (
//     <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
// );

// const PreferenceNovels= () => (
//     <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
// );
const renderScene = SceneMap({
    preference: PreferenceNovels,
    bookmarked: BookmarkNovels,
});

export default ReadingTest;