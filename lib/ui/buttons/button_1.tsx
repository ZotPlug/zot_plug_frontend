import {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Colors } from '../colors';
import { DeviceType } from '../types';
import { useResponsiveLayout } from '../window_utils';

type Button_1 = {
	text: string,
	onPress?: () => unknown | Promise<unknown>,
	style?: StyleProp<ViewStyle>
}

export default function Button_1({ onPress, text, style }: Button_1) {
    // We have to do this because react inline css doesn't support hover events,
    // It's less performant than a pure external css implementation, but
    // that would involve some painful infra changes.
    const [hover, setHover] = useState(false)

    const layout: DeviceType = useResponsiveLayout()

    const height = 50
    // We use viewport width on desktop so it still takes up 40% in scenarios 
    // where the parent doesn't take up the whole screen width
    const width = (layout === DeviceType.Mobile ? '100%' : '40vw')
    const maxWidth = (layout === DeviceType.Mobile ? 270 : 300)

    // TODO: find a way to do this without css duplication
    const styles = StyleSheet.create({
        button: {
            backgroundColor: Colors.S1,
            padding: 8,
            borderRadius: 10,
            width: width,
            height: height,
            maxWidth: maxWidth,
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        },
        buttonHover: {
            backgroundColor: Colors.P3,
            padding: 8,
            borderRadius: 10,
            width: width,
            height: height,
            maxWidth: maxWidth,
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        },
        text: {
            fontSize: 24,
            color: 'rgba(203, 224, 255, 0.8)',
            textTransform: 'none',
            textAlign: "center",
            textShadow: '0px 4px 4px #535353, 0 0 0 #000, 0px 4px 4px #535353;',
        },
    });

	return (
        <TouchableOpacity 
            onMouseEnter={() => {setHover(true)}}
            onMouseLeave={() => {setHover(false)}}
            style={hover ? styles.buttonHover : styles.button}
            onPress={onPress}
            >
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
	);
}

