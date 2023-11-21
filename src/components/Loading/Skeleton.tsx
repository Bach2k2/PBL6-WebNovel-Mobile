import React, { useState, useEffect, useRef } from 'react';
import {
    View, StyleSheet, Animated, Easing
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
const Skeleton = ({ height, width, style }: any) => {
    const translateX = useRef(new Animated.Value(-width)).current;
    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(translateX, {
                toValue: width,
                useNativeDriver: true,
                duration: 1600,
                easing: Easing.linear,
            })
        );
        animation.start();
        return () => animation.stop();
    }, [width, translateX]);
    return (
        <View style={StyleSheet.flatten(
            [
                {
                    width: width,
                    height: height,
                    backgroundColor: "rgba(0,0,0,0.12)",
                    overflow: "hidden"
                },
                style
            ]
        )}>
            <Animated.View style={{
                width: '100%', height: '100%',
                transform: [{
                    translateX: translateX
                }],
            }}>
                <LinearGradient style={{ width: '100%', height: '100%' }}
                    colors={['transparent', 'rgba(255, 255, 255, 0.6)', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }} />

            </Animated.View>
        </View>
    );
}

export default Skeleton;
