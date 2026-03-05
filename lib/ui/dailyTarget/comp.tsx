import { Text, View, StyleSheet } from "react-native"
import ProgressBar from "../components/progress_bar"
import { dailyTargetProps } from "../types"
import { Colors } from "../colors"
import PlatformImage from "../info/platform_image"

export default function DailyTarget({ currProgress, maxProgress, imagePaths }: dailyTargetProps) {
	return (
		<View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.header}>Daily Max Usage</Text>
                        <Text style={styles.display_text}>{`${currProgress} kWh of ${maxProgress} kWh`}</Text>
                    </View>
                    <PlatformImage
                        imagePath={imagePaths["energy_leaf"]}
                        width={32} height={32}
                        style={styles.icon}/>

                </View>
                <ProgressBar height={25} currProgress={currProgress} maxProgress={maxProgress} />
            </View>
		</View >
	)
}

const styles = StyleSheet.create({
	outerContainer: {
		alignSelf: 'center',
		width: '100%',
        borderRadius: 10,
        height: '100%',
        maxHeight: 120,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
	},
	innerContainer: {
		alignSelf: 'center',
		width: '100%',
        height: '100%',
        maxHeight: 120,
        padding: 12,
		backgroundColor: Colors.E2,
		borderColor: Colors.E1,
		borderWidth: 3,
        borderRadius: 10,
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 2
	},
	header: {
		fontWeight: 'bold',
		textAlign: 'left',
		marginBottom: 4,
        color: Colors.E3,
        fontSize: 16,
	},
	display_text: {
		fontWeight: 600,
        fontSize: 14,
		color: Colors.E3,
        fontStyle: 'italic'
	},
	icon: {
		width: 32,
        height: 32,
        objectFit: 'contain',
        position: 'absolute',
        resizeMode: 'contain',
        top: 0,
        right: 0
	}
})
