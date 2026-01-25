import { NextRequest, NextResponse } from "next/server";
import { toErrorMessage } from "@/app/api_utils/helper";
import createApiClient from "api/req";
const api = createApiClient({ device: "web" })
// change the res type of the req

export async function POST(req: NextRequest) {
	const body: { deviceId: string } = await req.json()
	if (!body.deviceId) {
		return NextResponse.json({ ok: false, message: "deviceId is required" })
	}

	try {
		const res = await api.fetchJSON({ endpoint: `/api/devices/getDeviceById?deviceId=${body.deviceId}`, method: "GET" })

		return NextResponse.json({ ok: true, value: res })
	} catch (err) {
		return NextResponse.json({ ok: false, message: toErrorMessage(err) })
	}
}