import { Text, View, StyleSheet } from "react-native"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import { useQuery } from '@tanstack/react-query'
import SharedH1 from 'ui/components/shared_h1'
import DevicePreview from 'ui/device_preview/comp'
import { get_all_devices_by_userId } from "@/api_utils/api_actions"


export default function PowerUsagePage() {
    const img_arr = ["../../../../assets/images/lightning.png", "", "../../../../assets/images/fan.png"]
    let img_i = 0
    const router = useRouter()
    const { userId } = useLocalSearchParams();
    const properUserId = Array.isArray(userId) ? userId[0] : userId // TS alerts that useLocalSearchParams, can be of type array

    const { data: plugs, isLoading } = useQuery({
        queryKey: ['plugs'],
        queryFn: async () => await get_all_devices_by_userId({ userId: properUserId })
    })


    // Nested function because router is only accessible from 
    // the top level hook function Plugs()
    //
    async function openDeviceStats(deviceName: string) {
        router.push(`/dashboard/${userId}/plugs/${deviceName}`)
    }

    // TODO:  Need to remove deviceId magic number redundancy

    return (
        <View style={styles.container} className="justify-center items-center h-screen">
            <SharedH1 text='Plugs' />
            {isLoading ? (
                <Text> Loading plug data... </Text>

            ) : plugs && plugs.ok ? (

                plugs.value.map(({ device_name, device_id }) => {
                    // These two lines mainly just for test
                    const currUsageTest = Number((Math.random() * 30).toFixed(2));
                    if (img_i > 1) img_i = 0; else ++img_i

                    return <DevicePreview key={device_id} deviceImage={img_arr[img_i]} deviceName={device_name} currUsage={currUsageTest} totalUsage={30} deviceId={device_id} redirectOnClick={() => openDeviceStats(device_name)} />
                })

            ) : (

                <Text> Error loading plugs </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})
