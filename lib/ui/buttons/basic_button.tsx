import { View, Button, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

type BasicButton = {
	text: string,
	onPress?: () => unknown | Promise<unknown>,
	style?: StyleProp<ViewStyle>
}

export default function BasicButton({ onPress, text, style }: BasicButton) {
	return (
		<View style={style ?? styles.container}>
			<Button
				title={text}
				onPress={onPress}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: undefined,
		borderRadius: 8,
		width: '100%',
		maxWidth: 400,
		alignSelf: 'center',
	},
	text: {
		fontSize: 18,
		lineHeight: 24,
		color: '#333',
	},
});
