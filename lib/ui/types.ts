export type signUpInfo = {
	firstname: string,
	lastname: string,
	username: string,
	email: string,
	password: string,
}

export type DeviceControlReqs = {
	topic: string,
	payload: object,
	qos: number,
	retain: boolean
}

export type basicCreds = { email: string, password: string }

export type LoginCompParams = {
	onSubmit: (params: basicCreds) => void
	errorText: string | null
	setErrorText: React.Dispatch<React.SetStateAction<string | null>>
}

export type DeviceControlProps = {
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