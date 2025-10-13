import { toErrorMessage } from "./helper";
import { signUpInfo, basicCreds } from "./types";
import { DeviceControlReqs } from "ui/types";
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

export async function deviceControl(params: DeviceControlReqs) {
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




