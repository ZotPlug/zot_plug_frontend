// web/app/dashboard/[userId]/page.tsx
'use client'
import { useParams } from "next/navigation"
import { add_device, fetch_user_by_id, get_all_devices_by_userId } from "@/app/api_utils/api_actions"
import { useRouter } from 'next/navigation'
import { BasicButton } from 'ui/components'
import SharedH1 from "ui/components/shared_h1"
import SharedH2 from "ui/components/shared_h2"
import SharedH3 from "ui/components/shared_h3"
import AddDevice from "ui/addDevice/comp"
import DailyTarget from "ui/dailyTarget/comp"
import DevicePreview from "ui/device_preview/comp"
import { useEffect, useState } from "react";
import { UserDeviceInfo } from "ui/types"

export default function Dashboard() {
	const { userId } = useParams<{ userId: string }>()
	const [user, setUser] = useState<{ firstname: string; lastname: string; userId: string } | null>(null)
	const [devices, setDevices] = useState<UserDeviceInfo[]>([])
	const [dailyTarget] = useState<{ currProgress: number, maxProgress: number }>({ currProgress: 350, maxProgress: 1000 })
	const [modalMessage, SetModalMessage] = useState<{ ok: boolean, message: string } | null>(null)
	const router = useRouter()

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
		<div className="min-h-screen w-full bg-sky-200 p-6">
			{/* Main container with padding and background color */}

			<div className="bg-stone-100 border border-gray-300 rounded-lg p-3 shadow-md">
				<div className="mt-10 pb-8 flex flex-row w-full">
					<div className="w-full flex justify-start">
						<SharedH1 text={`Welcome, ${user?.firstname} ${user?.lastname} !`} mode="light" />
					</div>

					{/* Daily Target Box */}
					<div className="w-full flex justify-end">
						{/* <SharedH3 text="Daily Target" mode="light"/> */}
						<DailyTarget
							currProgress={dailyTarget.currProgress}
							maxProgress={dailyTarget.maxProgress}
						/>
					</div>
				</div>
			</div>

			<div className="mt-10 flex flex-col md:flex-row gap-8 w-full">
				{/* Two column layout: Left column for greeting and device previews. Right column for daily target and actions */}

				{/* Left Column */}
				<div className="w-full md:w-2/3 flex flex-col gap-6">

					{/* Plugs Box */}
					<div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
						<SharedH2 text="Plugs" mode="light" />

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

							{/* Left Column - My Plugs */}
							<div className="border border-gray-300 rounded-lg p-3 bg-sky-100">
								<SharedH3 text="My Plugs" mode="light" />

								<div className="flex flex-col gap-3 mt-2">
									{devices.slice(0, 5).map((device) => (
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

							{/* Embedded Right Column - My Friend's Plugs*/}
							<div className="border border-gray-300 rounded-lg p-3 bg-sky-100">
								<SharedH3 text="My Friend's Plugs" mode="light" />

								<div className="flex flex-col gap-3">
									{devices.slice(0, 5).map((device) => (
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
						</div>

						<div className="mt-6">
							<AddDevice onSubmit={addDevice} modalMessage={modalMessage} SetModalMesage={SetModalMessage} />
						</div>
					</div>
				</div>


				{/* Right Column */}
				<div className="w-full md:w-1/3 flex flex-col gap-6">

					{/* Action Buttons */}
					<div className="flex flex-col gap-4">
						<BasicButton text='Plugs' onPress={() => router.push(`/dashboard/${userId}/plugs`)} />
						<BasicButton text='Power Usage' onPress={() => router.push(`/dashboard/${userId}/power_usage`)} />
						<BasicButton text='Rewards' onPress={() => router.push(`/dashboard/${userId}/rewards`)} />
						<BasicButton text='Friends' onPress={() => router.push(`/dashboard/${userId}/friends`)} />
						<BasicButton text='Settings' onPress={() => router.push(`/dashboard/${userId}/settings`)} />
					</div>

					{/* Categories (Commented Out) */}

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

