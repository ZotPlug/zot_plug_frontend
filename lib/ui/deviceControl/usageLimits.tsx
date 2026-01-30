import {React, useState} from "react"
import { Text, View, StyleSheet, TouchableOpacity, } from "react-native"
import Switch from '../buttons/customSwitch/switch'
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../colors"

export default function UsageLimits() {
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled((prev: boolean) => !prev)

    return (
            <LinearGradient
                start={{x: 0, y: 0.4}} 
                end={{x: 1, y: 0.6}} 
                colors={[Colors.BCGrad1, Colors.BCGrad2]}
                style={styles.container}>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>
                        Daily Usage Limits
                    </Text>
                </View>

                <Switch onColor={Colors.P1}/>

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
        alignItems: 'center',
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
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    description: {
        color: Colors.P1,
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 14,
        flexShrink: 1,
    },
    valueContainer: {
        alignSelf: 'end',
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