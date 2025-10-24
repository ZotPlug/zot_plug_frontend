import { useState } from 'react'
import { SignUpCompParams } from '../types'
import { TextInput, View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import basic_filter_check from './helpers'
import BasicButton from '../components/basic_button'

export default function SignUpComp({ onSubmit, errorText, setErrorText }: SignUpCompParams) {
	const [userInfo, SetUserInfo] = useState({ firstname: "", lastname: "", username: "", email: "", password: "", confirm: "" })
	const { width, height } = useWindowDimensions()
	const isMobile = width >= 350

    // Submit on enter
    const submitOnEnter = (event: Event) => {
        if (event.key === "Enter" || event.key === "NumpadEnter") {
            event.preventDefault();
            onSubmit({
				firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, email: userInfo.email, password: userInfo.password
			})
        }
    }

	return (
		<View style={styles.container}>
			<TextInput
				value={userInfo.username}
				onChangeText={(username) => SetUserInfo((prev) => ({ ...prev, username }))}
                onKeyPress={submitOnEnter}
				placeholder="User name"
				editable={true}
				style={styles.textInput}
			/>
			<View style={styles.row}>
				<TextInput
					value={userInfo.firstname}
					onChangeText={(firstname) => SetUserInfo((prev) => ({ ...prev, firstname }))}
                    onKeyPress={submitOnEnter}
					placeholder="First name"
					editable={true}
					style={[styles.textInput, { marginRight: 2 }]}
				/>
				<TextInput
					value={userInfo.lastname}
					onChangeText={(lastname) => SetUserInfo((prev) => ({ ...prev, lastname }))}
                    onKeyPress={submitOnEnter}
					placeholder="Last name"
					editable={true}
					style={[styles.textInput, { marginLeft: 2 }]}
				/>
			</View>
			<TextInput
				value={userInfo.email}
				onChangeText={(email) => SetUserInfo((prev) => ({ ...prev, email }))}
                onKeyPress={submitOnEnter}
				placeholder="Email"
				editable={true}
				style={styles.textInput}
			/>
			<TextInput
				value={userInfo.password}
				onChangeText={(password) => SetUserInfo((prev) => ({ ...prev, password }))}
                onKeyPress={submitOnEnter}
				placeholder="Password"
				editable={true}
				style={styles.textInput}
			/>
			<TextInput
				value={userInfo.confirm}
				onChangeText={(confirm) => SetUserInfo((prev) => ({ ...prev, confirm }))}
                onKeyPress={submitOnEnter}
				placeholder="Confirm Password"
				editable={true}
				style={styles.textInput}
			/>

			{errorText ? <Text style={styles.text}>{errorText}</Text> : null}
			<BasicButton text="sign-up" onPress={() => basic_filter_check(onSubmit, setErrorText, {
				firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, email: userInfo.email, password: userInfo.password
			}, userInfo.confirm)} style={styles.button} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
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
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textInput: {
		padding: 16,
		backgroundColor: 'white',
		color: 'black',
		borderRadius: 8,
		width: '100%',
		marginVertical: 8,
	},
	button: {
		borderRadius: 8,
		width: '100%',
		marginVertical: 8,
	},
})
