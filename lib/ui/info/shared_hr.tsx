import { View, StyleSheet } from "react-native"
import { Colors } from "../colors"

export default function SharedHr() {
     
    return (
        <View style={styles.container}>
            <View style={styles.line}></View>
        </View>
    )
}

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