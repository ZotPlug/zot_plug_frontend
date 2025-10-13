export type { signUpInfo, basicCreds } from 'ui/types'
export type Result<T> = { ok: true; value: T } | { ok: false, error: string }
export interface DeviceControlRes { ok?: string, error?: string }
export interface SessionRes { sessionId: string, minutesAlive: number }
export interface CheckUserbasicCredsRes { valid: boolean, userId: string }

