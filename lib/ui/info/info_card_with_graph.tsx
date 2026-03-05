import React from "react"
import { Text, View, StyleSheet, } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../colors"
import { DeviceType } from "../types"
import { useResponsiveLayout } from "../window_utils"

export type InfoCardWithGraph = {
    title: string, 
    description: string,
    yesterdayValue: number,
    lastWeekValue: number,
    lastMonthValue: number,
    unit: string,
    graph: any,
    showBackground?: boolean
    showButton?: boolean
}

export default function InfoCardWithGraph({ 
    title, 
    description,
    yesterdayValue,
    lastWeekValue,
    lastMonthValue,
    unit,
    graph,
    showBackground=true,
    showButton=false // Used for the power usage breakdown on tablet
}: InfoCardWithGraph) {
    
    const layout: DeviceType = useResponsiveLayout()
    
    const infoContent = (
        <View style={styles.descriptionContainer}>
            {showBackground ? (
                <Text style={styles.title}>
                    {title}
                </Text>
            ) : (
                <View></View>
            )}
            {graph}
            <Text style={styles.description}>
                {description}
            </Text>
            <View style={styles.horizontalChildren}>
                <LinearGradient
                    start={{x: 0, y: 0.5}} 
                    end={{x: 1, y: 0.5}} 
                    colors={[Colors.BlGrad1, Colors.BlGrad2]}
                    style={styles.statNameContainer}>
                    <Text style={styles.statName}>
                        Yesterday
                    </Text>
                </LinearGradient>
                <View style={layout === DeviceType.Desktop ? styles.desktopStatValueContainer : styles.tabletStatValueContainer}>
                    <Text style={styles.statValue}>
                        {yesterdayValue.toLocaleString()} {unit}
                    </Text>
                </View>
            </View>
            <View style={styles.horizontalChildren}>
                <LinearGradient
                    start={{x: 0, y: 0.5}} 
                    end={{x: 1, y: 0.5}} 
                    colors={[Colors.BlGrad1, Colors.BlGrad2]}
                    style={styles.statNameContainer}>
                    <Text style={styles.statName}>
                        Last Week
                    </Text>
                </LinearGradient>
                <View style={layout === DeviceType.Desktop ? styles.desktopStatValueContainer : styles.tabletStatValueContainer}>
                    <Text style={styles.statValue}>
                        {lastWeekValue.toLocaleString()} {unit}
                    </Text>
                </View>
            </View>
            <View style={styles.horizontalChildren}>
                <LinearGradient
                    start={{x: 0, y: 0.5}} 
                    end={{x: 1, y: 0.5}} 
                    colors={[Colors.BlGrad1, Colors.BlGrad2]}
                    style={styles.statNameContainer}>
                    <Text style={styles.statName}>
                        Last Month
                    </Text>
                </LinearGradient>
                <View style={layout === DeviceType.Desktop ? styles.desktopStatValueContainer : styles.tabletStatValueContainer}>
                    <Text style={styles.statValue}>
                        {lastMonthValue.toLocaleString()} {unit}
                    </Text>
                </View>
            </View>
        </View>
    )
    
    // Ternary doesn't work here
    if (showBackground) {
        return <LinearGradient
                start={{x: 0, y: 0.4}} 
                end={{x: 1, y: 0.6}} 
                colors={[Colors.BCGrad1, Colors.BCGrad2]}
                style={styles.container}>

                {infoContent}

            </LinearGradient>
    } else {
        return infoContent
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10,
        width: '100%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    horizontalChildren: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        width: '100%'
    },
    statNameContainer: {
        borderRadius: 10,
        padding: 8,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        flex: 1,
        justifyContent: 'center'
    },
    statName: {
        color: Colors.P4,
        fontWeight: 600,
        fontSize: 16,
    },
    tabletStatValueContainer: {
        width: '45%',
        padding: 8,
        backgroundColor: Colors.S4,

        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.S2,
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    desktopStatValueContainer: {
        width: '35%',
        padding: 8,
        backgroundColor: Colors.S4,

        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.S2,
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    statValue: {
        color: Colors.P1,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 600,
    },
    descriptionContainer: {
        alignSelf: 'center',
        gap: 8,
        width: '100%'
    },
    title: {
        color: Colors.P1,
        fontSize: 18,
        fontWeight: 600,
    },
    description: {
        color: Colors.P1,
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 14,
        flexShrink: 1,
    },
})