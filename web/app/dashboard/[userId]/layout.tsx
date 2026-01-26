'use client'
import NavBar from "@/app/navbar/page";
import { StyleSheet } from 'react-native'
import { DeviceType } from "ui/types";
import { useResponsiveLayout } from "ui/window_utils";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const layout: DeviceType = useResponsiveLayout()
    
    if (layout == DeviceType.Desktop) {
        return (
            <div style={styles.container}>
                <aside style={styles.navbarContainer}>
                    <NavBar currentProgress={50} maxProgress={100} />
                </aside>

                <main style={styles.mainContainer}>
                    {children}
                </main>
            </div>
        )
    } else {
        return (
            <div style={styles.container}>
                {children}
            </div>
        )
    }

}

const styles = StyleSheet.create({
	container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
	},
	navbarContainer: {
        width: 375,
	},
	mainContainer: {
        width: '100%',
        height: '100%'
	},
})// web/app/dashboard/[userId]/layout.tsx
'use client'

import {  ReactNode, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import LinearGradient from "react-native-linear-gradient"
import { StyleSheet } from "react-native"

import { Colors } from "ui/colors"
import BasicButton from "ui/buttons/basic_button"
import DailyTarget from "ui/dailyTarget/comp"

export default function DashboardLayout({ 
    children,
}: { 
    children: ReactNode 
}) {
	const { userId } = useParams<{ userId: string }>()
    const [dailyTarget] = useState<{ currProgress: number, maxProgress: number }>({ currProgress: 350, maxProgress: 1000 })
    const router = useRouter()

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[Colors.BGrad1, Colors.BGrad2]}
            style={styles.gradient}
        >
            
            <div className="min-h-screen w-full px-6 pt-16">
                <div className="flex flex-col md:flex-row gap-8 w-full">
                
                    {/* Left Navigation Bar (persistent)*/}
                    <aside className="w-full md:w-1/4 flex flex-col gap-6">
                        <DailyTarget
                            currProgress={dailyTarget.currProgress}
                            maxProgress={dailyTarget.maxProgress}
                        />
                        <BasicButton text='Dashboard' onPress={() => router.push(`/dashboard/${userId}`)} />
                        <BasicButton text='Devices' onPress={() => router.push(`/dashboard/${userId}/plugs`)} />
                        <BasicButton text='Power Usage' onPress={() => router.push(`/dashboard/${userId}/power_usage`)} />
                        <BasicButton text='Rewards' onPress={() => router.push(`/dashboard/${userId}/rewards`)} />
                        <BasicButton text='Friends' onPress={() => router.push(`/dashboard/${userId}/friends`)} />
                        <BasicButton text='Settings' onPress={() => router.push(`/dashboard/${userId}/settings`)} />
                    </aside>

                    {/* Right Content (changes per route) */}
                    <main className="w-full md:w-3/4 flex flex-col gap-6">
                        {children}
                    </main>
                </div>
            </div>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
	gradient: {
        height: '100dvh',
	},
	container: {
        marginTop: 55,
		padding: 16,
		width: '100%',
		alignSelf: 'center',
        alignItems: 'center',
        flex: 1
	},
	text: {
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 24,
		color: "red",
	},
	col: {
		flexDirection: 'column', // row doesn't work on mobile, needs to be col
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textInput: {
		padding: 16,
		backgroundColor: 'white',
		color: 'black',
		borderRadius: 8,
		width: '100%',
		marginVertical: 8,
	},
	button: {
		borderRadius: 8,
		width: '100%',
		marginVertical: 8,
	},
})