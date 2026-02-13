'use client'
import { useParams, useRouter } from "next/navigation"
import DailyTarget from "ui/dailyTarget/comp"
import PlatformImage from "ui/info/platform_image"
import NavBarButton from "ui/buttons/navbar_button"
import NavBarButton2 from "ui/buttons/navbar_button2"
import imagePaths from "../imagePaths"
import { useLocation } from 'react-router-dom'
import { StyleSheet, View } from 'react-native';
import LinearGradient from "react-native-web-linear-gradient"
import { useEffect, useState } from 'react'
import { Colors } from "ui/colors"
import { DeviceType } from "ui/types"
import { useResponsiveLayout } from "ui/window_utils"

type NavBar = {
    currentProgress: number,
    maxProgress: number,
}

enum CurrentPage {
    Dashboard,
    Devices,
    PowerUsage,
    Rewards,
    CampusUsage,
    Friends,
    Settings
}

/**
 * Gets the page we're currently on.
 */
function getCurrentPage(location: string) {
    if (location.includes("/devices")) {
        return CurrentPage.Devices
    }
    if (location.includes("/power_usage")) {
        return CurrentPage.PowerUsage
    }
    if (location.includes("/rewards")) {
        return CurrentPage.Rewards
    }
    if (location.includes("/campus_usage")) {
        return CurrentPage.CampusUsage
    }
    if (location.includes("/friends")) {
        return CurrentPage.Friends
    }
    if (location.includes("/settings")) {
        return CurrentPage.Settings
    }

    return CurrentPage.Dashboard
}

export default function NavBar({currentProgress, maxProgress}: NavBar) {
	const { userId } = useParams<{ userId: string }>()
    const router = useRouter()
    
    const layout: DeviceType = useResponsiveLayout()
    
    const [page, setPage] = useState(CurrentPage.Dashboard);
    const location = useLocation()
    useEffect(() => {
        setPage(getCurrentPage(location.pathname))
    }, [location, layout])
    
    return (
        <>
            <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 1}} 
                colors={[Colors.BCGrad1, Colors.BCGrad2]}
                style={styles.container}>
                <View style={styles.logo}>
                    <PlatformImage 
                        imagePath={imagePaths["welcome_logo"]}
                        width={150} height={150}/>
                </View>
                <DailyTarget 
                    currProgress={currentProgress}
                    maxProgress={maxProgress}
                    imagePaths={imagePaths}/>

                <div style={styles.navButtonContainer}>
                    <NavBarButton 
                        isSelected={page === CurrentPage.Dashboard}
                        text="Dashboard" 
                        imagePath={imagePaths["nav_dashboard"]}
                        onPress={() => {
                            setPage(CurrentPage.Dashboard)
                            router.push(`/dashboard/${userId}/`)
                        }}/>
                    <NavBarButton 
                        isSelected={page === CurrentPage.Devices}
                        text="Devices" 
                        imagePath={imagePaths["nav_devices"]}
                        onPress={() => {
                            setPage(CurrentPage.Devices)
                            router.push(`/dashboard/${userId}/devices`)
                        }}/>
                    <NavBarButton 
                        isSelected={page === CurrentPage.PowerUsage}
                        text="Power Usage" 
                        imagePath={imagePaths["nav_powerUsage"]}
                        onPress={() => {
                            setPage(CurrentPage.PowerUsage)
                            router.push(`/dashboard/${userId}/power_usage`)
                        }}/>
                    <NavBarButton 
                        isSelected={page === CurrentPage.Rewards}
                        text="Rewards" 
                        imagePath={imagePaths["nav_rewards"]}
                        onPress={() => {
                            setPage(CurrentPage.Rewards)
                            router.push(`/dashboard/${userId}/rewards`)
                        }}/>
                    <NavBarButton 
                        isSelected={page === CurrentPage.CampusUsage}
                        text="Campus Usage" 
                        imagePath={imagePaths["nav_campusUsage"]}
                        onPress={() => {
                            setPage(CurrentPage.CampusUsage)
                            router.push(`/dashboard/${userId}/campus_usage`)
                        }}/>
                    <NavBarButton 
                        isSelected={page === CurrentPage.Friends}
                        text="Friends" 
                        imagePath={imagePaths["nav_friends"]}
                        onPress={() => {
                            setPage(CurrentPage.Friends)
                            router.push(`/dashboard/${userId}/friends`)
                        }}/>
                    <NavBarButton 
                        isSelected={page === CurrentPage.Settings}
                        text="Settings" 
                        imagePath={imagePaths["nav_settings"]}
                        onPress={() => {
                            setPage(CurrentPage.Settings)
                            router.push(`/dashboard/${userId}/settings`)
                        }}/>
                </div>
                <NavBarButton2 
                    text="Log Out" 
                    imagePath={imagePaths["nav_logOut"]}
                    imagePathHover={imagePaths["nav_logOutHover"]}
                    onPress={() => router.push(`/`)}/>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
	container: {
        maxWidth: 375,
        width: '40vw',
        height: '100%',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        padding: 20,
        alignItems: 'center',
        gap: 10,
	},
    logo: {
        marginTop: 15,
    },
    navButtonContainer: {
        marginTop: 15,
        marginBottom: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    }
})
