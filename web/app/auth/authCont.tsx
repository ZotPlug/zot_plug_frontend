import { login_user, signup_user } from '../api_utils/api_actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { signUpInfo } from 'ui/types';
import LoginComp from 'ui/login/comp'
import SignUpComp from 'ui/signup/comp'

export default function AuthContent() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'login'
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  async function try_login(email: string, pass: string) {
    const res = await login_user(email, pass)
    if (res.ok) router.push(`/dashboard/${res.value.userId}`)
    else setError(res.error)
  }

  async function try_signup(params: signUpInfo) {
    const res = await signup_user(params)
    if (res.ok) router.push(`/dashboard/${res.value.userId}`)
    else setError(res.error)
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {mode === 'login' ? (
        <>
          <LoginComp onSubmit={try_login} errorText={error} setErrorText={setError} />
          <a href="/auth?mode=signup"><h5 className="text-blue-500">sign up</h5></a>
          {/* Prefer: <Link href="/auth?mode=signup" className="text-blue-500">sign up</Link> */}
        </>
      ) : (
        <>
          <SignUpComp onSubmit={try_signup} errorText={error} setErrorText={setError} />
          <a href="/auth?mode=login"><h5 className="text-blue-500">login</h5></a>
          {/* Prefer: <Link href="/auth?mode=login" className="text-blue-500">login</Link> */}
        </>
      )}
    </div>
  )
}
