import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export function LoadingAnimation() {
    const [color, setColor] = useState('teal');
    useEffect(() => {
        const id = setInterval(() => {
            setColor((color) => color == 'teal' ? 'royalblue' : 'teal');
        }, 700);
        return () => clearInterval(id);
    }, []);

    return (
        <View style={styles.indicatorWrapper}>
            <ActivityIndicator size="large" color={color} style={styles.indicator} />
            <Text style={styles.indicatorText}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    indicatorWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        padding: 12,
        backgroundColor: '#555',
        borderRadius: 12
    },
    indicatorText: {
        fontSize: 18,
        marginTop: 12,
    }
});
