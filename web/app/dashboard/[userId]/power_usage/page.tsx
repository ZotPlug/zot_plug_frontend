'use client'

import { StyleSheet } from 'react-native'
import { useParams } from "next/navigation"
import { Colors } from "ui/colors"

import SharedH1 from "ui/info/text/shared_h1"
import SharedH2 from 'ui/info/text/shared_h2'

import GraphSection from "@/app/graph_section/page"
import LinearGradient from "react-native-linear-gradient"

export default function PowerUsage() {
	const { userId } = useParams<{ userId: string }>()

	return (
		<>
			<SharedH1 text={'Power Usage'}/>
		
			{/* DAILY */}
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[Colors.BCGrad1, Colors.BCGrad2]}
				style={styles.gradient}
			>
				<SharedH2 text="Daily Usage" />
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
				<SharedH2 text="Weekly Usage" />
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
				<SharedH2 text="Monthly Usage" />
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
	},
	graphCard: {
		flex: 1,          
		padding: 12,
		borderRadius: 12,
	},
})

