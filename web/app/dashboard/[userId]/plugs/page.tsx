'use client'
import { useParams } from "next/navigation"
import BasicButton from "ui/components/basic_button"
import SharedH1 from "ui/components/shared_h1"
import { useRouter } from 'next/navigation'
import DevicePreview from "ui/device_preview/comp"

export default function Plugs() {
	const { userId } = useParams<{ userId: string }>();
    const router = useRouter()

	return (
		<div>
            <SharedH1 text='Plugs'/>
            <div>
                <DevicePreview deviceImage="" deviceName="Plug 1" currUsage={10} totalUsage={30}/>
                <DevicePreview deviceImage="" deviceName="Plug 2" currUsage={5} totalUsage={30}/>
                <DevicePreview deviceImage="" deviceName="Plug 3" currUsage={15} totalUsage={30}/>
                
            </div>

            <BasicButton text='Back' onPress={() => router.push(`/dashboard/${userId}`) } />
		</div>
	)
}