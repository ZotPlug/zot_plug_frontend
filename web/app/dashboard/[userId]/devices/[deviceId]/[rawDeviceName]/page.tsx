'use client'
import { useParams } from "next/navigation"
import { useQuery } from '@tanstack/react-query'
import { device_control } from "@/app/api_utils/api_actions";
import { apiGetDeviceInfo, apiGetLatestDeviceReading } from "@/app/api_utils/api_device_actions";
import DeviceControl from "ui/deviceControl/comp"
import { DeviceControlReqs, DeviceType } from "ui/types";
import BasicButton from "ui/buttons/basic_button"
import { useRouter } from 'next/navigation'
import DeviceReadings from "ui/deviceReadings/comp"
import SharedH1 from "ui/info/text/shared_h1"
import SharedH2 from "ui/info/text/shared_h2"
import SharedH4 from "ui/info/text/shared_h4"
import SharedH5 from "ui/info/text/shared_h5"
import UsageCard from "ui/info/usage_card"
import EnergyCard from "ui/info/energy_card"
import { StyleSheet } from "react-native"
import { useResponsiveLayout } from "ui/window_utils";
import imagePaths from "@/app/imagePaths";
import Header1 from "ui/headers/header1";

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

    // Update readings every 8s
    const updateTime = 1000 * 8 

    // Get device readings
    const { data: deviceReading } = useQuery({
        queryKey: ['deviceReadings'],
        queryFn: async () => await apiGetLatestDeviceReading(deviceName),
        refetchInterval: updateTime
    })

    const layout: DeviceType = useResponsiveLayout()

    if (isLoadingDeviceInfo) {
        return (
            <div style={styles.verticalChildren}>
                <SharedH1 text="Device Details" />
                <SharedH5 text={`Loading device details for device ${deviceId}`} />
            </div>
        )
    }

    if (deviceInfo?.ok) {
        const deviceName = deviceInfo.value.name;
        const currentVoltage = deviceReading?.ok ? deviceReading.value.voltage : 0
        const currentCurrent = deviceReading?.ok ? deviceReading.value.current : 0

        // TODO: Get dynamic values for recent usage
        const stats = (
            <div style={styles.verticalChildren}>
                <DeviceReadings voltage={currentVoltage} current={currentCurrent} />

                <UsageCard 
                    title="Recent Usage"
                    description="Power usage over the last 24 hours."
                    value={"362 W"}
                    valueDescription="Power"/>

                <EnergyCard 
                    title="Putting It In Perspective"
                    description="Yesterday's usage compared to total power usage over the last 24 hours across all devices."
                    currentValue={362}
                    totalValue={1200}
                    unit="W"
                    icon={imagePaths["device_percentage"]}/>
            </div>
        )


        switch (layout) {
            case DeviceType.Mobile:
                return (
                    <div style={styles.verticalChildren}>
                        <Header1 
                            headerIcon={imagePaths.header_plug}
                            imagePaths={imagePaths}
                            title={deviceName}
                            onBack={ () => router.push(`/dashboard/${userId}/devices`) }/>
                        {stats}

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
                )
                break
            case DeviceType.Tablet:
                return (
                    <div style={styles.verticalChildren}>
                        <Header1 
                            headerIcon={imagePaths.header_plug}
                            imagePaths={imagePaths}
                            title={deviceName}
                            onBack={ () => router.push(`/dashboard/${userId}/devices`) }/>

                        {stats}

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
                )
                break
            case DeviceType.Desktop:
                return (
                    <div style={styles.verticalChildren}>
                        <SharedH1 text={deviceName} />
                        
                        {stats}

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
                )
                break
        }
    }
}

const styles = StyleSheet.create({
    verticalChildren: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 10,
        width: '100%'
    },
    actionsContainer: {
        width: "100%",
    }
})
