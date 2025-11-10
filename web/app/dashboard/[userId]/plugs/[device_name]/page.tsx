'use client'
import { useParams } from "next/navigation"
import { device_control } from "@/app/api_utils/api_actions";
import DeviceControl from "ui/deviceControl/comp"
import { DeviceControlReqs } from "ui/types";
import BasicButton from "ui/components/basic_button"
import SharedH1 from "ui/components/shared_h1"
import { useRouter } from 'next/navigation'
import DeviceReadings from "ui/deviceReadings/comp"
import SharedH2 from "ui/components/shared_h2"

export default function DevicePage() {
    const { userId } = useParams<{ userId: string }>();
    const { device_name } = useParams<{ device_name: string }>(); // Device name is needed for mqtt to send cmd's to the proper device. I.e: Topic: {device_name}/cmd/relay/on
    const router = useRouter()

    async function sendCommand(params: DeviceControlReqs) {
        const res = await device_control({ topic: params.topic, payload: params.payload, qos: params.qos, retain: params.retain })
        if (!res.ok) console.log(res.value)
    }

    return (
        <div>
            <SharedH1 text={`Plug: ${device_name}`} />
            <BasicButton text='Back' onPress={() => router.push(`/dashboard/${userId}/plugs`)} />
            <div>
                <SharedH2 text='Statistics' />
                <DeviceReadings voltage={120} current={1.3} />
            </div>
            <div>
                <SharedH2 text='Limits' />
            </div>
            <div>
                <SharedH2 text='Actions' />
                <DeviceControl deviceName={device_name} deviceEndpointFn={sendCommand} />
            </div>
            <div>
                <SharedH2 text='Users' />
            </div>

        </div>
    )
}
