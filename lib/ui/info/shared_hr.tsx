import { View, Text, StyleSheet, useColorScheme } from "react-native"
import { Colors } from "../colors"

// Horizontal line because hr isn't built into react native
export default function SharedHr() {
    
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            width: '100%'
        },
        line: {
            flex: 1,
            height: 3,
            width: '100%',
            backgroundColor: Colors.A2,
        },
    })
    
    return (
        <View style={styles.container}>
            <View style={styles.line}></View>
        </View>
    )
    // <View style={useDarkMode ? styles.lineDarkMode : styles.lineLightMode} />
}
