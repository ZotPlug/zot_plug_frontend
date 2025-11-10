import { NextRequest, NextResponse } from "next/server";
import { toErrorMessage } from "@/app/api_utils/helper";
import createApiClient from "api/req";
import { AddDeviceRes } from "@/app/api_utils/types";
const api = createApiClient({ device: "web" })
// change the res type of the req

export async function POST(req: NextRequest) {
	const body: { userId: string } = await req.json()
	try {
		const res = await api.fetchJSON<AddDeviceRes>({ endpoint: `/api/devices/getAllDevicesByUserId/${body.userId}`, method: "GET" })

		return NextResponse.json({ ok: true, value: res })
	} catch (err) {
		return NextResponse.json({ ok: false, message: toErrorMessage(err) })
	}
}
