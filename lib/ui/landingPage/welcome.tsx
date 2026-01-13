import {Platform, View, Image as RNImage, StyleSheet} from 'react-native'
import { DeviceType } from "../types"
import Shared_H1 from "../info/text/shared_h1"
import Button_1 from '../buttons/button_1'
import { useResponsiveLayout } from "../window_utils"
import LinearGradient from 'react-native-linear-gradient'

type Welcome = {
	onLogin?: () => unknown | Promise<unknown>,
	onSignUp?: () => unknown | Promise<unknown>,
    logoPath: string, 
}

export default function Welcome({ onLogin, onSignUp, logoPath }: Welcome) {
    const layout: DeviceType = useResponsiveLayout()

    let logoSize = 200
    switch (layout) {
        case DeviceType.Mobile:
            logoSize = 200
            break
        case DeviceType.Tablet:
            logoSize = 280
            break
        case DeviceType.Desktop:
            logoSize = 280
            break
    }

    let logoImage
    if (Platform.OS === 'web') {
        logoImage = 
            <img 
                src={logoPath}
                width={logoSize}
                height={logoSize}
                style={styles.webImage}
                alt={"Zotplug Logo"} />
    } else {
        logoImage =
            <RNImage 
                source={logoPath}
                style={[styles.mobileImage]} 
                resizeMode="contain"
            />
    }

    return (
        <>
            <LinearGradient start={{x: 0, y: 0}} 
                end={{x: 1, y: 1}} 
                colors={['#EAF6FF', '#DDE2FA']}
                style={styles.container}>
                <View style={styles.centerChildren}>
                    <Shared_H1 text="Welcome to" center={true}/>
                    <View style={styles.logoSpacer}></View>
                    {logoImage}
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
    },
    buttonsAlignHorizontal: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

