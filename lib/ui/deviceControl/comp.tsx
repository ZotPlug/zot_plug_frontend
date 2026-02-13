import { View, StyleSheet } from "react-native"
import { DeviceControlProps } from "../types"
import ToggleSwitchCard from "./toggle_switch_card"

const defaultMqttParams = {
	payload: { message: "Default payload message" },
	qos: 0,
	retain: false
}

export default function DeviceControl({ deviceEndpointFn, deviceName }: DeviceControlProps) {
    // TODO: Set the default value based on an api request to see whether
    // the power is on or off
    // (Either here or in the device page)
	return (
		<View style={styles.container}>
            <ToggleSwitchCard 
                defaultValue={true}
                title="Allow Power"
                onSwitchOn={() => deviceEndpointFn({ topic: `${deviceName}/cmd/relay/on`, ...defaultMqttParams })}
                onSwitchOff={() => deviceEndpointFn({ topic: `${deviceName}/cmd/relay/off`, ...defaultMqttParams })}/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
	},
})

