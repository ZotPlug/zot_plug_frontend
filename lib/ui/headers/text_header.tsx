import {Text, View, StyleSheet} from 'react-native'
import Shared_H4 from "../info/text/shared_h4"
import SharedHr from '../info/shared_hr'
import { Colors } from '../colors'

type TextHeader = {
    text: string, 
}

/**
 * A header icon with a logo, a back button, and a title.
 */
export default function TextHeader({ text }: TextHeader) {

    return (
        <>
            <View style={styles.containerStyle}>
                <Text style={styles.text}>{text}</Text>
                <SharedHr/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 12,
    },
    text: {
        fontSize: 16,
        fontWeight: 700,
        color: Colors.S1,
        textAlign: 'center',
        width: '100%',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        marginBottom: 5,
    }
})

