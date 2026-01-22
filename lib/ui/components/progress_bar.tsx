import { View, StyleSheet } from "react-native";
import { progressBarProps } from "../types";
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../colors";

export default function ProgressBar({ height, currProgress, maxProgress }: progressBarProps) {
	let percent = (currProgress / maxProgress) * 100
	return (
        <View style={[styles.background, { height }]}>
            <LinearGradient
                start={{x: 0, y: 0.5}} 
                end={{x: 1, y: 0.5}} 
                colors={[Colors.GrGrad1, Colors.GrGrad2]} 
                style={[styles.progress, { width: `${percent}%` }]}
                />
        </View>
	)
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: Colors.S4,
		borderRadius: 5,
        borderWidth: 3,
        borderColor: Colors.S2,
		overflow: 'hidden',
		alignSelf: 'stretch',
		width: '100%',
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
	},
	progress: {
		height: '100%',
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
	}
})
