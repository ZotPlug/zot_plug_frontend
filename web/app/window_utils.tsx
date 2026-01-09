import { useState, useEffect } from 'react'

export enum DeviceType {
    Mobile,
    Tablet,
    Desktop
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window

    return {
        width,
        height
    }
}

/**
 * Use: const { height, width } = useWindowDimensions()
 * @returns Gets the window dimensions.
 */
function useWindowDimensions() {
    // Credit to https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
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