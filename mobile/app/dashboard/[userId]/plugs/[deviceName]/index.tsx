import { Text, View, StyleSheet } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import SharedH1 from 'ui/components/shared_h1'
import SharedH2 from 'ui/components/shared_h2'
import DeviceReadings from 'ui/deviceReadings/comp'
import DeviceControl from 'ui/deviceControl/comp'
import { device_control } from "@/api_utils/api_actions"
import { DeviceControlReqs } from "ui"

async function sendCommand(params: DeviceControlReqs) {
    const res = await device_control({ topic: params.topic, payload: params.payload, qos: params.qos, retain: params.retain })
    if (!res.ok) console.log(res.message)
}

export default function PlugUsagePage() {
    const { userId, deviceName } = useLocalSearchParams();
    const properDevice_name = Array.isArray(deviceName) ? deviceName[0] : deviceName // TS alerts that useLocalSearchParams, can be of type array

    return (
        <View>
            <SharedH1 text={`Plug: ${deviceName}`} />
            <View>
                <SharedH2 text='Statistics' />
                <DeviceReadings voltage={120} current={1.3} />
            </View>
            <View>
                <SharedH2 text='Limits' />
            </View>
            <View>
                <SharedH2 text='Actions' />
                <DeviceControl deviceEndpointFn={sendCommand} deviceName={properDevice_name} />
            </View>
            <View>
                <SharedH2 text='Users' />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})
