import { View, Text, TouchableOpacity, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Colors } from '../colors';

type Button_1 = {
	text: string,
	onPress?: () => unknown | Promise<unknown>,
	style?: StyleProp<ViewStyle>
}

export default function Button_1({ onPress, text, style }: Button_1) {
	return (
        <TouchableOpacity 
            style={styles.button}
            onPress={onPress}>
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
        backgroundColor: Colors.S1,
        padding: 8,
        margin: 10,
        borderRadius: 10,
		width: '100%',
		maxWidth: 270,
		alignSelf: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
	},
    text: {
		fontSize: 24,
		color: 'rgba(203, 224, 255, 0.8)',
        textTransform: 'none',
        textAlign: "center",
        textShadow: '0px 4px 4px #535353, 0 0 0 #000, 0px 4px 4px #535353;',
    }
});
