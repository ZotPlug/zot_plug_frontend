import { Text, Platform, StyleSheet, useColorScheme } from "react-native"
import { Colors } from "../../colors"

// TODO: Add support for different font sizes when we add tablet and desktop 
// views.
export type internalSharedTextProps = {
    text: string,
    webFontSize: number,
    mobileFontSize: number,
    modeOverride?: string,
    center: boolean
}

export type sharedTextProps = {
    text: string,
    mode?: string,
    center: boolean
}

// This is a shared header text component whose sizing can be specified and has
// logic for changing the color based on the color scheme.
// Not intended for external use. Use SharedH1, SharedH2, etc.
export default function SharedText({ text, webFontSize, mobileFontSize, modeOverride, center }: internalSharedTextProps) {
    const webVersion = (Platform.OS === 'web')
    const fontSize = (webVersion ? webFontSize : mobileFontSize)

    const textAlignment = (center ? 'center' : 'start')

    const styles = StyleSheet.create({
        textLight: {
            color: Colors.S1,
            fontWeight: 'regular',
            fontSize: fontSize,
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            textAlign: textAlignment
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
