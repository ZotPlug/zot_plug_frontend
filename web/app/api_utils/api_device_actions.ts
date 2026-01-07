import { toErrorMessage } from "./helper";
import { DeviceReadingData, getDeviceByIdRes } from "ui/types";
type Result<T> = { ok: true; value: T } | { ok: false, error: string }

export async function apiGetDeviceInfo(deviceId: number): Promise<Result<getDeviceByIdRes>> {
	try {
		const res = await fetch('/api/frontendDevices/getDeviceById', {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				deviceId: deviceId
			})
		}).then(e => e.json())
		if (!res.ok) throw new Error(res.message)
		return { ok: true, value: res.value }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function apiGetLatestDeviceReading(deviceName: string): Promise<Result<DeviceReadingData>> {
	try {
		const res = await fetch('/api/frontendDevices/getLatestReading', {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				deviceName: deviceName
			})
		}).then(e => e.json())
		if (!res.ok) throw new Error(res.message)
		return { ok: true, value: res.value }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}
