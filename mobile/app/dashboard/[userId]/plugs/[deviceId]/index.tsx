import { Text, View, StyleSheet } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import SharedH1 from 'ui/components/shared_h1'
import SharedH2 from 'ui/components/shared_h2'
import DeviceReadings from 'ui/deviceReadings/comp'

export default function PlugUsagePage()
{
    const { userId, deviceId } = useLocalSearchParams();
    const router = useRouter()

    return (
        <View>
            <SharedH1 text={`Plug: ${deviceId}`} />
            <View>
                <SharedH2 text='Statistics' />
                <DeviceReadings voltage={120} current={1.3} />
            </View>
            <View>
                <SharedH2 text='Limits' />
            </View>
            <View>
                <SharedH2 text='Actions' />
            </View>
            <View>
                <SharedH2 text='Users' />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})