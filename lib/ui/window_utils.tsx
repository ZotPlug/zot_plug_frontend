import {useWindowDimensions} from 'react-native'

export enum DeviceType {
    Mobile,
    Tablet,
    Desktop
}

/**
 * @returns Whether we are on a mobile, tablet, or desktop screen size (based 
 * on width).
 */
export function useResponsiveLayout() {
    const {width} = useWindowDimensions()
    const mobileWidth = 360
    const tabletWidth = 768
    if (width <= mobileWidth) {
        return DeviceType.Mobile
    }
    else if (width <= tabletWidth) {
        return DeviceType.Tablet
    }
    
    return DeviceType.Desktop
}