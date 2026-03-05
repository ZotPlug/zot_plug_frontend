'use client'
import imagePaths from "@/app/imagePaths"
import { useParams, useRouter } from "next/navigation"
import Header1 from "ui/headers/header1"
import SharedH1 from "ui/info/text/shared_h1"
import { StyleSheet } from 'react-native'
import SharedH2 from "ui/info/text/shared_h2"
import { DeviceType } from "ui/types"
import { useResponsiveLayout } from "ui/window_utils"
import { Colors } from "ui/colors"

export default function Friends() {
    const router = useRouter()
    const layout: DeviceType = useResponsiveLayout()
	const { userId } = useParams<{ userId: string }>()

    const header = (layout === DeviceType.Desktop) ? (
        <SharedH1 text={'Campus Usage'}/>
    ) : (
        <Header1 
            headerIcon={imagePaths["header_plug"]}
            imagePaths={imagePaths}
            title="Campus Usage"
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