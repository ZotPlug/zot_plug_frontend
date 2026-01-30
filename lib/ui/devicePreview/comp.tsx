import React from "react"
import { Text, View, Image as RNImage, TouchableOpacity, StyleSheet } from "react-native"
import { devicePreviewProps } from "../types"
import ProgressBar from "../components/progress_bar";
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../colors";
import PlatformImage from "../info/platform_image";

export default function DevicePreview({ 
    deviceImage, 
    deviceName,
    deviceId,
    currUsage, 
    totalUsage,
    redirectOnClick,
}: devicePreviewProps) {

    // TODO: Get rid of all of this old image logic

    const noImagePath: string = '/images/device_icon.png'
    const imagePath = (deviceImage === '') ? noImagePath : deviceImage

    // We pass redirectOnClick as a component function parameter because routing
    // logic is different on mobile and web, and requires different router 
    // libraries.
    return (
        <TouchableOpacity onPress={() => redirectOnClick(deviceId)}>
            <LinearGradient
                start={{x: 0, y: 0.1}} 
                end={{x: 0.8, y: 0.9}} 
                colors={[Colors.BlGrad1, Colors.BlGrad2]} 
                style={styles.container}>
                
                <Text style={styles.deviceName}>{deviceName}</Text>

                <View style={styles.imageContainer}>
                    <View style={styles.imagePlugBorder}>
                        <PlatformImage width={60} height={48} imagePath={imagePath} style={styles.deviceImage} />
                    </View>
                </View>

                <View style={styles.progressBar}>
                    <ProgressBar height={22} currProgress={currUsage} maxProgress={totalUsage} />
                </View>

                <View style={styles.powerStatsContainer}>
                    <View style={styles.powerStatsInsetContainer}>
                        <Text style={styles.powerStats}>{currUsage} W</Text>
                    </View>
                </View>

            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'grid',
        gridTemplateColumns: '5fr 1fr',
        gridTemplateRows: '1fr 0.5fr',
        gap: 5,

        flexDirection: 'row',
        width: '100%',
        maxWidth: 500,
        borderRadius: 10,
        paddingTop: 12,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 6,
        flexShrink: 1,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    imageContainer: {
        width: '100%',
        display: 'flex',
        alignChildren: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))'
    },
    deviceImage: {
        width: '95%',
        height: '93%',
        objectFit: 'cover',
        objectPosition: 'center',
        resizeMode: 'contain',
        alignSelf: 'center',
        clipPath: 'ellipse(49% 65%)',
    },
    imagePlugBorder: {
        width: 62,
        height: 48,
        backgroundColor: Colors.S6,

        display: 'flex',
        justifyContent: 'center',
        clipPath: 'ellipse(50% 65%)',
    },
    deviceDetails: {
        width: '85%',
        justifyContent: 'center',
        padding: 5,
    },
    deviceName: {
        color: Colors.P4,
        fontWeight: 600,
        fontSize: 20,
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    progressBar: {
        width: '100%',
    },
    alignHorizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    powerStats: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.P1,
        fontSize: 13,
    },
    powerStatsContainer: {
        backgroundColor: Colors.S5,
        borderColor: Colors.S6,
        borderWidth: 3,
        borderRadius: 10,
        minWidth: 75,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        alignSelf: 'center',
    },
    powerStatsInsetContainer: {
        borderRadius: 8,
        paddingLeft: 5,
        paddingRight: 5,
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.20)',
        width: '100%',
        height: '100%'
    }
})
