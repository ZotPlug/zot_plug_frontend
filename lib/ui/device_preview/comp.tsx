import React from "react"
import { Platform, Text, View, Image as RNImage, Pressable, StyleSheet } from "react-native"
import { devicePreviewProps } from "../types"
import ProgressBar from "../components/progress_bar";

export default function DevicePreview({ deviceImage, deviceName, currUsage, totalUsage }: devicePreviewProps) {

    const deviceDetails =
        <View style={styles.deviceDetails}>
            <Text style={styles.deviceName}>{deviceName}</Text>
            <View style={styles.alignHorizontal}>
                <View style={styles.progressBar}>
                    <ProgressBar height={15} currProgress={currUsage} maxProgress={totalUsage} />
                </View>
                <View>
                    <Text style={styles.powerStats}>{currUsage} W</Text>
                    <Text style={styles.textStats}>(last 24 hrs)</Text>
                </View>
            </View>
        </View>
    
    if (deviceImage !== '') {
        const rnSource = typeof deviceImage === 'string' ? { uri: deviceImage } : (deviceImage as any);

        const image = (Platform.OS == 'web' ? (
            <img src={deviceImage as string}
                alt={deviceName} />
        ) : (
            <RNImage source={rnSource as any} style={[styles.deviceImage]} />
        ))
        
        return (
                <Pressable style={styles.container} onPress={OpenDeviceStats}>
                    {image}
                    {deviceDetails}
                </Pressable>
        )
    }
    else
    {
        return (
                <Pressable style={styles.container} onPress={OpenDeviceStats}>
                    {deviceDetails}
                </Pressable>
        )
    }
}

function OpenDeviceStats() {
    console.log("Open device stats")
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deviceImage: {

    },
    deviceDetails: {
        width: '75%',
        justifyContent: 'center',
        backgroundColor: 'gray',
        padding: 5,
        margin: 10,
    },
    deviceName: {
        color: 'white',
        fontSize: 20,
        padding: 5,
        width: '85%',
    },
    progressBar: {
        marginVertical: 10,
        width: '85%',
    },
    alignHorizontal: {
        display: 'flex',
        flexDirection: 'row',
    },
    textStats: {
        textAlign: 'right',
    },
    powerStats: {
        textAlign: 'right',
        fontWeight: 'bold',
    }
})