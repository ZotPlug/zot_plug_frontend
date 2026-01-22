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
})