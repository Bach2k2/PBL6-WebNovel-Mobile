import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const ShowStars = ({ ratingScores }: { ratingScores: number }) => {
    return (
        <View style={styles.stars}>
            <MaterialIcons name="star-border" size={15} style={(ratingScores >= 1) ? styles.starSelected : styles.starUnselected} />
            <MaterialIcons name="star-border" size={15} style={(ratingScores >= 2) ? styles.starSelected : styles.starUnselected} />
            <MaterialIcons name="star-border" size={15} style={(ratingScores >= 3) ? styles.starSelected : styles.starUnselected} />
            <MaterialIcons name="star-border" size={15} style={(ratingScores >= 4) ? styles.starSelected : styles.starUnselected} />
            <MaterialIcons name="star-border" size={15} style={(ratingScores == 5) ? styles.starSelected : styles.starUnselected} />
        </View>
    )
}

export default ShowStars

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