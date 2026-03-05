// web/app/dashboard/[userId]/page.tsx
'use client'
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Text, StyleSheet } from 'react-native'

import { add_device, fetch_user_by_id, get_all_devices_by_userId } from "@/app/api_utils/api_actions"
import GraphSection from "@/app/graph_section/page"

import SharedH1 from "ui/info/text/shared_h1"
import SharedHr from "ui/info/shared_hr"
import AddDevice from "ui/addDevice/comp"
import DevicePreview from "ui/devicePreview/comp"

import { DeviceType, UserDeviceInfo } from "ui/types"
import { useQueries } from "@tanstack/react-query"
import { Colors } from "ui/colors"

import LinearGradient from "react-native-linear-gradient"
import UsageCard from "ui/info/usage_card"
import { useResponsiveLayout } from "ui/window_utils"
import Header2 from "ui/headers/header2"
import imagePaths from "@/app/imagePaths"
import DailyTarget from "ui/dailyTarget/comp"
import DashboardButtonBig from "ui/buttons/dashboard_button_big"
import DashboardButtonSmall from "ui/buttons/dashboard_button_small"
import AddDeviceButton from "ui/buttons/add_device_button"
import InfoCardWithGraph from "ui/info/info_card_with_graph"

export default function Dashboard() {
	const { userId } = useParams<{ userId: string }>()
	const [user, setUser] = useState<{ firstname: string; lastname: string; userId: string } | null>(null)
	const [devices, setDevices] = useState<UserDeviceInfo[]>([])
	const [modalMessage, SetModalMessage] = useState<{ ok: boolean, message: string } | null>(null)

    const router = useRouter()
    
    // TODO: Add actual target logic
    const currentUsage = 50
    const maxUsage = 100

	async function addDevice(params: { deviceName: string }) {
		const res = await add_device({ userId: parseInt(userId), deviceName: params.deviceName })
		if (!res.ok) SetModalMessage({ ok: false, message: res.error! })
		else {
			SetModalMessage({ ok: true, message: 'Device added' })
			fetchUserDevices()
		}
	}

    const [userInfoQuery, userDeviceQuery] = useQueries({
        queries: [
            {
                queryKey: ['userInfo'],
                queryFn: async () => fetch_user_by_id({ userId })
            },
            {
                queryKey: ['userDevices'],
                queryFn: async () => get_all_devices_by_userId({ userId })
            }
        ]
    })

	async function fetchUserDevices() {
		const res = await get_all_devices_by_userId({ userId })
		if (!res.ok) SetModalMessage({ ok: false, message: res.error! })
		else setDevices(res.value)
	}

	useEffect(() => {
        if (!userInfoQuery.isLoading) {
            if (userInfoQuery.data == undefined || !userInfoQuery.data.ok) {
                SetModalMessage({ ok: false, message: "User info query error" })
            } else if (userInfoQuery.data.value) {
                setUser(userInfoQuery.data.value)
            }
        }
        if (!userDeviceQuery.isLoading) {
            if (userDeviceQuery.data == undefined || !userDeviceQuery.data.ok) {
                SetModalMessage({ ok: false, message: "User device query error" })
            } else if (userDeviceQuery.data.value) {
                setDevices(userDeviceQuery.data.value)
            }
        }}, [userInfoQuery.data, userInfoQuery.isLoading, userDeviceQuery.data, userDeviceQuery.isLoading])

	const usagePeriods = [{
		label: 'Daily',
		value: '3 kWh',
		description: 'Energy usage over the last 24 hours.'
	},{
		label: 'Weekly',
		value: '13 kWh',
		description: 'Energy usage over the last 7 days.'
	},{
		label: 'Monthly',
		value: '100 kWh',
		description: 'Energy usage over the last 30 days.'
	}]
    
    const layout: DeviceType = useResponsiveLayout()
    
    const headerText = `Welcome, ${user?.firstname} ${user?.lastname} !`
    
    let header
    switch (layout) {
        case DeviceType.Mobile:
            header = <SharedH1 
                text={headerText} 
                center={true}/>
            break
        case DeviceType.Tablet:
            header = 
                <Header2 
                    title={headerText} 
                    headerIcon={imagePaths["header_plug"]}
                    />
            break
        case DeviceType.Desktop:
            header = <SharedH1 
                text={headerText} 
                center={false}/>
            break
    }

    const targetUsage = (
        <DailyTarget 
            currProgress={currentUsage}
            maxProgress={maxUsage}
            imagePaths={imagePaths}/>
    )
    
    const devicesSection = (
        layout === DeviceType.Desktop ? (
            <>
                <div className="grid grid-cols-2 gap-3 mt-2">
                    {devices.slice(0, 4).map((device) => (
                        <DevicePreview
                            key={device.device_id}
                            deviceId={device.device_id}
                            deviceName={device.device_name}
                            deviceImage=''
                            currUsage={0}
                            totalUsage={0}
                            redirectOnClick={() => {router.push(`/dashboard/${userId}/devices/${device.device_id.toString()}/${device.device_name}`)}}
                        />
                    ))}
                </div>
            </>
        ) : (
            <>
                <div className="grid grid-cols-1 gap-3 mt-2">
                    {devices.slice(0, 4).map((device) => (
                        <DevicePreview
                            key={device.device_id}
                            deviceId={device.device_id}
                            deviceName={device.device_name}
                            deviceImage=''
                            currUsage={0}
                            totalUsage={0}
                            redirectOnClick={() => {router.push(`/dashboard/${userId}/devices/${device.device_id.toString()}/${device.device_name}`)}}
                        />
                    ))}
                </div>
            </>
        )
    )
    
    // TODO: Add actual query logic to grab these numbers
    const yesterdayValue = 362
    const lastWeekValue = 1630
    const lastMonthValue = 12739
    
    switch (layout) {
        case DeviceType.Mobile:
            return (
                <>
                    {header}
                    {targetUsage}
                    <SharedHr />
                    <div style={styles.mobileGrid}> 
                        <DashboardButtonBig 
                            className="col-span-2"
                            text="Devices" 
                            imagePath={imagePaths["nav_devices"]}
                            onPress={() => router.push(`/dashboard/${userId}/devices`)}/>
                        <DashboardButtonSmall
                            text="Power Usage" 
                            imagePath={imagePaths["nav_powerUsage"]}
                            onPress={() => router.push(`/dashboard/${userId}/power_usage`)}/>
                        <DashboardButtonSmall
                            text="Rewards" 
                            imagePath={imagePaths["nav_rewards"]}
                            onPress={() => router.push(`/dashboard/${userId}/rewards`)}/>
                        <DashboardButtonSmall
                            text="Friends" 
                            imagePath={imagePaths["nav_friends"]}
                            onPress={() => router.push(`/dashboard/${userId}/friends`)}/>
                        <DashboardButtonSmall
                            text="Settings" 
                            imagePath={imagePaths["nav_settings"]}
                            onPress={() => router.push(`/dashboard/${userId}/settings`)}/>
                    <DashboardButtonBig 
                        text="Campus Usage" 
                        className="col-span-2"
                        imagePath={imagePaths["nav_campusUsage"]}
                        onPress={() => router.push(`/dashboard/${userId}/campus_usage`)}/>
                    </div>
                </>
            )
            break
        case DeviceType.Tablet:
            return (
                <>
                    {header}
                    <div style={styles.mobileGrid}> 
                        {targetUsage}
                        <div style={styles.tabletUsageStatistics}>
                            <div style={styles.headerText}>Usage Statistics</div>
                            <InfoCardWithGraph 
                                title="Usage Statistics"
                                description="Energy usage over the past 24 hours."
                                yesterdayValue={yesterdayValue}
                                lastWeekValue={lastWeekValue}
                                lastMonthValue={lastMonthValue}
                                showBackground={false}
                                graph={
                                <GraphSection 
                                    userId={userId}
                                    isRange={false}
                                    fixedRange="24h"
                                    showUsageStats={true}
                                    showDevices={false}
                                    showDeviceName={true}
                                    showDescription={false}
                                    />
                                }
                                unit="kWh"
                                />
                        </div>
                        <div style={styles.tabletMostUsedDevices}>
                            <div style={styles.headerText}>Most Used Devices</div>
                            {devicesSection}
                            <div style={styles.spacer}></div>
                            <SharedHr />
                            <div style={styles.spacer}></div>
                            <AddDeviceButton 
                                text="All Devices" 
                                imagePath={imagePaths["nav_devicesHover"]}
                                onPress={() => {}} />
                        </div>
                        <DashboardButtonBig
                            text="Rewards" 
                            imagePath={imagePaths["nav_rewards"]}
                            onPress={() => router.push(`/dashboard/${userId}/rewards`)}/>
                        <DashboardButtonBig
                            text="Friends" 
                            imagePath={imagePaths["nav_friends"]}
                            onPress={() => router.push(`/dashboard/${userId}/friends`)}/>
                        <DashboardButtonBig
                            text="Settings" 
                            imagePath={imagePaths["nav_settings"]}
                            onPress={() => router.push(`/dashboard/${userId}/settings`)}/>
                        

                        <DashboardButtonBig 
                            text="Campus Usage" 
                            imagePath={imagePaths["nav_campusUsage"]}
                            onPress={() => router.push(`/dashboard/${userId}/campus_usage`)}/>
                    </div>
                </>
            )
            break
        case DeviceType.Desktop:
            return (
                <>
                    {/* Header */}
                    {header}

                    {/* Usage Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {usagePeriods.map(({ label, value, description }) => (
                            <UsageCard
                                key={label}
                                title={`${label} Usage`}
                                description={description}
                                value={value}
                                valueDescription="Energy"
                            />
                        ))}
                    </div>

                    {/* Graph Section */}
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[Colors.BCGrad1, Colors.BCGrad2]}
                        style={styles.gradient}
                    >
                        <Text style={styles.headerText}>Quick Summary</Text>
                        <GraphSection 
                            userId={userId}
                            isRange={true}
                        />
                    </LinearGradient>

                    {/* Devices Box */}
                    <LinearGradient 
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[Colors.BCGrad1, Colors.BCGrad2]}
                        style={styles.gradient}
                    >
                        <Text style={styles.headerText}>Most Used Devices</Text>
                        {devicesSection}
                        
                        <div className="mt-6">
                            <AddDevice onSubmit={addDevice} modalMessage={modalMessage} SetModalMesage={SetModalMessage} />
                        </div>
                    </LinearGradient>				
                </>
            )
            break
    }

}

const styles = StyleSheet.create({
	gradient: {
		width: '100%',
		padding: 12,
		borderRadius: 12,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
	},
	graphCard: {
		flex: 1,          
		padding: 12,
		borderRadius: 12,
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
	},
    mobileGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        paddingBottom: 12
    },
    headerText: {
        color: Colors.S1,
        fontWeight: 600,
        fontSize: 24,
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    tabletMostUsedDevices: {
        gridRow: 'span 4',
        backgroundColor: Colors.P4,
        borderRadius: 10,
        borderWidth: 3,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderColor: Colors.P1,
        padding: 12
    },
    tabletUsageStatistics: {
        gridRow: 'span 5',
        backgroundColor: Colors.P4,
        borderRadius: 10,
        borderWidth: 3,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderColor: Colors.P1,
        padding: 12
    },
    spacer: {
        marginTop: 16,
        marginBottom: 12
    }
})
