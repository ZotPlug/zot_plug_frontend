'use client'
import { useParams } from "next/navigation"
import { useQuery } from '@tanstack/react-query'
import { device_control } from "@/app/api_utils/api_actions";
import { apiGetDeviceInfo, apiGetLatestDeviceReading } from "@/app/api_utils/api_device_actions";
import DeviceControl from "ui/deviceControl/comp"
import ToggleSwitchCard from "ui/deviceControl/toggle_switch_card"
import { DeviceControlReqs, DeviceType } from "ui/types";
import { useRouter } from 'next/navigation'
import DeviceReadings from "ui/deviceReadings/comp"
import MobileTabs from "ui/mobileTabs/mobileTabs"
import SharedH1 from "ui/info/text/shared_h1"
import SharedH5 from "ui/info/text/shared_h5"
import InfoCard from "ui/info/info_card"
import LinearGradient from "react-native-web-linear-gradient"
import InfoCardWithGraph from "ui/info/info_card_with_graph"
import UsageCard from "ui/info/usage_card"
import EnergyCard from "ui/info/energy_card"
import { StyleSheet, Text } from "react-native"
import { useResponsiveLayout } from "ui/window_utils";
import imagePaths from "@/app/imagePaths";
import Header1 from "ui/headers/header1";
import { useState } from "react";
import { Colors } from "ui/colors";

async function sendCommand(params: DeviceControlReqs) {
    const res = await device_control({ topic: params.topic, payload: params.payload, qos: params.qos, retain: params.retain })
    if (!res.ok) console.log(res.value)
}

enum SelectedDevicePage {
    Statistics,
    Limits,
    Actions,
    Users
}

