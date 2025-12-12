'use client'
import { useParams } from "next/navigation"
import { useQuery } from '@tanstack/react-query'
import { device_control } from "@/app/api_utils/api_actions";
import { apiGetDeviceInfo, apiGetLatestDeviceReading } from "@/app/api_utils/api_device_actions";
import DeviceControl from "ui/deviceControl/comp"
import { DeviceControlReqs } from "ui/types";
import BasicButton from "ui/components/basic_button"
import { useRouter } from 'next/navigation'
import DeviceReadings from "ui/deviceReadings/comp"
import SharedH1 from "ui/components/shared_h1"
import SharedH2 from "ui/components/shared_h2"
import SharedH4 from "ui/components/shared_h4"
import SharedH5 from "ui/components/shared_h5"
import { StyleSheet } from "react-native"

async function sendCommand(params: DeviceControlReqs) {
    const res = await device_control({ topic: params.topic, payload: params.payload, qos: params.qos, retain: params.retain })
    if (!res.ok) console.log(res.value)
}

export default function DevicePage() {
    // Device name is needed for mqtt to send cmd's to the proper device. I.e: Topic: {deviceName}/cmd/relay/on
    const { userId, deviceId, rawDeviceName } = useParams<{ userId: string, deviceId: string, rawDeviceName: string }>();

    // We need to keep track of the device ID to get the current status (online/offline)
    // And we need the device name for everything else (because of how the API 
    // is setup).

    // First have to decode the name to account for stuff like spaces in the URL
    const deviceName = decodeURIComponent(rawDeviceName)

    const router = useRouter()

    // Get device info (namely the status)
    const { data: deviceInfo, isLoading: isLoadingDeviceInfo } = useQuery({
        queryKey: ['deviceInfo'],
        queryFn: async () => await apiGetDeviceInfo(parseInt(deviceId))
    })

    // Update readings every 10s
    const updateTime = 1000 * 10

    // Get device readings
    const { data: deviceReading } = useQuery({
        queryKey: ['deviceReadings'],
        queryFn: async () => await apiGetLatestDeviceReading(deviceName),
        refetchInterval: updateTime
    })
    const loadingPageContent =
        <div style={styles.verticalChildren}>
            <SharedH1 text="Device Details" />
            <SharedH5 text={`Loading device details for device ${deviceId}`} />
        </div>

    if (isLoadingDeviceInfo) {
        return (loadingPageContent)
    }

    if (deviceInfo?.ok) {
        const deviceName = deviceInfo.value.name;
        const deviceStatus = deviceInfo.value.status;
        const currentVoltage = deviceReading?.ok ? deviceReading.value.voltage : -1;
        const currentCurrent = deviceReading?.ok ? deviceReading.value.current : -1;

        const devicePageContent =
            <div style={styles.verticalChildren}>
                <SharedH1 text="Device Details" />
                <SharedH4 text={`Name: ${deviceName}`} />
                <SharedH4 text={`ID: ${deviceId}`} />
                <SharedH4 text={`Status: ${deviceStatus}`} />
                <BasicButton text='Back' onPress={() => router.push(`/dashboard/${userId}/plugs`)} />
                <div>
                    <SharedH2 text='Statistics' />
                    <DeviceReadings voltage={currentVoltage} current={currentCurrent} />
                </div>
                <div>
                    <SharedH2 text='Limits' />
                </div>
                <div style={styles.actionsContainer}>
                    <SharedH2 text='Actions' />
                    <DeviceControl deviceName={deviceName} deviceEndpointFn={sendCommand} />
                </div>
                <div>
                    <SharedH2 text='Users' />
                </div>
            </div>

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
