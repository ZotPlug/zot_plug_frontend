import { useRouter } from 'expo-router'
import Welcome from 'ui/landingPage/welcome'
import { imagePaths } from './imagePaths'

export default function Home() {
  const router = useRouter()

  
  return (
    <Welcome 
        onLogin={() => router.push('/auth?mode=login')}
        onSignUp={() => router.push('/auth?mode=signup')}
        imagePaths={imagePaths}/>
  )
}
