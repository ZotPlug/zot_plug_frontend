'use client'

import { StyleSheet } from 'react-native'
import { useParams } from "next/navigation"
import { Colors } from "ui/colors"

import SharedH1 from "ui/info/text/shared_h1"
import { useRouter } from 'next/navigation'
import SharedH2 from 'ui/info/text/shared_h2'
import Header1 from 'ui/headers/header1'

import GraphSection from "@/app/graph_section/page"
import LinearGradient from "react-native-linear-gradient"
import { DeviceType } from 'ui/types'
import { useResponsiveLayout } from 'ui/window_utils'
import imagePaths from '@/app/imagePaths'

export default function PowerUsage() {
	const { userId } = useParams<{ userId: string }>()
    const router = useRouter()
    const layout: DeviceType = useResponsiveLayout()
    
    const header = (layout === DeviceType.Desktop) ? (
        <SharedH1 text={'Power Usage'}/>
    ) : (
        <Header1 
            headerIcon={imagePaths["power_plug"]}
            imagePaths={imagePaths}
            title="Power Usage"
            onBack={ () => router.push(`/dashboard/${userId}/devices`) }/>
    )

	return (
		<>
            {header}
		
			{/* DAILY */}
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[Colors.BCGrad1, Colors.BCGrad2]}
				style={styles.gradient}
			>
                <div style={styles.headerText}>Daily Usage</div>
				<GraphSection 
					userId={userId}
					isRange={false}
					fixedRange='24h'
				/>
			</LinearGradient>

			{/* WEEKLY */}
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[Colors.BCGrad1, Colors.BCGrad2]}
				style={styles.gradient}
			>
                <div style={styles.headerText}>Weekly Usage</div>
				<GraphSection 
					userId={userId}
					isRange={false}
					fixedRange='7d'
				/>
			</LinearGradient>

			{/* MONTHLY */}
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[Colors.BCGrad1, Colors.BCGrad2]}
				style={styles.gradient}
			>
                <div style={styles.headerText}>Monthly Usage</div>
				<GraphSection 
					userId={userId}
					isRange={false}
					fixedRange='30d'
				/>
			</LinearGradient>
		</>
	)
}

const styles = StyleSheet.create({
	gradient: {
		width: '100%',
		padding: 12,
		borderRadius: 12,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
	},
	graphCard: {
		flex: 1,          
		padding: 12,
		borderRadius: 12,
	},
    headerText: {
        fontSize: 24,
        fontWeight: 700,
        color: Colors.S1,
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    }
})

