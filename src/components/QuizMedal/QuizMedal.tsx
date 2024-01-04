import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const RankBackground = ({ rank, children }: { rank: number, children: any }) => {
    let view = null;
    switch (rank) {
        case 1:
            view =
                (
                    <ImageBackground style={styles.imgBackground} source={require('../../assets/icons/gold-medal.png')}>
                        {children}
                    </ImageBackground>
                );
            break;
        case 2:
            view =
                (
                    <ImageBackground style={styles.imgBackground} source={require('../../assets/icons/silver-medal.png')}>
                        {children}
                    </ImageBackground>
                );
            break;
        case 3:
            view =
                (
                    <ImageBackground style={styles.imgBackground} source={require('../../assets/icons/bronze-medal.png')}>
                        {children}
                    </ImageBackground>
                );
            break;
        default:
            view = (
                <View style={styles.noRankBackground}>
                    {children}
                </View>
            );
            break;
    }
    return view
};

const QuizMedal = ({ rank }: { rank: number }) => {

    return (
        <View style={styles.quizMedal}>
            <RankBackground rank={rank}>
                <Text style={styles.textRank}>{rank}</Text>
            </RankBackground>

        </View>
    );
};

const styles = StyleSheet.create({
    quizMedal: {
        position: 'relative',
        width: 50, height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    imgBackground: {
        width: 50, height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noRankBackground:{
        backgroundColor: 'gray',
        width: 35, height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textRank: {
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 10,
        fontWeight: 'bold'
    }
});
export default QuizMedal;
