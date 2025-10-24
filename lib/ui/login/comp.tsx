import { useState, useEffect } from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import { basicCreds, LoginCompParams } from '../types'
import BasicButton from '../components/basic_button'

function basic_filter_check(onSubmit: (params: basicCreds) => void, setBasicErr: React.Dispatch<React.SetStateAction<string | null>>, email: string, pass: string) {
	if (email.length === 0) setBasicErr("Email is empty")
	else if (pass.length === 0) setBasicErr("Password is empty")
	else onSubmit({ email, password: pass })
}

function submitOnEnter(event: Event, onSubmit: (params: basicCreds) => void, params: basicCreds) {
    if (event.key === "Enter" || event.key === "NumpadEnter") {
        event.preventDefault();
        onSubmit(params)
    }
}

export default function LoginComp({ onSubmit, errorText, setErrorText }: LoginCompParams) {
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")

	return (
		<View style={styles.container}>
			<TextInput
				value={email}
				onChangeText={setEmail}
                onKeyPress={(e: Event) => submitOnEnter(e, onSubmit, {email: email, password: pass})}
				placeholder="Email"
				editable={true}
				style={styles.textInput}
			/>
			<TextInput
				value={pass}
				onChangeText={setPass}
                onKeyPress={(e: Event) => submitOnEnter(e, onSubmit, {email: email, password: pass})}
				placeholder="Password"
				editable={true}
				style={styles.textInput}
			/>
			{errorText ? <Text style={styles.text}>{errorText}</Text> : null}
			<BasicButton text="login" onPress={() => basic_filter_check(onSubmit, setErrorText, email, pass,)} style={styles.button} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		backgroundColor: undefined,
		borderRadius: 8,
		width: '100%',
		maxWidth: 400,
		alignSelf: 'center',
	},
	text: {
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 24,
		color: "red",
	},
	textInput: {
		padding: 16,
		backgroundColor: 'white',
		color: 'black',
		borderRadius: 8,
		width: '100%',
		marginBottom: 16
	},
	button: {
		paddingHorizontal: 16,
		borderRadius: 8,
		width: '100%',
	},
});
