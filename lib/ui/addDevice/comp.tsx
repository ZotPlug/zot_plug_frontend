import { useState } from "react";
import { View, Text, Modal, StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { BasicButton } from "../components";
import SharedH4 from "../components/shared_h4";
import { AddDeviceCompParams } from "../types";

export default function AddDevice({ onSubmit, modalMessage, SetModalMesage }: AddDeviceCompParams) {
	const [overlayState, SetOverlayState] = useState(false)
	const [textInput, SetTextInput] = useState("")
	const { width, height } = useWindowDimensions()
	const isMobile = width <= 480

	return (
		<View>
			<BasicButton text={"Add device"} onPress={() => SetOverlayState(!overlayState)} />

			<Modal visible={overlayState} transparent animationType="fade" onRequestClose={() => SetOverlayState(false)}>
				<View style={styles.modalContainer}>
					<View style={isMobile ? styles.mobileModalCardContainer : styles.modalCardContainer}>
						<View style={styles.modalHeader}>
							<SharedH4 text="Add Smart Plug" mode="light" />
						</View>
						<View style={styles.modalBody}>
							<Text style={styles.textStyle}>Enter Smart Plug Device Name: </Text>
							<TextInput
								value={textInput}
								onChangeText={SetTextInput}
								placeholder="i.e: zot_plug_xxxxxx"
								editable={true}
								style={styles.textInput}
							/>
						</View>
						<View style={styles.modalMessageContainer}>
							{modalMessage ?
								!modalMessage.ok ?
									<Text style={styles.errorText}> {modalMessage.message} </Text>
									:
									<Text style={styles.successText}>  {modalMessage.message} </Text>
								:
								null
							}
						</View>
						<View style={styles.buttonContainer}>
							<BasicButton text={"Close"} onPress={() => SetOverlayState(false)} />
							<BasicButton text={"Submit"} onPress={() => onSubmit({ deviceName: textInput.toLowerCase() })} />
						</View>
					</View>
				</View>
			</Modal>
		</View>
	)
}


const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalCardContainer: {
		width: '55%',
		height: '25%',
		backgroundColor: 'white',
		borderRadius: 12,
		flexDirection: 'column',
	},
	mobileModalCardContainer: {
		width: '80%',
		height: '25%',
		backgroundColor: 'white',
		borderRadius: 12,
		flexDirection: 'column',
	},
	modalHeader: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingTop: 12,
		paddingHorizontal: 12,
	},
	modalBody: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: '100%',
		paddingHorizontal: 12
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '50%'
	},
	textInput: {
		backgroundColor: 'lightgray',
		borderColor: 'black',
		borderRadius: 8,
		padding: 8,
		borderWidth: 1,
		color: 'black',
		width: '100%'
	},
	textStyle: {
		paddingBottom: 6,
		fontWeight: 'bold',
	},
	modalMessageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorText: {
		color: 'red'
	},
	successText: {
		color: 'green'
	}
})
