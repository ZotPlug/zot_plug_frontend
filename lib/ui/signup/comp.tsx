import { useState } from 'react'
import { DeviceType, SignUpCompParams, signUpInfo } from '../types'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import basic_filter_check from './helpers'
import Header1 from '../headers/header1'
import { Colors } from '../colors'
import Button_1 from '../buttons/button_1'
import { useResponsiveLayout } from '../window_utils'

function submitOnEnter(event: Event, onSubmit: (params: signUpInfo) => Promise<void>, setErrorText: string, params: signUpInfo) {
	if (event.key === "Enter" || event.key === "NumpadEnter") {
		event.preventDefault();
        basic_filter_check(onSubmit, setErrorText, params, params.password)
	}
}

export default function SignUpComp({ onSubmit, onBack, errorText, setErrorText, imagePaths }: SignUpCompParams) {
	const [userInfo, SetUserInfo] = useState({ firstname: "", lastname: "", username: "", email: "", password: "", confirm: "" })
    const layout: DeviceType = useResponsiveLayout()

	return (
		<View style={styles.container}>
            <Header1 
                title={"Sign Up"}
                headerIcon={imagePaths["header_plug"]}
                onBack={onBack}
                imagePaths={imagePaths}
            />
            <View style={styles.form}>
                <Text style={styles.entryFieldHeader}>Username</Text>
                <TextInput
                    value={userInfo.username}
                    onChangeText={(username) => SetUserInfo((prev) => ({ ...prev, username }))}
                    onKeyPress={(e: Event) => submitOnEnter(e, onSubmit, setErrorText,{ firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, email: userInfo.email, password: userInfo.password })}

                    placeholder="Type here"
                    editable={true}
                    style={styles.textInput}
                />
                <Text style={styles.entryFieldHeader}>Email</Text>
                <TextInput
                    value={userInfo.email}
                    onChangeText={(email) => SetUserInfo((prev) => ({ ...prev, email }))}
                    onKeyPress={(e: Event) => submitOnEnter(e, onSubmit, setErrorText,{ firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, email: userInfo.email, password: userInfo.password })}
                    placeholder="Type here"
                    editable={true}
                    style={styles.textInput}
                />
                <View style={layout === DeviceType.Mobile ? styles.col : styles.row}>
                    <View style={layout === DeviceType.Mobile ? styles.nameCol : styles.nameRow}>
                        <Text style={styles.entryFieldHeader}>First Name</Text>
                        <TextInput
                            value={userInfo.firstname}
                            onChangeText={(firstname) => SetUserInfo((prev) => ({ ...prev, firstname }))}
                            onKeyPress={(e: Event) => submitOnEnter(e, onSubmit, setErrorText,{ firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, email: userInfo.email, password: userInfo.password })}
                            placeholder="Type here"
                            editable={true}
                            style={[styles.textInput, { marginRight: 2 }]}
                        />
                    </View>
                    <View style={layout === DeviceType.Mobile ? styles.nameCol : styles.nameRow}>

                        <Text style={styles.entryFieldHeader}>Last Name</Text>
                        <TextInput
                            value={userInfo.lastname}
                            onChangeText={(lastname) => SetUserInfo((prev) => ({ ...prev, lastname }))}
                            onKeyPress={(e: Event) => submitOnEnter(e, onSubmit, setErrorText, { firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, email: userInfo.email, password: userInfo.password })}
                            placeholder="Type here"
                            editable={true}
                            style={[styles.textInput, { marginLeft: 2 }]}
                        />
                    </View>
                </View>
                <Text style={styles.entryFieldHeader}>Password</Text>
                <TextInput
                    value={userInfo.password}
                    secureTextEntry={true}
                    onChangeText={(password) => SetUserInfo((prev) => ({ ...prev, password }))}
                    onKeyPress={(e: Event) => submitOnEnter(e, onSubmit, setErrorText,{ firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, email: userInfo.email, password: userInfo.password })}
                    placeholder="Type Here"
                    editable={true}
                    style={styles.textInput}
                />
                <Text style={styles.entryFieldHeader}>Retype Password</Text>
                <TextInput
                    value={userInfo.confirm}
                    secureTextEntry={true}
                    onChangeText={(confirm) => SetUserInfo((prev) => ({ ...prev, confirm }))}
                    onKeyPress={(e: Event) => submitOnEnter(e, onSubmit, setErrorText,{ firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, email: userInfo.email, password: userInfo.password })}
                    placeholder="Type here"
                    editable={true}
                    style={styles.textInput}
                />
            </View>

			{errorText ? <Text style={styles.text}>{errorText}</Text> : null}
            <Button_1 text="Sign Up" onPress={() => basic_filter_check(onSubmit, setErrorText, {
				firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, email: userInfo.email, password: userInfo.password
			}, userInfo.confirm)}/>
        </View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 16,
		paddingRight: 16,
		width: '100%',
		maxWidth: 500,
		alignSelf: 'flex-start',
        flex: 1
	},
    form: {
        borderWidth: 3,
        borderColor: Colors.P1,
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: Colors.P4,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        margin: 15,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        alignSelf: 'center',
    },
	text: {
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 24,
		color: "red",
	},
    entryFieldHeader: {
        color: Colors.S1,
        fontWeight: 700,
        fontSize: 16,
    },
	col: {
        flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	row: {
        flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textInput: {
		padding: 12,
		backgroundColor: Colors.L1,
		color: Colors.S1,
		borderRadius: 8,
		width: '100%',
		marginVertical: 4,
        boxShadow: 'inset 0 4px 4px rgba(0, 0, 0, 0.25)',
        outlineStyle: 'none'
	},
    nameRow: {
        width: '48%',
    },
    nameCol: {
        width: '100%',
    }
})
