import React from "react"
import { Text, View, StyleSheet, } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../colors"
import PlatformImage from "./platform_image"
import { ProgressBar } from "../components"

export type EnergyCard = {
    title: string, 
    description: string,
    currentValue: number,
    totalValue: number,
    icon: string,
    unit: string
}

export default function EnergyCard({ 
    title, 
    description,
    currentValue,
    totalValue,
    icon,
    unit
}: EnergyCard) {

    return (
            <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 1}} 
                colors={[Colors.GBGrad1, Colors.GBGrad2]}
                style={styles.container}>

                <View style={styles.horizontalChildren}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <View style={styles.textWrapper}>
                            <Text style={styles.description}>
                                {description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.icon}>
                        <PlatformImage 
                            width={48} 
                            height={48}
                            imagePath={icon}/>
                    </View>
                </View>
                <View>
                    <Text style={styles.progressBarText}>
                        {currentValue} {unit} of {totalValue} {unit}
                    </Text>
                    <ProgressBar 
                        height={24}
                        currProgress={currentValue}
                        maxProgress={totalValue}/>
                </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10,
        width: '100%',

        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'

    },
    textWrapper: {
        display: 'flex',
        flexShrink: 1,
        flexDirection: 'row',
    },
    descriptionContainer: {
        alignSelf: 'center',
        gap: 5,
        flexShrink: 1
    },
    title: {
        color: Colors.E3,
        fontSize: 18,
        fontWeight: 600,
    },
    description: {
        color: Colors.E3,
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 14,
        flexShrink: 1,
    },
    icon: {

    },
    progressBarText: {
        color: Colors.E3,
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: 500,
        marginBottom: 4
    },
    horizontalChildren: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    }
})