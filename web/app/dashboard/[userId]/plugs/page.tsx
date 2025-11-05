'use client'
import { useParams } from "next/navigation"
import BasicButton from "ui/components/basic_button"
import SharedH1 from "ui/components/shared_h1"
import { useRouter } from 'next/navigation'
import DevicePreview from "ui/device_preview/comp"

export default function Plugs() {
	const { userId } = useParams<{ userId: string }>();
    const router = useRouter()

    // Nested function because router is only accessible from 
    // the top level hook function Plugs()
    function openDeviceStats(deviceId: number) {
        const path = `/dashboard/${userId}/plugs/${deviceId}`

        router.push(path)
    }

    // TODO: Replace this code with a for loop when we're actually reading data 
    // from the backend. Need to remove deviceId magic number redundancy
	return (
		<div>
            <SharedH1 text='Plugs'/>
            <div>
                <DevicePreview deviceImage="/images/lightning.png" deviceName="Plug 1" currUsage={10} totalUsage={30} deviceId={1} redirectOnClick={() => openDeviceStats(1)}/>
                <DevicePreview deviceImage="" deviceName="Plug 2" currUsage={5} totalUsage={30} deviceId={2} redirectOnClick={() => openDeviceStats(2)} />
                <DevicePreview deviceImage="/images/heater.png" deviceName="Plug 3" currUsage={15} totalUsage={30} deviceId={3} redirectOnClick={() => openDeviceStats(3)} />
            </div>

            <BasicButton text='Back' onPress={() => router.push(`/dashboard/${userId}`) } />
		</div>
	)
}