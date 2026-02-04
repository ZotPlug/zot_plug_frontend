import React from "react"
import { Text, View, StyleSheet, } from "react-native"
import { deviceReadingsProps } from "../types"
import SharedVr from "../info/shared_vr"
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../colors"

export default function DeviceReadings({ 
    voltage, 
    current,
}: deviceReadingsProps) {
    
    // TODO: Handle unit conversion in scenarios where we need mA, micro A, etc.
    const voltageValue = `${voltage.toFixed(1)} V`
    const currentValue = `${current.toFixed(1)} A`

    const voltageSection =
        <View style={styles.centerChildren}>
            <Text style={styles.reading}>
                {voltageValue}
            </Text>
            <Text style={styles.readingDescription}>
                Voltage
            </Text>
        </View>
    
    const currentSection =
        <View style={styles.centerChildren}>
            <Text style={styles.reading}>
                {currentValue}
            </Text>
            <Text style={styles.readingDescription}>
                Current
            </Text>
        </View>

    return (
        <LinearGradient
            start={{x: 0, y: 0.1}} 
            end={{x: 0.8, y: 0.9}} 
            colors={[Colors.BlGrad1, Colors.BlGrad2]} 
            style={styles.container}>

            <View style={styles.horizontalChildren}>
                {voltageSection}
                <SharedVr />               
                {currentSection}
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 15,

        borderRadius: 10,
        width: '100%',
        height: 120,
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    reading: {
        color: Colors.S4,
        fontSize: 32,
        fontWeight: 700,
        textShadow: '0px 4px 4px #535353, 0 0 0 #000, 0px 4px 4px #535353;',
    },
    readingDescription: {
        color: Colors.S4,
        fontSize: 16,
        fontWeight: 400,
        textShadow: '0px 4px 4px #535353, 0 0 0 #000, 0px 4px 4px #535353;',
    },
    horizontalChildren: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    centerChildren: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
    }
})