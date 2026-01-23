import { signUpInfo } from '../types'
export function isUpper(char: string): boolean { return /^[A-Z]$/.test(char) }
export function isNumber(char: string): boolean { return /^[0-9]$/.test(char) }
export function isSpecial(char: string): boolean { return /^[^a-zA-Z0-9]$/.test(char) }
export function isValidEmail(email: string): boolean { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) }

export const temp_allow_email = ["kyle@example.xyz", "chris@example.xyz", "prabhav@example.xyz", "justin@example.xyz", "jay@example.xyz"]

function check_len(params: signUpInfo): string | null {
	for (const key of Object.keys(params) as Array<keyof typeof params>) {
		if (params[key].length === 0) {
			let error_str = ``
			if (key === "firstname" || key === "lastname") { error_str = key.slice(0, 5) + ` ` + key.slice(5) + ` ` + `is empty` }
			else { error_str = `${key} is empty` }
			return error_str.charAt(0).toUpperCase() + error_str.slice(1)
		} else if (key === "username" && params[key].length > 32) {
			return "Username is to long. Must be < 32"
		} else if (key === "password" && params[key].length > 128) {
			return "Password is to long, must be < 128"
		} else if (key === "password" && params[key].length < 8) {
			return "Password must be at least 8 characters long"
		}
	}
	return null
}

function check_password_req(params: signUpInfo, confirmPass: string): string | null {
	const pass = params.password
	const req_count = { uppercase: 0, lowercase: 0, number: 0, special: 0 }
	for (const char of pass) {
		if (isUpper(char)) req_count.uppercase++
		else if (isNumber(char)) req_count.number++
		else if (isSpecial(char)) req_count.special++
		else req_count.lowercase++
	}

	for (const key of Object.keys(req_count) as Array<keyof typeof req_count>) {
		if (req_count[key] === 0) return `Password missing at least one ${key} character`
	}
	if (confirmPass !== pass) return `Password confirmation does not match`
	return null
}

export default function basic_filter_check(onSubmit: (params: signUpInfo) => void, setBasicErr: React.Dispatch<React.SetStateAction<string | null>>, params: signUpInfo, confirmPass: string): void {
	// Temp email check block
	if (!temp_allow_email.includes(params.email.toLowerCase())) {
		setBasicErr("Invalid email provided.")
		return
	}

	const len_res = check_len(params)
	if (len_res) {
		setBasicErr(len_res)
		return
	}
	const pass_req_res = check_password_req(params, confirmPass)
	if (pass_req_res) {
		setBasicErr(pass_req_res)
		return
	} if (!isValidEmail(params.email)) {
		setBasicErr("Invalid Email")
		return
	}
	setBasicErr(null)

	onSubmit({ firstname: params.firstname, lastname: params.lastname, username: params.username, email: params.email, password: params.password })
}
