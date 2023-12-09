import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableWithoutFeedback,
    Animated,
    PanResponder,
    TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Stars = (props: any) => {
    const { stars, setStarRating } = props;
    const [starRating, setLocalStarRating] = useState(stars);
    // const [starRating, setStarRating] = useState(0);
    const animatedButtonScale = new Animated.Value(1);

    useEffect(() => {
        console.log('stars ha', stars)
        setLocalStarRating(props.stars);
    }, [stars,starRating]);
    const handlePressIn = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 1.5,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };


    const animatedScaleStyle = {
        transform: [{ scale: animatedButtonScale }],
    };
    return (
        <View style={styles.container}>
            {/* <Text style={styles.heading}>Tap to rate: {starRating ? `${starRating}*` : ''}</Text> */}
            <View style={styles.stars}>
                <TouchableWithoutFeedback
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => {
                        setStarRating(1)
                        setLocalStarRating(1)
                        props.setStarRating(1)
                    }}
                >
                    <Animated.View style={animatedScaleStyle}>
                        <MaterialIcons
                            name={starRating >= 1 ? 'star' : 'star-border'}
                            size={32}
                            style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => {
                        //setStarRating(2)
                        setLocalStarRating(2)
                        props.setStarRating(2)
                    }}
                >
                    <Animated.View style={animatedScaleStyle}>
                        <MaterialIcons
                            name={starRating >= 2 ? 'star' : 'star-border'}
                            size={32}
                            style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => {
                        setStarRating(3)
                        setLocalStarRating(3)
                        props.setStarRating(3)
                    }}
                >
                    <Animated.View style={animatedScaleStyle}>
                        <MaterialIcons
                            name={starRating >= 3 ? 'star' : 'star-border'}
                            size={32}
                            style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => {

                        setLocalStarRating(4)
                        props.setStarRating(4)
                    }}
                >
                    <Animated.View style={animatedScaleStyle}>
                        <MaterialIcons
                            name={starRating >= 4 ? 'star' : 'star-border'}
                            size={32}
                            style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => {
                        setLocalStarRating(5)
                        props.setStarRating(5)
                    }}
                >
                    <Animated.View style={animatedScaleStyle}>
                        <MaterialIcons
                            name={starRating >= 5 ? 'star' : 'star-border'}
                            size={32}
                            style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

export default Stars

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    stars: {
        display: 'flex',
        flexDirection: 'row',
    },
    starUnselected: {
        color: '#aaa',
    },
    starSelected: {
        color: '#ffb300',
    },
})