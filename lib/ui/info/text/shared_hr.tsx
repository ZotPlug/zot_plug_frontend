import { View, Text, StyleSheet, useColorScheme } from "react-native"

// Horizontal line because hr isn't built into react native
export default function SharedHr() {
    
    const lightColor = 'white'
    const darkColor = 'black'

    const colorScheme = useColorScheme()
    const useDarkMode = (colorScheme === "dark")
    
    const lineColor = (useDarkMode ? lightColor : darkColor)

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginLeft: 25,
            marginRight: 25,
        },
        line: {
            flex: 1,
            height: 3,
            backgroundColor: lineColor,
        },
    })
    
    return (
        <View style={styles.container}>
            <View style={styles.line}></View>
        </View>
    )
    // <View style={useDarkMode ? styles.lineDarkMode : styles.lineLightMode} />
}
