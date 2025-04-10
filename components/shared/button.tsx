import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Colors'

type ButtonProps = {
    text: string
    onPress: () => void
    style?: object
}

export default function Button({ text, onPress, style }: ButtonProps) {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.button, style]}
            >
                <Text style={[styles.text]} >{text}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.TEXT,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        marginTop: 20,
        padding: 15
    },
    text: {
        fontFamily: 'Gaga',
        color: '#fff',
        fontSize: 25,
        textAlign: 'center'
    },
})