import React from "react"
import { Platform, Text, View, Image as RNImage, StyleSheet } from "react-native"
import { devicePreviewProps } from "../types"
import ProgressBar from "../components/progress_bar";

export default function DevicePreview({ deviceImage, deviceName, currUsage, totalUsage }: devicePreviewProps) {

    const deviceDetails =
        <View style={styles.deviceDetails}>
            <Text style={styles.deviceName}>{deviceName}</Text>
            <View style={styles.alignHorizontal}>
                <ProgressBar height={15} currProgress={currUsage} maxProgress={totalUsage} />
                <View>
                    <Text>{currUsage} W</Text>
                    <Text>(last 24 hrs)</Text>
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
            <View style={styles.container}>
                {image}
                {deviceDetails}
            </View>
        )
    }
    else
    {
        return (
            <View style={styles.container}>
                {deviceDetails}
            </View>
        )
    }
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
        padding: 5
    },
    alignHorizontal: {
        display: 'flex',
        //flexDirection: 'row',
    },
})