import { NextRequest, NextResponse } from "next/server";
import { toErrorMessage } from "@/app/api_utils/helper";
import createApiClient from "api/req";
import { addDeviceReqs } from "ui/types";
const api = createApiClient({ device: "web" })

export async function POST(req: NextRequest) {
	const body: addDeviceReqs = await req.json()
	const { userId, deviceName } = body

	try {
		await api.fetchJSON({ endpoint: "/api/devices/addDeviceMap", method: "POST", body: { userId, deviceName: deviceName } })

		return NextResponse.json({ ok: true, message: `Device of: ${deviceName} was mapped to User: ${userId}` })
	} catch (err) {
		return NextResponse.json({ ok: false, message: toErrorMessage(err) })
	}
}
