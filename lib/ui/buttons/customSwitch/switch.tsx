// Modified from - https://stackoverflow.com/questions/73700890/how-to-make-toggle-button-with-animated-view-in-react-native
// Retrieved 2026-01-28, License - CC BY-SA 4.0

import React, { useState, useRef } from 'react';
import {StyleSheet, Animated, TouchableOpacity, Easing} from 'react-native';
import { Colors } from '../../colors';

export type Switch = {
    onColor: string
}

export default function Switch({onColor} : Switch)
{
    const positionButton = useRef(new Animated.Value(0)).current;

    const [isOn, setIsOn] = useState(false);

    const startAnimToOff = () => {
        Animated.timing(positionButton, {
            toValue: 0,
            duration: 150,
            easing: Easing.ease
        }).start()
    }

    const startAnimToOn = () => {
        Animated.timing(positionButton, {
            toValue: 1,
            duration: 150,
            easing: Easing.ease
        }).start()
    }

    const positionInterPol = positionButton.interpolate({ inputRange: [0, 1], outputRange: [0, 46] })

    const backgroundColorAnim = positionButton.interpolate({ inputRange: [0, 1], outputRange: [Colors.ToggleOff, onColor] })

    const onPress = () => {
        if (isOn) {
            startAnimToOff();
            setIsOn(false);
        } else {
            startAnimToOn();
            setIsOn(true);
        }
    };

    return (
        <TouchableOpacity style={styles.opacity} activeOpacity={0.9} onPress={onPress} >
            <Animated.View style={[styles.background, {
                backgroundColor: backgroundColorAnim
            }]} >
                <Animated.View style={[styles.thumb, {
                    transform: [{
                        translateX: positionInterPol
                    }]
                }]} />
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    thumb: {
        height: 38,
        width: 38,
        borderRadius: 20,
        borderColor: Colors.S3,
        borderWidth: 2,
        backgroundColor: Colors.L1,
        marginLeft: 1,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    background: {
        borderRadius: 30,
        borderColor: Colors.ToggleBorder,
        borderWidth: 2,
        backgroundColor: '#81b0ff',
        height: 45,
        width: 90,
        display: 'flex',
        justifyContent: 'center',
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    opacity: {
        height: 45, 
        width: 90
    }
});