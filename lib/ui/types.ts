export type AddDeviceCompParams = {
	onSubmit: (params: { deviceName: string }) => void
	modalMessage: { ok: boolean, message: string } | null
	SetModalMesage: React.Dispatch<React.SetStateAction<{ ok: boolean, message: string } | null>>
}

export type signUpInfo = {
	firstname: string,
	lastname: string,
	username: string,
	email: string,
	password: string,
}

export type addDeviceReqs = {
	userId: number,
	deviceName: string
}

export type DeviceControlReqs = {
	topic: string,
	payload: object,
	qos: number,
	retain: boolean
}

export interface DeviceControlRes { ok?: string, error?: string }

export type basicCreds = { email: string, password: string }

export type LoginCompParams = {
	onSubmit: (params: basicCreds) => void
	errorText: string | null
	setErrorText: React.Dispatch<React.SetStateAction<string | null>>
}

export type DeviceControlProps = {
	deviceName: string,
	deviceEndpointFn: (params: DeviceControlReqs) => Promise<void>,
}

export type SignUpCompParams = {
	onSubmit: (params: signUpInfo) => Promise<void>
	errorText: string | null
	setErrorText: React.Dispatch<React.SetStateAction<string | null>>
}

export type progressBarProps = {
	currProgress: number,
	maxProgress: number,
	height: number,
}

export type dailyTargetProps = {
	currProgress: number,
	maxProgress: number,
}

export type devicePreviewProps = {
	deviceImage: string | null,
	deviceName: string,
	deviceId: number,
	currUsage: number,
	totalUsage: number,
	redirectOnClick: Function
}

export type deviceReadingsProps = {
	voltage: number,
	current: number
}

export type CategorySize = 'big' | 'small'

export type CategoryProps = {
	displayText: string,
	imageFilePath: string | null,
	size: CategorySize,
	onPress: () => void,
	accessibilityLabel: string,
	testID: string,
	style: any,
}

export interface UserDeviceInfo {
	accepted_at: string;
	device_id: number;
	device_name: string;
	device_status: string;        // "offline" | "online" | etc.
	last_seen: string | null;     // nullable timestamp
	role_id: number;
	role_name: string;            // "owner", "member", etc.
	user_device_status: string;   // "active", "pending", etc.
}

export interface DeviceReadingData {
	id: number;
	device_id: number;
	voltage: number;
	current: number;
	power: number;
	cumulative_energy: number;
	recored_at: string;
}

export type getDeviceByIdRes = {
	id: number,
	name: string,
	status: string
}

export enum DeviceType {
    Mobile,
    Tablet,
    Desktop
}
