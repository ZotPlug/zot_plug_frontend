import { View, Text, StyleSheet, useColorScheme } from "react-native"
import { Colors } from "../colors"

// Horizontal line because hr isn't built into react native
export default function SharedHr() {
    
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            height: 50,
        },
        line: {
            flex: 1,
            width: 3,
            height: 50,
            backgroundColor: Colors.S2,
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        },
    })
    
    return (
        <View style={styles.container}>
            <View style={styles.line}></View>
        </View>
    )
    // <View style={useDarkMode ? styles.lineDarkMode : styles.lineLightMode} />
}
