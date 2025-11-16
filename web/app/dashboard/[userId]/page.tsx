// web/app/dashboard/[userId]/page.tsx
'use client'
import { useParams } from "next/navigation"
import { add_device, fetch_user_by_id, get_all_devices_by_userId } from "@/app/api_utils/api_actions"
import { useRouter } from 'next/navigation'
import { Category, BasicButton } from 'ui/components'
import SharedH1 from "ui/components/shared_h1"
import AddDevice from "ui/addDevice/comp"
import DailyTarget from "ui/dailyTarget/comp"
import DevicePreview from "ui/device_preview/comp"
import { useEffect, useState } from "react";
import { UserDeviceInfo } from "ui/types"

export default function Dashboard() {
	const { userId } = useParams<{ userId: string }>()
	const [user, setUser] = useState<{ firstname: string; lastname: string; userId: string } | null>(null)
	const [devices, setDevices] = useState<UserDeviceInfo[]>([])
	const [dailyTarget, setDailyTarget] = useState<{ currProgress: number, maxProgress: number}>({ currProgress: 350, maxProgress: 1000 })
	const [modalMessage, SetModalMessage] = useState<{ ok: boolean, message: string } | null>(null)
	const router = useRouter()

	async function addDevice(params: { deviceName: string }) {
		const res = await add_device({ userId, deviceName: params.deviceName })
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
		<div className="flex flex-col p-4 gap-y-4">
			{/* Two column layout: Left column for greeting and device previews. Right column for daily target and actions */}

			<div className="flex flex-col md:flex-row gap-6">
				{/* Left Column */}
				<div className="flex-1 flex flex-col gap-4">
					<SharedH1 text={`Welcome ${user?.firstname} ${user?.lastname}`}/>

					<div className="grid grid-cols-2 gap-4">
						{devices.slice(0, 10).map((device) => (
							<DevicePreview
								key={device.device_id}
								deviceId={device.device_id}
								deviceName={device.device_name}
								deviceImage='/images/ZotplugLogo_NoText_NoBackground.png'
								currUsage={0}
								totalUsage={0}
								redirectOnClick={(id: string) => router.push(`/dashboard/${userId}/device/${id}`)}
							/>
						))}
					</div>
				</div>

				{/* Right Column */}
				<div className="flex flex-col gap-4 w-full md:w-64">
					<DailyTarget currProgress={dailyTarget.currProgress} maxProgress={dailyTarget.maxProgress}/>

					<AddDevice onSubmit={addDevice} modalMessage={modalMessage} SetModalMesage={SetModalMessage} />

					<BasicButton text='Plugs' onPress={() => router.push(`/dashboard/${userId}/plugs`)} />
					<BasicButton text='Power Usage' onPress={() => router.push(`/dashboard/${userId}/power_usage`)} />
					<BasicButton text='Rewards' onPress={() => router.push(`/dashboard/${userId}/rewards`)} />
					<BasicButton text='Friends' onPress={() => router.push(`/dashboard/${userId}/friends`)} />
					<BasicButton text='Settings' onPress={() => router.push(`/dashboard/${userId}/settings`)} />

					{/* <div className="flex flex-row justify-center gap-x-3">
						<Category
							displayText="Lightning"
							imageFilePath="/images/lightning.png"
							size="big"
							onPress={() => console.log('Lightning pressed')}
							accessibilityLabel={""}
							testID={""}
							style={undefined}
						/>

						<Category
							displayText="Fans"
							imageFilePath="/images/fan.png"
							size="small"
							onPress={() => console.log('Fans pressed')}
							accessibilityLabel={""}
							testID={""}
							style={undefined}
						/>

						<Category
							displayText="Heater"
							imageFilePath="/images/heater.png"
							size="small"
							onPress={() => console.log('Heater pressed')}
							accessibilityLabel={""}
							testID={""}
							style={undefined}
						/>
					</div> */}
				</div>
			</div>
		</div>
	)
}

