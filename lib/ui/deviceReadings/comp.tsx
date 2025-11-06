import React from "react"
import { Platform, Text, View, Image as RNImage, Pressable, StyleSheet } from "react-native"
import { deviceReadingsProps } from "../types"
import SharedH2 from "../components/shared_h3"
import SharedH3 from "../components/shared_h3"
import SharedH5 from "../components/shared_h5"
import SharedHr from "../components/shared_hr"

export default function DeviceReadings({ 
    voltage, 
    current,
}: deviceReadingsProps) {
    
    // TODO: Handle unit conversion in scenarios where we need mA, micro A, etc.
    const voltageValue = `${voltage} V`
    const currentValue = `${current} A`

    const voltageSection =
        <View>
            <SharedH3 text={voltageValue}/>
            <SharedH5 text='Voltage'/>
        </View>
    
    const currentSection =
        <View>
            <SharedH3 text={currentValue}/>
            <SharedH5 text='Current'/>
        </View>

    return (
        <View>
            <SharedH2 text={"Device Readings"} />
            <View>
                {voltageSection}
                <SharedHr />               
                {currentSection}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})
