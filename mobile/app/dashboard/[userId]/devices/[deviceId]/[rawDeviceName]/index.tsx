import { Text, View, StyleSheet } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useQuery } from '@tanstack/react-query'
import DeviceReadings from 'ui/deviceReadings/comp'
import DeviceControl from 'ui/deviceControl/comp'
import { device_control } from "@/api_utils/api_actions"
import { DeviceControlReqs } from "ui"
import { apiGetDeviceById, apiGetLatestDeviceReading } from "@/api_utils/api_device_actions"

import SharedH1 from 'ui/info/text/shared_h1'
import SharedH2 from 'ui/info/text/shared_h2'
import SharedH4 from 'ui/info/text/shared_h4'
import SharedH5 from 'ui/info/text/shared_h5'

async function sendCommand(params: DeviceControlReqs) {
    const res = await device_control({ topic: params.topic, payload: params.payload, qos: params.qos, retain: params.retain })
    if (!res.ok) console.log(res.message)
}

export default function PlugUsagePage() {
    const { deviceId, rawDeviceName } = useLocalSearchParams();

    // TS alerts that useLocalSearchParams can be of type array
    const properDeviceName = Array.isArray(rawDeviceName) ? rawDeviceName[0] : rawDeviceName
    const actualDeviceId = Array.isArray(deviceId) ? deviceId[0] : deviceId
    
    // First have to decode the name to account for stuff like spaces in the URL
    const actualDeviceName = decodeURIComponent(properDeviceName)

    // Get device info (namely the status)
    const { data: deviceInfo, isLoading: isLoadingDeviceInfo } = useQuery({
        queryKey: ['deviceInfo'],
        queryFn: async () => await apiGetDeviceById(parseInt(actualDeviceId))
    })

    // Update readings every 5s
    const updateTime = 1000 * 5

    // Get device readings
    const { data: deviceReading, isLoading: isLoadingDeviceReading } = useQuery({
        queryKey: ['deviceReadings'],
        queryFn: async () => await apiGetLatestDeviceReading(actualDeviceName),
        refetchInterval: updateTime
    })

    const loadingPageContent =
        <View style={styles.verticalChildren}>
            <SharedH1 text="Device Details" />
            <SharedH5 text={`Loading device details for device ${actualDeviceId}`} />
        </View>
    
    if (isLoadingDeviceInfo) {
        return (loadingPageContent)
    }

    if (deviceInfo && deviceInfo.value) {
        const deviceStatus = deviceInfo.value.status
  
        const currentVoltage = (!deviceReading || !deviceReading.value) ? -1 : deviceReading.value.voltage
        const currentCurrent = (!deviceReading || !deviceReading.value) ? -1 : deviceReading.value.current
        
        const devicePageContent = 
            <View style={styles.verticalChildren}>
                <SharedH1 text="Device Details" />
                <SharedH4 text={`Name: ${actualDeviceName}`} />
                <SharedH4 text={`ID: ${actualDeviceId}`} />
                <SharedH4 text={`Status: ${deviceStatus}`} />
                <View style={{width: '100%'}}>
                    <SharedH2 text='Statistics' />
                    <DeviceReadings voltage={currentVoltage} current={currentCurrent} />
                </View>
                <View>
                    <SharedH2 text='Limits' />
                </View>
                <View style={styles.actionsContainer}>
                    <SharedH2 text='Actions' />
                    <DeviceControl deviceName={actualDeviceId} deviceEndpointFn={sendCommand} />
                </View>
                <View>
                    <SharedH2 text='Users' />
                </View>
            </View>

        return (devicePageContent)
    }
}

const styles = StyleSheet.create({
    verticalChildren: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    actionsContainer: {
        width: "100%",
    }
})
