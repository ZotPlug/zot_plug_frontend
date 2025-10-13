import { NextRequest, NextResponse } from "next/server";
import { toErrorMessage } from "@/app/api_utils/helper";
import { DeviceControlReqs, DeviceControlRes } from "@/app/api_utils/types";
import createApiClient from "api/req";
const api = createApiClient({ device: "web" })

export async function POST(req: NextRequest) {
	const body: DeviceControlReqs = await req.json()
	const { topic, payload, qos, retain } = body

	try {
		const res = await api.fetchJSON<DeviceControlRes>({ endpoint: "/api/mqtt/publish", method: "POST", body: { topic, payload, qos, retain } })

		if (res.ok) {
			return NextResponse.json({ ok: true, message: `Command was sent to: ${topic}` })
		} else {
			return NextResponse.json({ ok: false, message: `Command failed to send to: ${topic}` })
		}
	} catch (err) {
		return NextResponse.json({ ok: false, message: toErrorMessage(err) })
	}
}
