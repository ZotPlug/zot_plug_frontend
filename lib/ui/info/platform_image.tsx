import { Platform, Image as RNImage, type StyleProp, type ViewStyle } from 'react-native'
import { DeviceType } from "../types"
import { useResponsiveLayout } from "../window_utils"

type PlatformImage = {
    imagePath: string,
    width?: number,
    height?: number,
    mobileWidth: number,
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

    let image
    if (Platform.OS === 'web') {
        image = 
            <img 
                src={imagePath}
                width={imgWidth}
                height={imgHeight}
                style={style}
                alt={altText} 
                />
    } else {
        image =
            <RNImage 
                source={imagePath}
                width={imgWidth}
                height={imgHeight}
                style={style} 
            />
    }

    return image
}

