// web/app/dashboard/[userId]/layout.tsx

'use client'
import { ReactNode } from "react"
import { StyleSheet } from 'react-native'
import LinearGradient from "react-native-linear-gradient"

import { DeviceType } from "ui/types"
import { useResponsiveLayout } from "ui/window_utils"
import { Colors } from "ui/colors"

import NavBar from "@/app/navbar/page"

export default function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    const layout: DeviceType = useResponsiveLayout()

    let content
    switch (layout) {
        case DeviceType.Mobile:
            content = (
                <div style={styles.mobileContainer}>
                    {children}
                </div>
            )
            break
        case DeviceType.Tablet:
            content = (
                <div style={styles.tabletContainer}>
                    {children}
                </div>
            )
            break
        case DeviceType.Desktop:
            content = (
                <main style={styles.mainContainer}>
                    {children}
                </main>
            )
            break
    }
    
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[Colors.BGrad1, Colors.BGrad2]}
            style={styles.gradient}
        >
            <div style={styles.pageWrapper}>
                {layout == DeviceType.Desktop ? (
                    <div style={styles.desktopRow}>
                        {/* Left Navbar */}
                        <aside style={styles.navbarContainer}>
                            <NavBar currentProgress={50} maxProgress={100} />
                        </aside>

                        {/* Right Content (changes per route) */}
                        {content}
                    </div>
                ) : (
                    <div>
                        {content}
                    </div>
                )}
            </div>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        minHeight: '100vh',
        width: '100%',
    },
    pageWrapper: {
        width: '100%',
        height: '100%',
    },
    desktopRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        minHeight: '100vh',
        gap: 32,                    // gap-8
    },
    navbarContainer: {
        maxWidth: 375,                 // md:w-1/4
        width: '40vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,                    // gap-6
    },
    mainContainer: {
        flex: 1,                    // md:w-3/4
        display: 'flex',
        flexDirection: 'column',
        gap: 24,                    // gap-6
        width: '100%',
        minHeight: '100vh',
        marginRight: 32,
        marginTop: 96,
        marginBottom: 24,
    },
    tabletContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 24,                    // gap-6
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 30,
    },
    mobileContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 24,                    // gap-6
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 55
    },
})
