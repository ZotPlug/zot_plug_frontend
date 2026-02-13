import React from "react"
import { Text, View, StyleSheet, } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../colors"

export type InfoCard = {
    title: string, 
    description: string,
}

export default function InfoCard({ 
    title, 
    description,
}: InfoCard) {

    return (
            <LinearGradient
                start={{x: 0, y: 0.4}} 
                end={{x: 1, y: 0.6}} 
                colors={[Colors.BCGrad1, Colors.BCGrad2]}
                style={styles.container}>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10,
        width: '100%',
        height: 120,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'

    },
    descriptionContainer: {
        alignSelf: 'center',
        gap: 5,
        flexShrink: 1
    },
    title: {
        color: Colors.P1,
        fontSize: 18,
        fontWeight: 600,
    },
    description: {
        color: Colors.P1,
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 14,
        flexShrink: 1,
    },
})