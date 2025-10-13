import { useState } from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { DeviceControlProps } from "../types"
import BasicButton from "../components/basic_button"

const defaultMqttParams = {
	payload: { message: "Default payload message" },
	qos: 0,
	retain: false
}

export default function DeviceControl({ deviceEndpointFn }: DeviceControlProps) {
	const [deviceId, setDeviceId] = useState("")
	return (
		<View style={styles.container}>
			<TextInput
				value={deviceId}
				onChangeText={(deviceId) => setDeviceId(deviceId)}
				placeholder="Input Target DeviceID"
				editable={true}
				style={styles.textInput}
			/>
			<BasicButton text="Turn relay off" onPress={() => deviceEndpointFn({ topic: `${deviceId}/cmd/relay/off`, ...defaultMqttParams })} />
			<BasicButton text="Turn relay on" onPress={() => deviceEndpointFn({ topic: `${deviceId}/cmd/relay/on`, ...defaultMqttParams })} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		padding: 10,
		width: '100%',
		maxWidth: 450,
	},
	textInput: {
		padding: 16,
		backgroundColor: 'white',
		color: 'black',
		borderRadius: 8,
		width: '100%',
		marginVertical: 8,
	}
})

