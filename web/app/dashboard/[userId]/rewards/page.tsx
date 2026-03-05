'use client'
import SharedH1 from "ui/info/text/shared_h1"
import SharedH2 from "ui/info/text/shared_h2"
import { useParams, useRouter } from 'next/navigation'
import { DeviceType } from "ui/types"
import { StyleSheet } from 'react-native'
import { useResponsiveLayout } from "ui/window_utils"
import imagePaths from "@/app/imagePaths"
import Header1 from "ui/headers/header1"
import { Colors } from "ui/colors"

export default function Rewards() {
    const router = useRouter()
    const layout: DeviceType = useResponsiveLayout()
	const { userId } = useParams<{ userId: string }>()

    const header = (layout === DeviceType.Desktop) ? (
        <SharedH1 text={'Rewards'}/>
    ) : (
        <Header1 
            headerIcon={imagePaths["rewards_plug"]}
            imagePaths={imagePaths}
            title="Rewards"
            onBack={ () => router.push(`/dashboard/${userId}/`) }/>
    )
	return (
		<>
			{/* Header */}
            {header}

			{/* Rewards Content */}
            <div style={styles.text}>Coming soon!</div>
		</>
	)
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: 700,
        color: Colors.S1,
        textAlign: 'center'
    }
})

