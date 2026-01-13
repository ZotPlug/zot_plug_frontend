
import {Platform, View, Image as RNImage, StyleSheet} from 'react-native'
import { DeviceType } from "../types"
import Shared_H1 from "../info/text/shared_h1"
import Button_1 from '../buttons/button_1'
import { useResponsiveLayout } from "../window_utils"
import LinearGradient from 'react-native-linear-gradient'
import PlatformImage from '../info/platform_image'

type Header1 = {
	onBack?: () => unknown | Promise<unknown>,
    title: string, 
    backIcon: string,
    headerIcon: string
}

/**
 * A header icon with a logo, a back button, and a title.
 */
export default function Header1({ onBack, title, backIcon, headerIcon }: Header1) {
    return (
        <>
            <View style={styles.containerStyle}>
                <PlatformImage 
                    imagePath={backIcon}
                    style={styles.backStyle}
                    mobileWidth={48} mobileHeight={48} 
                    tabletWidth={64} tabletHeight={64} 
                    desktopWidth={64} desktopHeight={64} />
                <View style={styles.centerChildren}>
                    <PlatformImage 
                        imagePath={headerIcon}
                        style={styles.iconStyle}
                        mobileWidth={123} mobileHeight={100} 
                        tabletWidth={200} tabletHeight={120} 
                        desktopWidth={200} desktopHeight={120} />
                    <Shared_H1 text={title} center={true}/>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    centerChildren: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backStyle: {
        position: 'absolute',
        objectFit: 'contain',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: 50
    },
    iconStyle: {
        objectFit: 'contain',
        objectPosition: 'top',
    },
})

