import { View, Text } from "react-native"
import { useEffect } from "react"
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getAllDevices, validate_jwt } from "@/api_utils/api_actions"
import BasicButton from 'ui/components/basic_button'

export default function Dashboard() {
  const { userId } = useLocalSearchParams();
  const router = useRouter()

  const { data: validated, isLoading: isValidating } = useQuery({
    queryKey: ['validated'],
    queryFn: async () => await validate_jwt()
  })

  async function test_token() {
    const res = await getAllDevices()
    console.log(res)
  }

  async function test_val() {
    const res = await validate_jwt()
    console.log(res)
  }
  
  async function openPlugs() {
    router.push(`/dashboard/${userId}/plugs`)
  }

  async function openPowerUsage() {
    router.push(`/dashboard/${userId}/power_usage`)
  }

  async function openRewards() {
    router.push(`/dashboard/${userId}/rewards`)
  }
  
  async function openFriends() {
    router.push(`/dashboard/${userId}/friends`)
  }
  
  async function openSettings() {
    router.push(`/dashboard/${userId}/settings`)
  }

  useEffect(() => {
    if (!isValidating) {
      if (!validated!.ok) router.push("/auth?mode=login")
    }
  }, [validated, isValidating, router])

  return (
    <View>
      <Text> {`Elllo Ello, Unique Dash of user ${userId} `}</Text>
      <BasicButton onPress={test_token} text={"Get All Devices"} />
      <BasicButton onPress={test_val} text={"Validate Token"} />

      <Text>Pages</Text>
      <BasicButton onPress={openPlugs} text={"Plugs"} />
      <BasicButton onPress={openPowerUsage} text={"Power Usage"} />
      <BasicButton onPress={openRewards} text={"Rewards"} />
      <BasicButton onPress={openFriends} text={"Friends"} />
      <BasicButton onPress={openSettings} text={"Settings"} />
    </View>
  )
}
