export type { signUpInfo } from "ui/types"
export type { Device, RestMethod, ReqHeaders, ReqBody } from "api/req"
export type Result<T> = { ok: true; value: T } | { ok: false, error: string }
export type basicCreds = { email: string, password: string }
export type addDeviceReqs = { userId: string, deviceName: string }
export interface CheckUserbasicCredsRes { valid: boolean, userId: string, mobileJwt: string }



