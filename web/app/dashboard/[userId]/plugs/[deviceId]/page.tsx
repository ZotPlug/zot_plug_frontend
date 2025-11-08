'use client'
import { useParams } from "next/navigation"
import BasicButton from "ui/components/basic_button"
import SharedH1 from "ui/components/shared_h1"
import { useRouter } from 'next/navigation'
import DeviceReadings from "ui/deviceReadings/comp"
import SharedH2 from "ui/components/shared_h2"

export default function DevicePage() {
	const { userId } = useParams<{ userId: string }>();
	const { deviceId } = useParams<{ deviceId: string }>();
    const router = useRouter()

	return (
		<div>
            <SharedH1 text={`Plug: ${deviceId}`}/>
            <BasicButton text='Back' onPress={() => router.push(`/dashboard/${userId}/plugs`) } />
            <div>
                <SharedH2 text='Statistics' />
                <DeviceReadings voltage={120} current={1.3} />
            </div>
            <div>
                <SharedH2 text='Limits' />
            </div>
            <div>
                <SharedH2 text='Actions' />
            </div>
            <div>
                <SharedH2 text='Users' />
            </div>

		</div>
	)
}