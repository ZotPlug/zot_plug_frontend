
import { KeyboardAvoidingView, Text, View } from "react-native"
import { login_user, signup_user } from "@/api_utils/api_actions"
import { signUpInfo, basicCreds } from "@/api_utils/types"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import LoginComp from 'ui/login/comp'
import SignUpComp from 'ui/signup/comp'

export default function LoginPage() {
  const { mode } = useLocalSearchParams<{ mode: string }>()
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

  return (
    <KeyboardAvoidingView behavior="padding" enabled className="justify-center items-center min-h-screen">
      {mode === 'login' ? (
        <>
          <LoginComp onSubmit={try_login} errorText={error} setErrorText={setError} />
          <Link className="pt-2" href={{ pathname: "/auth", params: { mode: "signup" } }}>Sign Up</Link>
        </>

      ) : (
        <>
          <SignUpComp onSubmit={try_signup} errorText={error} setErrorText={setError} />
          <Link className="pt-2" href={{ pathname: "/auth", params: { mode: "login" } }}>Log In</Link>
        </>
      )}
    </KeyboardAvoidingView>
  )
}
