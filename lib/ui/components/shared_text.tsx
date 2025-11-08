import { Text, Platform, StyleSheet, useColorScheme } from "react-native"

// TODO: Add support for different font sizes when we add tablet and desktop 
// views.
export type internalSharedTextProps = {
    text: string,
    webFontSize: number,
    mobileFontSize: number,
}

export type sharedTextProps = {
    text: string,
}

// This is a shared header text component whose sizing can be specified and has
// logic for changing the color based on the color scheme.
// Not intended for external use. Use SharedH1, SharedH2, etc.
export default function SharedText({ text, webFontSize, mobileFontSize }: internalSharedTextProps) {

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
    
    const useDarkMode = (colorScheme === "dark")
    
    return (
        <Text style={useDarkMode ? styles.textDark : styles.textLight}>
            {text}
        </Text>
    )
}