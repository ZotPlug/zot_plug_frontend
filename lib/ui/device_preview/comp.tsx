import React from "react"
import { Platform, Text, View, Image as RNImage, Pressable, StyleSheet } from "react-native"
import { devicePreviewProps } from "../types"
import ProgressBar from "../components/progress_bar";

function OpenDeviceStats() {
    console.log("Open device stats")
}

export default function DevicePreview({ 
    deviceImage, 
    deviceName, 
    currUsage, 
    totalUsage
}: devicePreviewProps) {
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
    
    if (deviceImage === '') {
        const noImagePath: string = '/images/ZotplugLogo_NoText_NoBackground.png'
        deviceImage = noImagePath
    }
    const rnSource = typeof deviceImage === 'string' ? { uri: deviceImage } : (deviceImage as any);

    const image = (Platform.OS === 'web' ? (
        <img src={deviceImage as string}
            alt={deviceName as string}
            style={styles.deviceImage} />
    ) : (
        <RNImage 
            source={rnSource as any}
            style={[styles.deviceImage]} 
            resizeMode="contain"
        />
    ))
    
    return (
        <Pressable style={styles.container} onPress={OpenDeviceStats}>
            {image}
            {deviceDetails}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        flexDirection: 'row',
        width: '80%',
        margin: 10,
        padding: 5
    },
    deviceImage: {
        height: 'auto',
        width: 64,
    },
    deviceDetails: {
        width: '65%',
        justifyContent: 'center',
        padding: 5,
        marginLeft: 20
    },
    deviceName: {
        color: 'white',
        fontSize: 20,
    },
    progressBar: {
        marginVertical: 10,
        width: '75%',
    },
    alignHorizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStats: {
        textAlign: 'right',
    },
    powerStats: {
        textAlign: 'right',
        fontWeight: 'bold',
    }
})
