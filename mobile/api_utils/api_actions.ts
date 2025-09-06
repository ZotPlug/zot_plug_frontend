import * as SecureStore from "expo-secure-store";
import { basicCreds, CheckUserbasicCredsRes, Result, signUpInfo } from "./types"
import { toErrorMessage, api, api_withMiddleWare } from "./helper"

export async function login_user(params: basicCreds): Promise<Result<{ userId: string }>> {
	try {
		const { valid, userId, mobileJwt } = await api.fetchJSON<CheckUserbasicCredsRes>({ endpoint: "/api/users/checkUserCreds", method: "POST", body: { email: params.email, password: params.password } })

		await SecureStore.setItemAsync("access_token", mobileJwt);
		const token = await SecureStore.getItemAsync("access_token");

		console.log(`Token: ${token}`)

		if (!valid) throw new Error("Invalid Credentials")
		return { ok: true, value: { userId } }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function signup_user(params: signUpInfo): Promise<Result<{ userId: string }>> {
	try {
		const { userId, mobileJwt } = await api.fetchJSON<{ userId: string, mobileJwt: string }>({ method: "POST", endpoint: "/api/users/addUser", body: { firstname: params.firstname, lastname: params.lastname, username: params.username, email: params.email, password: params.password } })

		await SecureStore.setItemAsync("access_token", mobileJwt);

		if (userId) { return { ok: true, value: { userId } } }
		else { throw new Error("Account Creation Failed") }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

export async function validate_jwt(): Promise<Result<boolean>> {
	try {
		const res = await api_withMiddleWare<any>({ method: "GET", endpoint: "/api/users/checkUserJwt" })

		console.log("Res back from API")
		console.log(res)

		if (res) { return { ok: true, value: true } }
		else { throw new Error("Account Creation Failed") }

	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}

// Mainly a test endpoint
export async function getAllDevices(): Promise<Result<{ userId: string }>> {
	try {
		const res = await api_withMiddleWare<any>({ method: "GET", endpoint: "/api/devices" })
		if (res) { return { ok: true, value: { ...res } } }
		else { throw new Error("Account Creation Failed") }
	} catch (err) {
		return { ok: false, error: toErrorMessage(err) }
	}
}
/*
// save
await SecureStore.setItemAsync("access_token", token);

// get
const token = await SecureStore.getItemAsync("access_token");

// delete
await SecureStore.deleteItemAsync("access_token");
*/
