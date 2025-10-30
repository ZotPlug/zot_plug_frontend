import { Text, View, StyleSheet } from "react-native"
import { login_user, signup_user } from "@/api_utils/api_actions"
import { signUpInfo, basicCreds } from "@/api_utils/types"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import LoginComp from 'ui/login/comp'
import SignUpComp from 'ui/signup/comp'
import SharedH1 from 'ui/components/shared_h1'
import DevicePreview from 'ui/device_preview/comp'

export default function PowerUsagePage() {
  const { mode } = useLocalSearchParams<{ mode: string }>()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  return (
    <View style={styles.container} className="justify-center items-center h-screen">
    <SharedH1 text='Plugs'/>
    <View>
        <DevicePreview deviceImage={require('../../../../assets/images/lightning.png')} deviceName="Plug 1" currUsage={10} totalUsage={30}/>
        <DevicePreview deviceImage="../../../../assets/images/fan.png" deviceName="Plug 2" currUsage={5} totalUsage={30}/>
        <DevicePreview deviceImage="" deviceName="Plug 3" currUsage={15} totalUsage={30}/>
    </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {},
 })