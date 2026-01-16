import { NextRequest, NextResponse } from "next/server";
import { toErrorMessage } from "@/app/api_utils/helper";
import createApiClient from "api/req";
const api = createApiClient({ device: "web" })
// change the res type of the req

export async function POST(req: NextRequest) {
	const { deviceId, deviceName } = await req.json()

	if (!deviceId && !deviceName) {
		return NextResponse.json({ ok: false, message: "Missing deviceId or deviceName" })
	}

	const query = deviceId ? `deviceId=${deviceId}` : `deviceName=${deviceName}`

	try {
		const res = await api.fetchJSON({ endpoint: `/api/devices/getLatestReadings?${query}`, method: "GET" })
		return NextResponse.json({ ok: true, value: res })
	} catch (err) {
		return NextResponse.json({ ok: false, message: toErrorMessage(err) })
	}
}