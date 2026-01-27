import {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from '../colors'
import PlatformImage from '../info/platform_image'
import LinearGradient from "react-native-linear-gradient"

type NavBarButton = {
	text: string,
    imagePath: string,
	onPress?: () => unknown | Promise<unknown>,
    isSelected?: boolean,
}

export default function NavBarButton({ onPress, imagePath, text, isSelected=false }: NavBarButton) {
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
                width={48} 
                height={48}
                style={styles.imageStyle}/>
        </>
    )

    return (
        <>
        { isSelected ?
            <TouchableOpacity 
                onMouseEnter={() => {setHover(true)}}
                onMouseLeave={() => {setHover(false)}}
                onPress={onPress}>
                
                <LinearGradient 
                    start={{x: 0, y: 0}} 
                    end={{x: 1, y: 1}} 
                    colors={[Colors.GGrad1, Colors.GGrad2]}
                    style={styles.buttonHover}>
                    {navbarContent}
                </LinearGradient>
            </TouchableOpacity>
        :
            <TouchableOpacity 
                onMouseEnter={() => {setHover(true)}}
                onMouseLeave={() => {setHover(false)}}
                style={hover ? styles.buttonHover : styles.button}
                onPress={onPress}>
                {navbarContent}
            </TouchableOpacity>
        }
        </>
    )
}

// TODO: find a way to do this without css duplication
const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.P4,
        height: 72,
        width: '100%',

        padding: 12,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.P1,

        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    buttonHover: {
        backgroundColor: Colors.P4,
        height: 72,
        width: '100%',

        padding: 12,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.P1,

        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    text: {
        fontSize: 16,
        color: Colors.S1,
        fontWeight: 700,
        textTransform: 'none',
        textAlign: "center",
    },
    imageStyle: {
        width: 48,
        height: 48,
        objectFit: 'contain',
        resizeMode: 'contain',
    },
    spacer: {
        flexGrow: 1
    }
});