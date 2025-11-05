import { Text, View, StyleSheet, useColorScheme } from "react-native"
import { sharedH1Props } from "../types"

export default function SharedH1({ text }: sharedH1Props) {
    
    const colorScheme = useColorScheme()
    
    const useDarkMode = (colorScheme === "dark")
    
    return (
        <Text style={useDarkMode ? styles.textDark : styles.textLight}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    textLight: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 40
    },
    textDark: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40
    }
})