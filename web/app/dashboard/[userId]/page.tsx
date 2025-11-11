// web/app/dashboard/[userId]/page.tsx
'use client'
import { useParams } from "next/navigation"
import { add_device } from "@/app/api_utils/api_actions";
import { useRouter } from 'next/navigation'
import { Category, BasicButton } from 'ui/components';
import SharedH1 from "ui/components/shared_h1"
import AddDevice from "ui/addDevice/comp"
import { useState } from "react";

export default function Dashboard() {
	const { userId } = useParams<{ userId: string }>();
	const [modalMessage, SetModalMessage] = useState<{ ok: boolean, message: string } | null>(null)
	const router = useRouter()

	async function addDevice(params: { deviceName: string }) {
		const res = await add_device({ userId, deviceName: params.deviceName })
		if (!res.ok) SetModalMessage({ ok: false, message: res.error! })
		else SetModalMessage({ ok: true, message: 'Device added' })
	}

	return (
		<div className="flex flex-col">
			<div className="flex flex-col">
				<SharedH1 text="Dashboard" />
				<h1>User: {userId}</h1>
			</div>

			<div className="flex justify-center">
				<div className="flex flex-col w-full">
					<AddDevice onSubmit={addDevice} modalMessage={modalMessage} SetModalMesage={SetModalMessage} />
					<BasicButton text='Plugs' onPress={() => router.push(`/dashboard/${userId}/plugs`)} />
					<BasicButton text='Power Usage' onPress={() => router.push(`/dashboard/${userId}/power_usage`)} />
					<BasicButton text='Rewards' onPress={() => router.push(`/dashboard/${userId}/rewards`)} />
					<BasicButton text='Friends' onPress={() => router.push(`/dashboard/${userId}/friends`)} />
					<BasicButton text='Settings' onPress={() => router.push(`/dashboard/${userId}/settings`)} />

					<div className="flex flex-row justify-center gap-x-3">
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
					</div>
				</div>
			</div>
		</div>
	)
}

