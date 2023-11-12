import React, { useContext } from 'react';
import { View, useWindowDimensions } from 'react-native'
import Header from '../../components/Header/Header';
import { TabView, SceneMap } from 'react-native-tab-view';
import BookmarkNovels from './BookmarkNovels';
import PreferenceNovels from './PreferenceNovels';
import { AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Reading() {
    const layout = useWindowDimensions();
    const authContext = useContext(AuthContext);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'preference', title: 'Library' },
        { key: 'bookmarked', title: 'History' },
        { key: 'edit', title: '', icons: (<Icon name={'dots-horizontal'} size={20} />) },

    ]);

    const renderScene = SceneMap({
        preference: () => <PreferenceNovels />,  // Render the components directly here
        bookmarked: () => <BookmarkNovels />,
        edit: () => (<View><Icon name={'dots-horizontal'} size={20} /></View>)
    });

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    );
}

export default Reading;
