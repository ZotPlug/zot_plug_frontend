'use client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from "next/navigation"
import SharedH1 from "ui/info/text/shared_h1"
import SharedH2 from "ui/info/text/shared_h2"
import { useRouter } from 'next/navigation'
import DevicePreview from "ui/devicePreview/comp"
import { get_all_devices_by_userId } from '@/app/api_utils/api_actions'
import imagePaths from '@/app/imagePaths'
import { DeviceType } from 'ui/types'
import { useResponsiveLayout } from 'ui/window_utils'
import Header1 from 'ui/headers/header1'

export default function Plugs() {

    const img_arr = [imagePaths["devices_preview"], imagePaths["devices_preview2"], imagePaths["devices_preview3"]]
    let img_i = 0
    const { userId } = useParams<{ userId: string }>();
    const router = useRouter()
    
    const layout: DeviceType = useResponsiveLayout()

    const { data: plugs, isLoading } = useQuery({
        queryKey: ['plugs'],
        queryFn: async () => await get_all_devices_by_userId({ userId })
    })

    // Nested function because router is only accessible from 
    // the top level hook function Plugs()
    function openDeviceStats(deviceId: number, deviceName: string) {
        const path = `/dashboard/${userId}/devices/${deviceId.toString()}/${deviceName}`
        router.push(path)
    }
    
    const header = (layout === DeviceType.Desktop) ? (
        <SharedH1 text={'Devices'} />
    ) : (
        <Header1 
            title='Devices' 
            headerIcon={imagePaths["header_plug"]}
            imagePaths={imagePaths} 
            onBack={() => router.push(`/dashboard/${userId}`)}/>        
    )

    return (
        <>
            {/* Header */}
            {header}

            {/* My Devices */}
            <div className="bg-stone-100 border border-gray-300 rounded-lg p-4 shadow-md">
                <SharedH2 text="Your Devices" mode="light" />

                <div className="mt-6 flex flex-col gap-6">
                    {isLoading ? (
                        <div> Loading device data... </div>

                    ) : plugs && plugs.ok ? (

                        plugs.value.map(({ device_name, device_id }) => {
                            // These two lines mainly just for test
                            const currUsageTest = Number((Math.random() * 30).toFixed(2));
                            if (img_i > 1) img_i = 0; else ++img_i

                            return (
                                <DevicePreview 
                                    key={device_id} 
                                    deviceImage={img_arr[img_i]} 
                                    deviceName={device_name} 
                                    currUsage={currUsageTest} 
                                    totalUsage={30} 
                                    deviceId={device_id} 
                                    redirectOnClick={() => openDeviceStats(device_id, device_name)} 
                                />
                            )
                        })
                    ) : (
                        <div> No devices attached to your account. </div>
                    )}
                </div>
            </div>
        </>

    )
}
