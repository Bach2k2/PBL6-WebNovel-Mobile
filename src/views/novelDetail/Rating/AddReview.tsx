import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Stars from '../../../components/StarRating/Stars'
import { TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddReview = ({ navigation }: any) => {
    const [starRating, setStarRating] = useState(0);
    const [isRating, setIsRating] = useState(false);
    const [comment, setComment] = useState('');
    const [isDisabledButton, setIsDisabled] = useState(true);

    const characterLimit = 40;

    useEffect(() => {
        console.log('star rating', starRating)
    }, [starRating])
    useEffect(() => {
        if (comment.length > characterLimit) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [comment])
    const handleCreateReview = () => {
        console.log('Hello')

        if (comment.length > characterLimit) {
            // isDisabledButton = false;

        }
    };
    useEffect(() => {
        navigation.setOptions({
            title: 'Add a review',
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    handleCreateReview()
                }} style={isDisabledButton ? styles.disabledButton : styles.button} disabled={isDisabledButton}>
                    <Text style={isDisabledButton ? styles.disabledText : styles.buttonText} disabled={isDisabledButton}>Post</Text>
                </TouchableOpacity>
            ),
        });
    }, [comment]); //, [navigation, novel]

    return (
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Stars setStarRating={setStarRating} />
                <TouchableOpacity onPress={() => {

                    setIsRating(!isRating)
                }}>
                    {
                        isRating ? (<MaterialCommunityIcons name='check' size={20} />) : (<MaterialCommunityIcons name='trash-can-outline' size={20} />)
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.commentContainer}>
                <TextInput
                    style={[styles.inputField, { height: 100, textAlignVertical: 'top' }]}
                    value={comment}
                    onChangeText={(comment) => { setComment(comment) }}
                    multiline={true}
                    numberOfLines={4}
                    placeholder='Review should be more than 40 characters'
                />
                <Text style={styles.characterCount}>
                    {comment.length}/{characterLimit}
                </Text>
            </View>
            <View style={styles.otherContainer}>
                <Text style={{ fontSize: 12 }}>We will publish your evaluation of the work in various places,
                    which will help other readers understand this work! </Text>
            </View>

        </View>
    )
}

export default AddReview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        // justifyContent:'center',
        alignItems: 'center',
    },
    ratingContainer: {
        // flexDirection:'row',
        // flex:1,
        marginTop: 10,
        width: '97%',
        borderRadius: 10,
        backgroundColor: '#FFFF',

    }, commentContainer: {
        marginTop: 10,
        width: '97%',
        borderRadius: 10,
        backgroundColor: '#FFF'
    },
    inputField: {
        borderRadius: 1,
    },
    characterCount: {
        alignSelf: 'flex-end',
        color: 'gray',
        marginTop: 5,
    },
    otherContainer: {
        margin: 10,
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#00a2ed',
        padding: 10,
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
        margin: 2
    },
    disabledButton: {
        borderRadius: 10,
        backgroundColor: '#EBEBEB',
        padding: 10,
    },
    disabledText: {
        fontSize: 15,
        color: 'gray',
        margin: 2
    },


})