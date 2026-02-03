// web/app/dashboard/[userId]/page.tsx
'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { StyleSheet } from 'react-native'

import { add_device, fetch_user_by_id, get_all_devices_by_userId } from "@/app/api_utils/api_actions"

import SharedH1 from "ui/info/text/shared_h1"
import SharedH2 from "ui/info/text/shared_h2"
import AddDevice from "ui/addDevice/comp"
import DevicePreview from "ui/devicePreview/comp"

import { UserDeviceInfo } from "ui/types"
import { useQueries } from "@tanstack/react-query"
import { Colors } from "ui/colors"

import MostUsedDevicesGraph from "@/app/info/graphs/devices"
import UsageStatisticsGraph from "@/app/info/graphs/usage_stats"
import LinearGradient from "react-native-linear-gradient"
import UsageCard from "ui/info/usage_card"

export default function Dashboard() {
	const { userId } = useParams<{ userId: string }>()
	const [user, setUser] = useState<{ firstname: string; lastname: string; userId: string } | null>(null)
	const [devices, setDevices] = useState<UserDeviceInfo[]>([])
	const [modalMessage, SetModalMessage] = useState<{ ok: boolean, message: string } | null>(null)

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
		value: '362 W',
		description: 'Power usage over the last 24 hours.'
	},{
		label: 'Weekly',
		value: '1,362 W',
		description: 'Power usage over the last 7 days.'
	},{
		label: 'Monthly',
		value: '4,362 W',
		description: 'Power usage over the last 30 days.'
	}]

	return (
		<>
			{/* Header */}
			<SharedH1 text={`Welcome, ${user?.firstname} ${user?.lastname} !`} />

			{/* Usage Overview */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{usagePeriods.map(({ label, value, description }) => (
					<UsageCard
						key={label}
						title={`${label} Usage`}
						description={description}
						value={value}
						valueDescription="Power"
					/>
				))}
			</div>

			{/* Quick Summary */}
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[Colors.BCGrad1, Colors.BCGrad2]}
				style={styles.gradient}
			>
				<SharedH2 text="Quick Summary" />

				<div className="flex flex-row gap-6 mt-2 w-full">
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						colors={[Colors.GGrad1, Colors.GGrad2]}
						style={styles.graphCard}
					>
						<UsageStatisticsGraph />
					</LinearGradient>

					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						colors={[Colors.GGrad2, Colors.GGrad2]}
						style={styles.graphCard}
					>
						<MostUsedDevicesGraph />
					</LinearGradient>
				</div>
			</LinearGradient>

			{/* Devices Box */}
			<LinearGradient 
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[Colors.BCGrad1, Colors.BCGrad2]}
				style={styles.gradient}
			>
				<SharedH2 text="Most Used Devices" mode="light" />
				<div className="grid grid-cols-2 gap-3 mt-2">
					{devices.slice(0, 4).map((device) => (
						<DevicePreview
							key={device.device_id}
							deviceId={device.device_id}
							deviceName={device.device_name}
							deviceImage=''
							currUsage={0}
							totalUsage={0}
							redirectOnClick={() => {}}
						/>
					))}
				</div>
				
				<div className="mt-6">
					<AddDevice onSubmit={addDevice} modalMessage={modalMessage} SetModalMesage={SetModalMessage} />
				</div>
			</LinearGradient>				
		</>
	)
}

const styles = StyleSheet.create({
	gradient: {
		width: '100%',
		padding: 12,
		borderRadius: 12,
	},
	graphCard: {
		flex: 1,          
		padding: 12,
		borderRadius: 12,
	},
})
