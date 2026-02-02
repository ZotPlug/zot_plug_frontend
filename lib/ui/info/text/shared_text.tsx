import { Text, StyleSheet, useColorScheme } from "react-native"
import { Colors } from "../../colors"
import { DeviceType } from "../../types"
import { useResponsiveLayout } from "../../window_utils"

// TODO: Add support for different font sizes when we add tablet and desktop 
// views.
export type internalSharedTextProps = {
    text: string,
    webFontSize: number,
    mobileFontSize: number,
    modeOverride?: string,
    center?: boolean
}

export type sharedTextProps = {
    text: string,
    mode?: string,
    center?: boolean
}

// This is a shared header text component whose sizing can be specified and has
// logic for changing the color based on the color scheme.
// Not intended for external use. Use SharedH1, SharedH2, etc.
export default function SharedText({ text, webFontSize, mobileFontSize, modeOverride, center = false}: internalSharedTextProps) {
    const layout: DeviceType = useResponsiveLayout()
    let fontSize
    switch (layout) {
        case DeviceType.Desktop:
            fontSize = webFontSize
            break
        case DeviceType.Tablet:
            fontSize = webFontSize
            break
        case DeviceType.Mobile:
            fontSize = mobileFontSize
            break;
    }

    const styles = StyleSheet.create({
        textLight: {
            color: Colors.S1,
            fontWeight: 'regular',
            fontSize: fontSize,
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            textTransform: 'capitalize',
            textAlign: center ? 'center' : 'left'
        },
        textDark: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: fontSize
        }
    })

    const colorScheme = useColorScheme()

    //const useDarkMode = (modeOverride === "light") ? false : (modeOverride === "dark") || (colorScheme === "dark")
    const useDarkMode = false

    return (
        <Text style={useDarkMode ? styles.textDark : styles.textLight}>
            {text}
        </Text>
    )
}
