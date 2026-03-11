export type { signUpInfo, basicCreds } from 'ui/types'
export type Result<T> = { ok: true; value: T } | { ok: false, error: string }
export interface SessionRes { sessionId: string, minutesAlive: number }
export interface CheckUserbasicCredsRes { valid: boolean, userId: string }
export interface UsageOverview { daily: number, weekly: number, monthly: number }
export interface RawUsagePoint { timestamp: string, value: number }
export interface RawDevicePoint { device_id: number, device_name: string, total_energy: number }