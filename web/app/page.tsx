'use client'
import { useRouter } from 'next/navigation'
import Welcome from 'ui/landingPage/welcome'

export default function Home() {
    const router = useRouter()

    return (
        <Welcome 
            onLogin={() => router.push('/auth?mode=login')}
            onSignUp={() => router.push('/auth?mode=signup')}
            logoPath='/images/landing_page_logo.svg'/>
  )
}
