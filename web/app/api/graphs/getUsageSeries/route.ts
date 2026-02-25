import { NextRequest, NextResponse } from "next/server";
import { toErrorMessage } from "@/app/api_utils/helper";
import createApiClient from "api/req";
const api = createApiClient({ device: "web" })
// change the res type of the req

export async function POST(req: NextRequest) {
    const body: { userId?: string; range?: string; deviceId?: string } = await req.json()
    const { userId, range, deviceId } = body

    if (!userId || !range) {
        return NextResponse.json({ ok: false, message: "Missing userId or range" })
    }    
    if (!['24h', '7d', '30d'].includes(range)) {
        return NextResponse.json({ ok: false, message: "Invalid range value" })
    }

    try {
        const res = await api.fetchJSON({ endpoint: `/api/devices/getUsageSeries?userId=${userId}&range=${range}${deviceId ? `&deviceId=${deviceId}` : ""}`, method: "GET" })
        return NextResponse.json({ ok: true, value: res })
    } catch (err) {
        return NextResponse.json({ ok: false, message: toErrorMessage(err) })
    }
}