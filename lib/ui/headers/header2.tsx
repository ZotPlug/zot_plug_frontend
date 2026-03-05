import {useState} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Shared_H1 from "../info/text/shared_h1"
import PlatformImage from '../info/platform_image'

type Header2 = {
    title: string, 
    headerIcon: string,
}

/**
 * A header icon with a logo, a back button, and a title.
 */
export default function Header2({ title, headerIcon}: Header2) {

    const [hover, setHover] = useState(false)

    return (
        <>
            <View style={styles.containerStyle}>
                <View style={styles.centerChildren}>
                    <PlatformImage 
                        imagePath={headerIcon}
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
        width: '100%'
    },
    centerChildren: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
})

