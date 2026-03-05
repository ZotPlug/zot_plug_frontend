import {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../colors';
import PlatformImage from '../info/platform_image';

type AddDeviceButton = {
	text: string,
    imagePath: string,
	onPress?: () => unknown | Promise<unknown>,
}

export default function AddDeviceButton({ onPress, imagePath, text }: AddDeviceButton) {
    // We have to do this because react inline css doesn't support hover events,
    // It's less performant than a pure external css implementation, but
    // that would involve some painful infra changes.
    const [hover, setHover] = useState(false)

    const image = (
        <PlatformImage 
            imagePath={imagePath}
            width={48} 
            height={48}
            style={styles.imageStyle}/>
    )
	return (
        <TouchableOpacity 
            onMouseEnter={() => {setHover(true)}}
            onMouseLeave={() => {setHover(false)}}
            style={hover ? styles.buttonHover : styles.button}
            onPress={onPress}>
            <Text style={styles.text}>
                {text}
            </Text>
            <View style={styles.spacer}/>
            {image}
        </TouchableOpacity>
	);
}

// TODO: find a way to do this without css duplication
const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.E2,
        height: 72,
        width: '100%',
        maxWidth: 350,

        padding: 8,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.E1,

        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    buttonHover: {
        backgroundColor: Colors.E2,
        height: 72,
        width: '100%',
        maxWidth: 350,
        alignSelf: 'center',

        padding: 8,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.E1,

        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    text: {
        fontSize: 16,
        fontWeight: 700,
        color: Colors.S1,
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