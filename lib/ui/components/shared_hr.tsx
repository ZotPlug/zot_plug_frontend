import { View, Text, StyleSheet, useColorScheme } from "react-native"

// Horizontal line because hr isn't built into react native
export default function SharedHr() {

    const colorScheme = useColorScheme()
    
    const useDarkMode = (colorScheme === "dark")
    
    return (
        <View style={useDarkMode ? styles.lineDarkMode : styles.lineLightMode} />
    )
}

const styles = StyleSheet.create({
    lineDarkMode: {
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch'
    },
    lineLightMode: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch'
    }
})
