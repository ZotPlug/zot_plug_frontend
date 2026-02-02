'use client'
import SharedH1 from "ui/info/text/shared_h1"
import SharedH2 from "ui/info/text/shared_h2"

import MostUsedDevicesGraph from "@/app/info/graphs/devices"
import UsageStatisticsGraph from "@/app/info/graphs/usage_stats"
import LinearGradient from "react-native-linear-gradient"
import { StyleSheet } from 'react-native'
import { Colors } from "ui/colors"

export default function PowerUsage() {
	return (
		<>
			{/* Header */}
			<SharedH1 text={'Power Usage'}/>
		
			{/* Daily Usage */}
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[Colors.BCGrad1, Colors.BCGrad2]}
				style={styles.gradient}
			>
				<SharedH2 text="Daily Usage" />

				<div className="flex flex-row gap-6 mt-2 w-full">
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						colors={[Colors.GGrad1, Colors.GGrad2]}
						style={styles.graphCard}
					>
						<UsageStatisticsGraph />
					</LinearGradient>

					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						colors={[Colors.GGrad2, Colors.GGrad2]}
						style={styles.graphCard}
					>
						<MostUsedDevicesGraph />
					</LinearGradient>
				</div>
			</LinearGradient>

			{/* Weekly Usage */}
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[Colors.BCGrad1, Colors.BCGrad2]}
				style={styles.gradient}
			>
				<SharedH2 text="Weekly Usage" />

				<div className="flex flex-row gap-6 mt-2 w-full">
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						colors={[Colors.GGrad1, Colors.GGrad2]}
						style={styles.graphCard}
					>
						<UsageStatisticsGraph />
					</LinearGradient>

					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						colors={[Colors.GGrad2, Colors.GGrad2]}
						style={styles.graphCard}
					>
						<MostUsedDevicesGraph />
					</LinearGradient>
				</div>
			</LinearGradient>

			{/* Monthly Usage */}
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[Colors.BCGrad1, Colors.BCGrad2]}
				style={styles.gradient}
			>
				<SharedH2 text="Monthly Usage" />

				<div className="flex flex-row gap-6 mt-2 w-full">
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						colors={[Colors.GGrad1, Colors.GGrad2]}
						style={styles.graphCard}
					>
						<UsageStatisticsGraph />
					</LinearGradient>

					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						colors={[Colors.GGrad2, Colors.GGrad2]}
						style={styles.graphCard}
					>
						<MostUsedDevicesGraph />
					</LinearGradient>
				</div>
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

