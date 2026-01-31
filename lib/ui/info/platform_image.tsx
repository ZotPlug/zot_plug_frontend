import { Platform, Image as RNImage, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import { DeviceType } from "../types"
import { useResponsiveLayout } from "../window_utils"

type PlatformImage = {
    imagePath: string,
    width?: number,
    height?: number,
    mobileWidth?: number,
    mobileHeight?: number,
    tabletWidth?: number,
    tabletHeight?: number,
    desktopWidth?: number,
    desktopHeight?: number,
	style?: StyleProp<ViewStyle>
    altText?: string
}

/**
 * A helper class that displays an image on both mobile and web.
 * You can either specify a single width/height or specify separate values for
 * mobile, tablet, and desktop views.
 * 
 * NOTE: React Native doesn't let you dynamically resize widths and heights without using CSS, so this component uses a default style to set
 * the size on mobile. If you define a custom style, you will need to
 * calculate the height/widths in the caller dynamically, and pass those
 * into via the custom style at runtime.
 */
export default function PlatformImage({ imagePath, width, height, mobileWidth, mobileHeight, tabletWidth, tabletHeight, desktopWidth, desktopHeight, style, altText }: PlatformImage) {
    const layout: DeviceType = useResponsiveLayout()

    let imgWidth
    let imgHeight

    if (width === undefined || height === undefined) {
        switch (layout) {
            case DeviceType.Mobile:
                imgWidth = mobileWidth
                imgHeight = mobileHeight
                break
            case DeviceType.Tablet:
                imgWidth = tabletWidth
                imgHeight = tabletHeight
                break
            case DeviceType.Desktop:
                imgWidth = desktopWidth
                imgHeight = desktopHeight
                break
        }
    } else {
        imgWidth = width
        imgHeight = height
    }

    // TODO: Setup something like this so you don't have to override the width stuff when adding a custom style
    // style={[styles.progress, { width: `${percent}%` }]}
    const styles = StyleSheet.create({
        defaultStyle: {
            width: imgWidth,
            height: imgHeight,
            objectFit: 'contain',
            objectPosition: 'top',
            resizeMode: 'contain',
            alignSelf: 'center'
        },
    })

    let image
    if (Platform.OS === 'web') {
        image = 
            <img 
                src={imagePath}
                width={imgWidth}
                height={imgHeight}
                style={style === undefined ? styles.defaultStyle : style}
                alt={altText} 
                />
    } else {
        image =
            <RNImage 
                source={imagePath}
                width={imgWidth}
                height={imgHeight}
                style={style === undefined ? styles.defaultStyle : style}
            />
    }

    return image
}