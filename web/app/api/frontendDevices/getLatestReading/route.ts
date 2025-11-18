import { NextRequest, NextResponse } from "next/server";
import { toErrorMessage } from "@/app/api_utils/helper";
import createApiClient from "api/req";
const api = createApiClient({ device: "web" })
// change the res type of the req

export async function POST(req: NextRequest) {
	const body: { deviceName: string } = await req.json()
	try {
		const res = await api.fetchJSON({ endpoint: `/api/devices/getLatestReading/${body.deviceName}`, method: "GET" })
		return NextResponse.json({ ok: true, value: res })
	} catch (err) {
		return NextResponse.json({ ok: false, message: toErrorMessage(err) })
	}
}