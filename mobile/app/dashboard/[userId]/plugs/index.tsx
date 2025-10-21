import { Text, View, StyleSheet } from "react-native"
import { login_user, signup_user } from "@/api_utils/api_actions"
import { signUpInfo, basicCreds } from "@/api_utils/types"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import LoginComp from 'ui/login/comp'
import SignUpComp from 'ui/signup/comp'
import SharedH1 from 'ui/components/h1/comp'

export default function PowerUsagePage() {
  const { mode } = useLocalSearchParams<{ mode: string }>()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  return (
    <View style={styles.container} className="justify-center items-center h-screen">
      <SharedH1 text='Plugs'/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {},
 })