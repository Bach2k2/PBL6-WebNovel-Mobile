import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

// import {Clock} from "react-native-reanimated"

const { width } = Dimensions.get("window");

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);
const SkeletonComponent = ({ children, styles }: any) => {
    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
    });

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width * 2, width * 2],
    });

    return (
        <View
            style={{
                backgroundColor: "#a0a0a0",
                borderColor: "#b0b0b0",
                height: 150,
                width: width,
            }}
        >
            <AnimatedLG
                colors={["#a0a0a0", "#b0b0b0", "#b0b0b0", "#a0a0a0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    // ...StyleSheet.absoluteFill,
                    transform: [{ translateX: translateX }],
                }}
            />
            {children}
        </View>
    );
}
export default SkeletonComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});


