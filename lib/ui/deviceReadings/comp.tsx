import React from "react"
import { Platform, Text, View, Image as RNImage, Pressable, StyleSheet, useColorScheme } from "react-native"
import { deviceReadingsProps } from "../types"
import SharedH2 from "../components/shared_h2"
import SharedH3 from "../components/shared_h3"
import SharedH4 from "../components/shared_h4"
import SharedH5 from "../components/shared_h5"
import SharedHr from "../components/shared_hr"

export default function DeviceReadings({ 
    voltage, 
    current,
}: deviceReadingsProps) {
    
    // TODO: Find a standard way for doing this across components.
    // Maybe some kind of singleton with a color dictionary?
    // Or maybe a standardized css file?
    const darkModeBackgroundColor = 'darkslategray'
    const lightModeBackgroundColor = 'white'

    const colorScheme = useColorScheme()
    const useDarkMode = (colorScheme === "dark")
    
    const backgroundColor = (useDarkMode ? darkModeBackgroundColor : lightModeBackgroundColor)
    
    const styles = StyleSheet.create({
        container: {
            margin: 10,
            padding: 10,
            backgroundColor: backgroundColor,
        },
        horizontalChildren: {
            display: 'flex',
            flexDirection: 'row',
            flex: 1
        },
        centerChildren: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
    
    
    // TODO: Handle unit conversion in scenarios where we need mA, micro A, etc.
    const voltageValue = `${voltage} V`
    const currentValue = `${current} A`

    const voltageSection =
        <View style={styles.centerChildren}>
            <SharedH4 text={voltageValue}/>
            <SharedH5 text='Voltage'/>
        </View>
    
    const currentSection =
        <View style={styles.centerChildren}>
            <SharedH4 text={currentValue}/>
            <SharedH5 text='Current'/>
        </View>

    return (
        <View style={styles.container}>
            <SharedH3 text={"Device Readings"} />
            <View style={styles.horizontalChildren}>
                {voltageSection}
                <SharedHr />               
                {currentSection}
            </View>
        </View>
    )
}