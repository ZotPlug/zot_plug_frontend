import { useState, useEffect } from 'react'
import { ActivityIndicator, TextInput, View, Text, StyleSheet } from 'react-native'
import { basicCreds, DeviceType, LoginCompParams } from '../types'
import { useResponsiveLayout } from '../window_utils'
import Header1 from '../headers/header1'
import { Colors } from '../colors'
import Button_1 from '../buttons/button_1'

function basic_filter_check(onSubmit: (params: basicCreds) => void, setBasicErr: React.Dispatch<React.SetStateAction<string | null>>, email: string, pass: string): boolean {
	if (email.length === 0) { 
        setBasicErr("Email is empty")
        return false
    }
	else if (pass.length === 0) {
        setBasicErr("Password is empty")
        return false
    }
	else {
        onSubmit({ email, password: pass })
        return true
    }
}

function submitOnEnter(event: Event, onSubmit: (params: basicCreds) => void, setErrorText: string, email: string, password: string): boolean {
	if (event.key === "Enter" || event.key === "NumpadEnter") {
		event.preventDefault();
        return basic_filter_check(onSubmit, setErrorText, email, password,)
	}
    return false
}

export default function LoginComp({ onSubmit, onBack, errorText, setErrorText, imagePaths }: LoginCompParams) {
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")

    const [isLoading, setIsLoading] = useState(false)

	return (
		<View style={styles.container}>
            <Header1
                title={"Login"}
                headerIcon={imagePaths["header_plug"]}
                onBack={onBack}
                imagePaths={imagePaths}
            />
            <View style={styles.form}>
                <Text style={styles.entryFieldHeader}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    onKeyPress={(e: Event) => setIsLoading(submitOnEnter(e, onSubmit, setErrorText, email, pass ))}
                    placeholder="Type here"
                    editable={true}
                    style={styles.textInput}
                />
                <Text style={styles.entryFieldHeader}>Password</Text>
                <TextInput
                    value={pass}
                    secureTextEntry={true}
                    onChangeText={setPass}
                    onKeyPress={(e: Event) => setIsLoading(submitOnEnter(e, onSubmit, setErrorText, email, pass ))}
                    placeholder="Type here"
                    editable={true}
                    style={styles.textInput}
                />
            </View>

            {isLoading ?
                <ActivityIndicator 
                    size="large" 
                    style={styles.loadingSpinner}
                    color={Colors.P1} />
                :
                <View/>
            }

			{errorText ? <Text style={styles.text}>{errorText}</Text> : null}

            <Button_1 text="Login" onPress={() => setIsLoading(basic_filter_check(onSubmit, setErrorText, email, pass,))}/>
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
        alignSelf: 'center'
    },
	text: {
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 24,
		color: "red",
	},
    loadingSpinner: {
        marginBottom: 15
    },
    entryFieldHeader: {
        color: Colors.S1,
        fontWeight: 700,
        fontSize: 16,
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
	button: {
		paddingHorizontal: 16,
		borderRadius: 8,
		width: '100%',
	},
});
