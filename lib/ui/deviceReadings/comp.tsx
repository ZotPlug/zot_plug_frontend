import React from "react"
import { Text, View, StyleSheet, } from "react-native"
import { deviceReadingsProps } from "../types"
import SharedH4 from "../info/text/shared_h4"
import SharedH5 from "../info/text/shared_h5"
import SharedVr from "../info/shared_vr"
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../colors"

export default function DeviceReadings({ 
    voltage, 
    current,
}: deviceReadingsProps) {
    
    // TODO: Find a standard way for doing this across components.
    // Maybe some kind of singleton with a color dictionary?
    // Or maybe a standardized css file? 
    
    // TODO: Handle unit conversion in scenarios where we need mA, micro A, etc.
    const voltageValue = `${voltage.toFixed(1)} V`
    const currentValue = `${current.toFixed(1)} A`

    const voltageSection =
        <View style={styles.centerChildren}>
            <Text style={styles.reading} text={voltageValue}/>
            <Text style={styles.readingDescription} text='Voltage'/>
        </View>
    
    const currentSection =
        <View style={styles.centerChildren}>
            <Text text={currentValue}/>
            <Text text='Current'/>
        </View>

    return (
        <LinearGradient
            start={{x: 0, y: 0.1}} 
            end={{x: 0.8, y: 0.9}} 
            colors={[Colors.BlGrad1, Colors.BlGrad2]} 
            style={styles.container}>

            {voltageSection}
            <SharedVr />               
            {currentSection}

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'grid',
        gridTemplateColumns: '3fr 1fr 3fr',
        gap: 5,
    },
    reading: {
        color: 'white'
    },
    readingDescription: {
        color: 'white'
    },
    horizontalChildren: {
        display: 'flex',
        flexDirection: 'row',
    },
    centerChildren: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})