import * as React from 'react';
import {
    Animated,
    View,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import PreferenceNovels from './PreferenceNovels';
import BookmarkNovels from './BookmarkNovels';
import Header from '../../components/Header/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PreferenceEditBS from '../../components/BottomSheet/PreferenceEditBS';
import BookmarkEditBS from '../../components/BottomSheet/BookmarkEditBS';
interface Route {
    key: string;
    title: string;
}

interface ReadingState {
    index: number;
    routes: { key: string; title: string }[];
    isBottomSheetVisible: boolean;
}


export default class Reading extends React.Component<{}, ReadingState> {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Library' },
            { key: 'second', title: 'History' },
        ],
        isBottomSheetVisible: false,
    };

    toggleBottomSheet = () => {
        this.setState((prevState) => ({
            isBottomSheetVisible: !prevState.isBottomSheetVisible,
        }));
    };
    _handleIndexChange = (index: any) => this.setState({ index });

    _renderTabBar = (props: any) => {
        const inputRange = props.navigationState.routes.map((x: any, i: any) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route: Route, i: number) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex: number) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });
                    const color = this.state.index == i ? 'black' : 'gray'

                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            key={i}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={[{ opacity, color }, styles.tabText]}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
                {/* Toggle for edit */}
                <View style={{ position: 'absolute', right: 20, top: 20 }}>
                    <TouchableOpacity onPress={this.toggleBottomSheet}>
                        <Icon name='dots-horizontal' size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    _renderScene = SceneMap({
        first: PreferenceNovels,
        second: BookmarkNovels,
    });


    render() {
        return (
            <View style={styles.container}>
                <Header />
                <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}
                />
                {/* Bottomsheet */}
                {this.state.index === 0 ? (
                    <PreferenceEditBS
                        isVisible={this.state.isBottomSheetVisible}
                        onClose={this.toggleBottomSheet}
                    />
                ) : (
                    <BookmarkEditBS
                        isVisible={this.state.isBottomSheetVisible}
                        onClose={this.toggleBottomSheet}
                    />
                )}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        // paddingTop: StatusBar.currentHeight || 0,
        height: 70,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 5,
        marginBottom: 10,
        // position: 'relative',
    },
    tabItem: {
        // alignItems: 'flex-start',
        paddingLeft: 16,
    },
    tabText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});

