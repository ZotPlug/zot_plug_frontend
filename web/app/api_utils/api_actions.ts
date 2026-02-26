// web/app/api_utils/api_actions.ts
import { toErrorMessage } from "./helper";
import { signUpInfo, basicCreds, RawUsagePoint, RawDevicePoint } from "./types";
import { addDeviceReqs, DeviceControlReqs, UserDeviceInfo } from "ui/types";
type Result<T> = { ok: true; value: T } | { ok: false, error: string }


export async function fetch_test() {
	try {
		const res = await fetch("/api/test", {
			method: "GET",
		});
		const data = await res.text()

		if (data) {
			return JSON.parse(data)
		} else {
			throw new Error("rest_api from zot_plug_infra did not respond ")
		}
	} catch (err) {
		console.error("Error fetching data:", err)
		return { err }
	}
}

export async function login_user(params: basicCreds): Promise<Result<{ userId: string }>> {
	try {
		const login_res = await fetch('/api/login', {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: params.email,
				password: params.password
			})
		}).then(e => e.json())
		if (!login_res.ok) throw new Error(login_res.message)
		return { ok: true, value: { userId: login_res.userId } }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function signup_user(params: signUpInfo): Promise<Result<{ userId: string }>> {
	try {
		const signup_res = await fetch('/api/signup', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				firstname: params.firstname,
				lastname: params.lastname,
				username: params.username,
				email: params.email,
				password: params.password
			})
		}).then(e => e.json())

		if (!signup_res.ok) throw new Error(signup_res.message)
		return { ok: true, value: { userId: signup_res.userId } }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function add_device(params: addDeviceReqs): Promise<Result<string>> {
	try {
		const addDeviceRes = await fetch('/api/addDevice', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				deviceName: params.deviceName,
				userId: params.userId,
			})
		}).then(e => e.json())
		if (!addDeviceRes.ok) throw new Error(addDeviceRes.message)
		return { ok: true, value: addDeviceRes.message }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function get_all_devices_by_userId(params: { userId: string }): Promise<Result<UserDeviceInfo[]>> {
	try {
		const res = await fetch('/api/getAllDevices', {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				userId: params.userId
			})
		}).then(e => e.json())
		if (!res.ok) throw new Error(res.message)
		return { ok: true, value: res.value }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function device_control(params: DeviceControlReqs) {
	try {
		const deviceControlRes = await fetch('/api/deviceControl', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				topic: params.topic
			})
		}).then(e => e.json())
		if (!deviceControlRes.ok) throw new Error(deviceControlRes.message)
		return { ok: true, value: deviceControlRes.message }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function fetch_user_by_id(params: { userId: string }): Promise<Result<{ firstname: string, lastname: string, userId: string }>> {
	try {
		const res = await fetch('/api/getUserById', {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ userId: params.userId})
		}).then(e => e.json())
		if (!res.ok) throw new Error(res.message)
		return { ok: true, value: res.value }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}




export async function get_usage_stats_graph(params: {
	userId: string
	range: '24h' | '7d' | '30d'
	deviceId?: number
}): Promise<Result<RawUsagePoint[]>> {
	try {
		const res = await fetch('/api/graphs/getUsageSeries', {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ 
				userId: params.userId,
				range: params.range,
				deviceId: params.deviceId
			})
		}).then(e => e.json())
		if (!res.ok) throw new Error(res.message)
		return { ok: true, value: res.value }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function get_most_used_devices_graph(params: {
	userId: string
	range: '24h' | '7d' | '30d'
}): Promise<Result<RawDevicePoint[]>> {
	try {
		const res = await fetch('/api/graphs/getMostUsedDevices', {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ 
				userId: params.userId,
				range: params.range
			})
		}).then(e => e.json())
		if (!res.ok) throw new Error(res.message)
		return { ok: true, value: res.value }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}