export default function DevicePage() {
    // Device name is needed for mqtt to send cmd's to the proper device. I.e: Topic: {deviceName}/cmd/relay/on
    const { userId, deviceId, rawDeviceName } = useParams<{ userId: string, deviceId: string, rawDeviceName: string }>();

	const [selectedPage, setSelectedPage] = useState(SelectedDevicePage.Statistics)

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
        
        const recentUsage = (
            (layout === DeviceType.Mobile) ?
                <UsageCard 
                    title="Recent Usage"
                    description="Power usage over the last 24 hours."
                    value={"362 kWh"}
                    valueDescription="Energy"/>
                :
                <InfoCardWithGraph 
                    title="Usage Statistics"
                    description="Total power consumption over the past 24 hours for this device."
                    yesterdayValue={362}
                    lastWeekValue={1630}
                    lastMonthValue={12739}
                    graph={
                        <Text>Test graph stuff</Text>
                    }
                    unit="kWh"/>
        )

        // TODO: Get dynamic values for recent usage
        const stats = (
            <div style={styles.verticalChildren}>
                <DeviceReadings voltage={currentVoltage} current={currentCurrent} />

                {recentUsage}

                <EnergyCard 
                    title="Putting It In Perspective"
                    description="Yesterday's usage compared to total power usage over the last 24 hours across all devices."
                    currentValue={362}
                    totalValue={1200}
                    unit="W"
                    icon={imagePaths["device_percentage"]}/>
            </div>
        )

        const actions = (
            (layout === DeviceType.Mobile) ?
                <div style={styles.verticalChildren}>
                    <DeviceControl deviceName={deviceName} deviceEndpointFn={sendCommand} />
                </div>
                :
                <LinearGradient
                    start={{x: 0, y: 0}} 
                    end={{x: 1, y: 1}} 
                    colors={[Colors.BCGrad1, Colors.BCGrad2]}
                    style={styles.tabletVerticalWrapper}>

                    <Text style={styles.tabletText}>
                        Actions
                    </Text>
                    <DeviceControl deviceName={deviceName} deviceEndpointFn={sendCommand} />
                </LinearGradient>
        )

        // TODO: Add actual logic for limits if we have time.
        // (Using placeholder components right now because it's not a
        // priority)
        const limits = (
            (layout === DeviceType.Mobile) ?
                <div style={styles.verticalChildren}>
                    <ToggleSwitchCard 
                        title="Daily Usage Limits"/>
                    <ToggleSwitchCard 
                        title="Daily Time Limits"/>
                    <ToggleSwitchCard 
                        title="Only Allow Hours"/>
                </div>
                :
                <LinearGradient
                    start={{x: 0, y: 0}} 
                    end={{x: 1, y: 1}} 
                    colors={[Colors.BCGrad1, Colors.BCGrad2]}
                    style={styles.tabletVerticalWrapper}>
                    <Text style={styles.tabletText}>Limits</Text>
                    <ToggleSwitchCard 
                        title="Daily Usage Limits"/>
                    <ToggleSwitchCard 
                        title="Daily Time Limits"/>
                    <ToggleSwitchCard 
                        title="Only Allow Hours"/>
                </LinearGradient>
                
        )
         
        // TODO: Add functionality to this if we have time
        // (Using placeholder components right now because it's not a
        // priority)
        const users = (
            <div style={styles.verticalChildren}>
                <InfoCard 
                    title="Configure Roles"
                    description="No other users have access to this device."/>
                <InfoCard 
                    title="Device Owner ID"
                    description={userId}/>
            </div>
        )
        
        const tabs = (
            <MobileTabs 
                titles={["Statistics", "Limits", "Actions", "Users"]}
                images={[
                    imagePaths["tabs_statistics"],
                    imagePaths["tabs_limits"],
                    imagePaths["tabs_actions"],
                    imagePaths["tabs_users"]
                ]}
                imagesSelected={[
                    imagePaths["tabs_statisticsSelected"],
                    imagePaths["tabs_limitsSelected"],
                    imagePaths["tabs_actionsSelected"],
                    imagePaths["tabs_usersSelected"]
                ]}
                onOpen={[
                    () => setSelectedPage(SelectedDevicePage.Statistics),
                    () => setSelectedPage(SelectedDevicePage.Limits),
                    () => setSelectedPage(SelectedDevicePage.Actions),
                    () => setSelectedPage(SelectedDevicePage.Users),
                ]}/>
        )
        
        let content
        switch (selectedPage) {
            case SelectedDevicePage.Statistics:
                content = stats
                break
            case SelectedDevicePage.Limits:
                content = limits
                break
            case SelectedDevicePage.Actions:
                content = actions
                break
            case SelectedDevicePage.Users:
                content = users
                break
        }

        switch (layout) {
            case DeviceType.Mobile:
                return (
                    <div style={styles.tabWrapper}>
                        <Header1 
                            headerIcon={imagePaths.header_plug}
                            imagePaths={imagePaths}
                            title={deviceName}
                            onBack={ () => router.push(`/dashboard/${userId}/devices`) }/>

                            <div style={styles.columns}>
                                {content}
                            </div>
                        {tabs}
                    </div>
                )
                break
            case DeviceType.Tablet:
                return (
                    <div style={styles.tabWrapper}>
                        <Header1 
                            headerIcon={imagePaths.header_plug}
                            imagePaths={imagePaths}
                            title={deviceName}
                            onBack={ () => router.push(`/dashboard/${userId}/devices`) }/>

                        <div style={styles.columns}>
                            <div style={styles.verticalChildren}>
                                {stats}
                            </div>
                            <div style={styles.verticalChildren}>
                                {actions}
                                {limits}
                                {users}
                            </div>
                        </div>
                    </div>
                )
                break
            case DeviceType.Desktop:
                return (
                    <div>
                        <SharedH1 text={deviceName} center={false}/>
                        <div style={styles.desktopSpacer}/>
                        <div style={styles.tabWrapper}>

                            <div style={styles.columns}>
                                <div style={styles.verticalChildren}>
                                    {stats}
                                </div>
                                <div style={styles.verticalChildren}>
                                    {actions}
                                    {limits}
                                    {users}
                                </div>
                            </div>
                        </div>
                    </div>
                )
                break
        }
    }
}

const styles = StyleSheet.create({
    tabWrapper: {
        paddingBottom: 90,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
    },
    desktopSpacer: {
        paddingTop: 10,
    },
    verticalChildren: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
    },
    tabletVerticalWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 15,
        gap: 10,
        width: '100%',
        borderRadius: 10,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    tabletText: {
        fontWeight: 600,
        fontSize: 16,
        color: Colors.P1
    },
    columns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        width: '100%'
    },
    actionsContainer: {
        width: "100%",
    }
})
