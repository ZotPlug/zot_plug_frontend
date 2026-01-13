import { login_user, signup_user } from '../api_utils/api_actions'
import { useRouter } from 'next/navigation'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet } from 'react-native'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { signUpInfo, basicCreds } from '@/app/api_utils/types';
import LoginComp from 'ui/login/comp'
import SignUpComp from 'ui/signup/comp'

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
  const headerIconPath = '/images/plug_icon.svg'

  return (
    <LinearGradient start={{x: 0, y: 0}} 
        end={{x: 1, y: 1}} 
        colors={['#EAF6FF', '#DDE2FA']}>

        <div className="flex flex-col justify-center items-center h-screen"
            style={styles.container}>

        {mode === 'login' ? (
            <>
            <LoginComp onSubmit={try_login} errorText={error} setErrorText={setError} />
            <a href="/auth?mode=signup"><h5 className="text-blue-500">sign up</h5></a>
            </>
        ) : (
            <>
            <SignUpComp onSubmit={try_signup} errorText={error} setErrorText={setError} backIconPath={backIconPath} headerIconPath={headerIconPath} />
            <a href="/auth?mode=login"><h5 className="text-blue-500">login</h5></a>
            </>
        )}
        </div>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
	container: {
        marginTop: 55,
		padding: 16,
		width: '100%',
		alignSelf: 'center',
        alignItems: 'center',
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
