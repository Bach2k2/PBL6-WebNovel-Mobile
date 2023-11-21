import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { Animated, LayoutChangeEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = ({ tabWidth, navigation, state, descriptors, index }: any) => {
    const tab = state.routes[index];
    const activeTab = state.routes[state.index];
    const tabIsActive = tab.name === activeTab.name;
    const tabName = descriptors[tab.key].options.title ?? tab.name;

    const containerStyle = [styles.tab, { width: tabWidth }];
    const textStyle = [
        styles.tabText,
        tabIsActive && styles.activeText,
        !tabIsActive && styles.inactiveText,
    ];

    const onPress = () => navigation.navigate(tab.name);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={containerStyle}>
            <Text style={textStyle}>{tabName}</Text>
        </TouchableOpacity>
    );
};
export const CustomTabBar = (props: MaterialTopTabBarProps) => {
    const routes = props.state.routes;
    const [tabBarWidth, setTabBarWidth] = useState<number>(0);

    if (routes.length <= 0) return null;

    const tabWidth = tabBarWidth / (routes.length ?? 1);
    const translateX = props.position.interpolate({
        inputRange: routes.map((_, index) => index),
        outputRange: routes.map((_, index) => index * tabWidth),
    });

    const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
        const width = nativeEvent.layout.width;
        setTabBarWidth(width);
    };

    const animatedTabStyles = [
        styles.selectedTab,
        { width: tabWidth, transform: [{ translateX }] },
    ];

    return (
        <View style={styles.tabcontainer} onLayout={onLayout} >
            <Animated.View style={animatedTabStyles} />
            {
                routes.map((_, index) => (
                    <Tab key={_.key} {...props} index={index} />
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    tabcontainer: {
        flexDirection: 'row',
        marginBottom: 10,
        // justifyContent: 'flex-start',
    },
    tab: {
        flex:1,
        justifyContent: 'center',
        height: 50,
        // marginLeft: 10,
        // alignItems:'center',
        // alignSelf:'center',
    },
    tabText: {
        textAlign: 'center',
        color: '#707070',
        paddingBottom: 2,
    },
    activeText: {
        color: '#424242',
        fontSize: 16,
        fontWeight: 'bold'
    },
    inactiveText: {
        color: '#707070',
        fontSize: 16,
        fontWeight: 'bold'
    },
    selectedTab: {
        height: 4,
        position: 'absolute',
        borderRadius: 50,
        backgroundColor: '#434343',
        bottom: 0,
    },
});