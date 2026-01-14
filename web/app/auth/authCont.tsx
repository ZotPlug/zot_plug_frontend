import { login_user, signup_user } from '../api_utils/api_actions'
import { useRouter } from 'next/navigation'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet } from 'react-native'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { signUpInfo, basicCreds } from '@/app/api_utils/types';
import LoginComp from 'ui/login/comp'
import SignUpComp from 'ui/signup/comp'
import { imagePaths } from '../imagePaths'
import { Colors } from 'ui/colors'

export default function AuthContent() {

  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'login'
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  async function try_login(params: basicCreds) {
    const res = await login_user({ email: params.email, password: params.password })
    if (res.ok) router.push(`/dashboard/${res.value.userId}`)
    else setError(res.error)
  }

  async function try_signup(params: signUpInfo) {
    const res = await signup_user(params)
    if (res.ok) router.push(`/dashboard/${res.value.userId}`)
    else setError(res.error)
  }

  const backIconPath = '/images/back.svg'
  const backIconHoverPath = '/images/back_hover.svg'
  const headerIconPath = '/images/plug_icon.svg'

  return (
    <LinearGradient start={{x: 0, y: 0}} 
        end={{x: 1, y: 1}} 
        colors={[Colors.BGrad1, Colors.BGrad2]}
        style={styles.gradient}>

        <div className="flex flex-col justify-center items-center h-screen"
            style={styles.container}>

        {mode === 'login' ? (
            <>
            <LoginComp 
                onSubmit={try_login} 
                onBack={() => router.back()}
                errorText={error} 
                setErrorText={setError} 
                imagePaths={imagePaths}/>
            </>
        ) : (
            <>
            <SignUpComp 
                onSubmit={try_signup} 
                onBack={() => router.back()}
                errorText={error} 
                setErrorText={setError} 
                imagePaths={imagePaths} />
            </>
        )}
        </div>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
	gradient: {
        height: '100dvh',
	},
	container: {
        marginTop: 55,
		padding: 16,
		width: '100%',
		alignSelf: 'center',
        alignItems: 'center',
        flex: 1
	},
	text: {
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 24,
		color: "red",
	},
	col: {
		flexDirection: 'column', // row doesn't work on mobile, needs to be col
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
