import {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from '../colors'
import PlatformImage from '../info/platform_image'
import LinearGradient from "react-native-linear-gradient"

type DashboardButton = {
    className?: string,
	text: string,
    imagePath: string,
	onPress?: () => unknown | Promise<unknown>,
}

export default function DashboardButtonBig({className, onPress, imagePath, text }: DashboardButton) {
    // We have to do this because react inline css doesn't support hover events,
    // It's less performant than a pure external css implementation, but
    // that would involve some painful infra changes.
    const [hover, setHover] = useState(false)

    const navbarContent = (
        <>
            <Text style={styles.text}>
                {text}
            </Text>
            <View style={styles.spacer}/>
            <PlatformImage 
                imagePath={imagePath}
                width={64} 
                height={64}
                style={styles.imageStyle}/>
        </>
    )

    return (
        <>
            <TouchableOpacity 
                onMouseEnter={() => {setHover(true)}}
                onMouseLeave={() => {setHover(false)}}
                style={hover ? styles.buttonHover : styles.button}
                className={className}
                onPress={onPress}>
                {navbarContent}
            </TouchableOpacity>
        </>
    )
}

// TODO: find a way to do this without css duplication
const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.P4,
        height: 100,
        width: '100%',

        padding: 12,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.P1,

        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        gridColumn: 'span 2'
    },
    buttonHover: {
        backgroundColor: Colors.P4,
        height: 100,
        width: '100%',

        padding: 12,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.P1,

        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
        gridColumn: 'span 2'
    },
    text: {
        fontSize: 16,
        color: Colors.S1,
        fontWeight: 700,
        textTransform: 'none',
        textAlign: "center",
    },
    imageStyle: {
        width: 64,
        height: 64,
        objectFit: 'contain',
        resizeMode: 'contain',
    },
    spacer: {
        flexGrow: 1
    }
});