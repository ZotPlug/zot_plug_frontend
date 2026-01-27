import {Platform, View, Image as RNImage, StyleSheet} from 'react-native'
import { DeviceType } from "../types"
import Shared_H1 from "../info/text/shared_h1"
import Button_1 from '../buttons/button_1'
import { useResponsiveLayout } from "../window_utils"
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../colors'
import PlatformImage from '../info/platform_image'

type Welcome = {
	onLogin?: () => unknown | Promise<unknown>,
	onSignUp?: () => unknown | Promise<unknown>,
    imagePaths: {[key: string] : string}
}

export default function Welcome({ onLogin, onSignUp, imagePaths }: Welcome) {
    const layout: DeviceType = useResponsiveLayout()

    return (
        <>
            <LinearGradient start={{x: 0, y: 0}} 
                end={{x: 1, y: 1}} 
                colors={[Colors.BGrad1, Colors.BGrad2]}
                style={styles.container}>
                <View style={styles.centerChildren}>
                    <Shared_H1 text="Welcome to"/>
                    <View style={styles.logoSpacer}></View>
                    <PlatformImage 
                        imagePath={imagePaths["welcome_logo"]} 
                        mobileWidth={200} mobileHeight={200}
                        tabletWidth={280} tabletHeight={280}
                        desktopWidth={280} desktopHeight={280}/>
                    <View style={styles.logoButtonsSpacer}></View>
                    <View style={layout === DeviceType.Mobile ? styles.buttonsAlignVertical : styles.buttonsAlignHorizontal}>
                        <Button_1 text="Login" onPress={onLogin}/>
                        <Button_1 text="Sign Up" onPress={onSignUp}/>
                    </View>
                </View>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100dvh',
        boxSizing: 'border-box',
        flex: 1,
    },
    webImage: {
        objectFit: 'contain',
        height: 200,
        width: 200,
    },
    mobileImage: {
        height: '100%',
        width: '100%',
        maxWidth: 200,
        maxHeight: 200,
    },
    centerChildren: {
        alignItems: 'center',
        marginTop: 110,
        flexDirection: 'column',
    },
    logoSpacer: {
        margin: 15
    },
    logoButtonsSpacer: {
        margin: 30
    },
    buttonsAlignVertical: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 20,
    },
    buttonsAlignHorizontal: {
        width: '100%',
        display: 'flex',
        gap: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

