import React from "react"
import { Text, View, StyleSheet, } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../colors"

export type UsageCard = {
    title: string, 
    description: string,
    value: number,
    valueDescription: string,
}

export default function UsageCard({ 
    title, 
    description,
    value,
    valueDescription
}: UsageCard) {

    // TODO: If the width is under a certain amount, change the layout to vertical instead of horizontal (it fits better)

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

            <LinearGradient 
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 1}} 
                colors={[Colors.GGrad1, Colors.GGrad2]}
                style={styles.valueContainer}>

                <Text style={styles.value}>
                    {value.toLocaleString()}
                </Text>
                <Text style={styles.valueDescription}>
                    {valueDescription}
                </Text>
            </LinearGradient>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10,
        width: '100%',
        minHeight: 120,

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
    valueContainer: {
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.S6,
        padding: 15,
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    value: {
        fontSize: 24,
        fontWeight: 700,
        color: Colors.P1,
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    valueDescription: {
        fontSize: 16,
        fontWeight: 400,
        color: Colors.P1
    },
})