import { Text, Platform, StyleSheet, useColorScheme } from "react-native"

// TODO: Add support for different font sizes when we add tablet and desktop 
// views.
export type internalSharedTextProps = {
    text: string,
    webFontSize: number,
    mobileFontSize: number,
    modeOverride?: string
}

export type sharedTextProps = {
    text: string,
    mode?: string,
}

// This is a shared header text component whose sizing can be specified and has
// logic for changing the color based on the color scheme.
// Not intended for external use. Use SharedH1, SharedH2, etc.
export default function SharedText({ text, webFontSize, mobileFontSize, modeOverride }: internalSharedTextProps) {
    const webVersion = (Platform.OS === 'web')
    const fontSize = (webVersion ? webFontSize : mobileFontSize)

    const styles = StyleSheet.create({
        textLight: {
            color: 'black',
            fontWeight: 'bold',
            fontSize: fontSize
        },
        textDark: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: fontSize
        }
    })

    const colorScheme = useColorScheme()

    const useDarkMode = (modeOverride === "light") ? false : (modeOverride === "dark") || (colorScheme === "dark")

    return (
        <Text style={useDarkMode ? styles.textDark : styles.textLight}>
            {text}
        </Text>
    )
}
