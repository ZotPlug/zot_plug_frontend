import { Result } from "./types"
import { toErrorMessage, api_withMiddleWare } from "./helper"
import { UserDeviceInfo } from "ui";
import { DeviceReadingData } from "ui";

export async function apiGetDeviceById(deviceId: number): Promise<Result<UserDeviceInfo>> {
	try {
		const res = await api_withMiddleWare<UserDeviceInfo>({ endpoint: `/api/devices/getDeviceById/${deviceId}`, method: "GET" })
		return { ok: true, value: res }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function apiGetLatestDeviceReading(deviceName: string): Promise<Result<DeviceReadingData>> {
	try {
		const res = await api_withMiddleWare<DeviceReadingData>({ endpoint: `/api/devices/getLatestReading/${deviceName}`, method: "GET" })
		return { ok: true, value: res }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}