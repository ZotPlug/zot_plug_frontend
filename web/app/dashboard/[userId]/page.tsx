// web/app/dashboard/[userId]/page.tsx
'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { add_device, fetch_user_by_id, get_all_devices_by_userId } from "@/app/api_utils/api_actions"

import SharedH1 from "ui/info/text/shared_h1"
import SharedH2 from "ui/info/text/shared_h2"
import AddDevice from "ui/addDevice/comp"
import DevicePreview from "ui/devicePreview/comp"

import { UserDeviceInfo } from "ui/types"

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

	async function fetchUserInfo() {
		const res = await fetch_user_by_id({ userId })
		if (!res.ok) SetModalMessage({ ok: false, message: res.error! })
		else setUser(res.value)
	}

	async function fetchUserDevices() {
		const res = await get_all_devices_by_userId({ userId })
		if (!res.ok) SetModalMessage({ ok: false, message: res.error! })
		else setDevices(res.value)
	}

	useEffect(() => {
		fetchUserInfo()
		fetchUserDevices()
	}, [userId])

	return (
		<>
			{/* Header */}
			<SharedH1 text={`Welcome, ${user?.firstname} ${user?.lastname} !`} mode="light" />

			{/* Usage Overview */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{['Daily', 'Weekly', 'Monthly'].map((label => (
					<div key={label} className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
						<SharedH2 text={`${label} Usage`} mode="light" />
						<p className="mt-4 text-gray-600 text-sm">Placeholder Data</p>
					</div>
				)))}
			</div>

			{/* Quick Summary */}
			<div className="bg-stone-100 border border-gray-300 rounded-lg p-5 shadow-md">
				<SharedH2 text="Quick Summary" mode="light" />
				<div className="mt-4 space-y-2 text-sm text-gray-700">	
					<li> Active devices: {devices.length} </li>
					<li> Most used device: Living Room Plug </li>
					<li> Energy trend: Slightly lower than yesterday </li>
					<li> Energy score: 82 / 100 </li>
				</div>
			</div>

			{/* Devices Box */}
			<div className="border border-gray-300 rounded-lg p-3 bg-stone-100">
				<SharedH2 text="Most Used Devices" mode="light" />
				<div className="flex flex-col gap-3 mt-2">
					{devices.slice(0, 4).map((device) => (
						<DevicePreview
							key={device.device_id}
							deviceId={device.device_id}
							deviceName={device.device_name}
							deviceImage='/images/ZotplugLogo_NoText_NoBackground.png'
							currUsage={0}
							totalUsage={0}
							redirectOnClick={() => {}}
						/>
					))}
				</div>

				<div className="mt-6">
					<AddDevice onSubmit={addDevice} modalMessage={modalMessage} SetModalMesage={SetModalMessage} />
				</div>
			</div>
		</>
	)
}
