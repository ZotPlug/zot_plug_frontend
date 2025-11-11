import createApiClient from "api/req"
import { RestMethod, ReqBody, ReqHeaders } from "./types"
import Constants from "expo-constants"
import * as SecureStore from "expo-secure-store"

export const api = createApiClient({ device: "mobile", baseUrlOverride: Constants.expoConfig?.extra?.API_URL })

export function toErrorMessage(err: unknown): string {
	if (err instanceof Error) return err.message;
	if (typeof err === "string") return err;
	try { return JSON.stringify(err); } catch { return "Unknown error"; }
}

export async function api_withMiddleWare<T>(params: { method: RestMethod, endpoint: string, body?: ReqBody }) {
	try {
		const mobileJwt = await SecureStore.getItemAsync("access_token")
		const headers: ReqHeaders = {}

		if (mobileJwt) headers["Authorization"] = `Bearer ${mobileJwt}`
		else throw new Error("No Token on Device")

		return await api.fetchJSON<T>({ method: params.method, endpoint: params.endpoint, headers, body: params.body })
	} catch (err) {
		//console.error("Fetch W/ MW error:", err);
		throw err
	}
}



