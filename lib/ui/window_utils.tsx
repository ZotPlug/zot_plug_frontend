import {useWindowDimensions} from 'react-native'
import { DeviceType } from './types'


/**
 * @returns Whether we are on a mobile, tablet, or desktop screen size (based 
 * on width).
 */
export function useResponsiveLayout() {
    const {width} = useWindowDimensions()
    const mobileWidth = 420
    const tabletWidth = 768
    // TODO: Fix flickering issue when width is changing between tablet and desktop view
    if (width <= mobileWidth) {
        return DeviceType.Mobile
    }
    else if (width <= tabletWidth) {
        return DeviceType.Tablet
    }
    
    return DeviceType.Desktop
}