// web/app/dashboard/[userId]/page.tsx

'use client'
import { useParams } from "next/navigation"
import DeviceControl from "ui/deviceControl/comp"
import { deviceControl } from "@/app/api_utils/api_actions";
import { DeviceControlReqs } from "ui/types";
import { useRouter } from 'next/navigation'
import { Category, BasicButton } from 'ui/components';

export default function Dashboard() {
	const { userId } = useParams<{ userId: string }>();
    
    const router = useRouter()

	async function sendCommand(params: DeviceControlReqs) {
		const res = await deviceControl({ topic: params.topic, payload: params.payload, qos: params.qos, retain: params.retain })
		if (!res.ok) console.log(res.value)
	}

	return (
		<div>
			<h1>Unique dashboard of user: {userId}</h1>
			<DeviceControl deviceEndpointFn={sendCommand} />
            
            <BasicButton text='Plugs' onPress={() => router.push(`/dashboard/${userId}/plugs`) } />
            <BasicButton text='Power Usage' onPress={() => router.push(`/dashboard/${userId}/power_usage`)} />
            <BasicButton text='Rewards' onPress={() => router.push(`/dashboard/${userId}/rewards`)} />
            <BasicButton text='Friends' onPress={() => router.push(`/dashboard/${userId}/friends`)} />
            <BasicButton text='Settings' onPress={() => router.push(`/dashboard/${userId}/settings`)} />

			<div style={{
				display: 'flex',
				gap: 16,
				flexWrap: 'wrap',
				alignItems: 'flex-start',
			}}>
				
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
				displayText="Heating"
				imageFilePath="/images/heater.png"
				size="small"
				onPress={() => console.log('Heating pressed')}
				accessibilityLabel={""} 
				testID={""} 
				style={undefined}
			/>
			</div>
		</div>
	)
}

