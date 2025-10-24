import { Text, View, StyleSheet } from "react-native"
import { sharedH1Props } from "../types"

export default function SharedH1({ text }: sharedH1Props) {
    return (
        <Text style={styles.text}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 64
    }
})