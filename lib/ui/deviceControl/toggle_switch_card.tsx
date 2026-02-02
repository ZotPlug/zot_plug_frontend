import {React, useState} from "react"
import { Text, View, StyleSheet, TouchableOpacity, } from "react-native"
import Switch from '../buttons/customSwitch/switch'
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../colors"
import { DeviceControlReqs } from "../types"

export type ToggleSwitchCard = {
    title: string, 
	onSwitchOn?: Function,
	onSwitchOff?: Function,
}

export default function ToggleSwitchCard({ title, onSwitchOn, onSwitchOff } : ToggleSwitchCard) {

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
                </View>

                <Switch 
                    onSwitchOn={onSwitchOn}
                    onSwitchOff={onSwitchOff}
                    onColor={Colors.P1}/>

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
    },
})