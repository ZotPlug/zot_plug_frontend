import {useState} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Shared_H1 from "../info/text/shared_h1"
import PlatformImage from '../info/platform_image'

type Header1 = {
	onBack?: () => unknown | Promise<unknown>,
    title: string, 
    backIcon: string,
    backIconHover: string,
    headerIcon: string
}

/**
 * A header icon with a logo, a back button, and a title.
 */
export default function Header1({ onBack, title, backIcon, backIconHover, headerIcon }: Header1) {

    const [hover, setHover] = useState(false)

    // REMEMBER: TouchableOpacity has to be the last element drawn
    // when using absolute positioning. Otherwise clicks don't work
    return (
        <>
            <View style={styles.containerStyle}>
                <View style={styles.centerChildren}>
                    <PlatformImage 
                        imagePath={headerIcon}
                        style={styles.iconStyle}
                        mobileWidth={123} mobileHeight={100} 
                        tabletWidth={200} tabletHeight={120} 
                        desktopWidth={200} desktopHeight={120} />
                    <Shared_H1 text={title}/>
                </View>
                <TouchableOpacity 
                    onMouseEnter={() => {setHover(true)}}
                    onMouseLeave={() => {setHover(false)}}
                    style={styles.backStyle}
                    onPress={onBack}
                    >
                    {hover ? 
                        <PlatformImage 
                            imagePath={backIconHover}
                            mobileWidth={48} mobileHeight={48} 
                            tabletWidth={64} tabletHeight={64} 
                            desktopWidth={64} desktopHeight={64} />
                     : 
                        <PlatformImage 
                            imagePath={backIcon}
                            mobileWidth={48} mobileHeight={48} 
                            tabletWidth={64} tabletHeight={64} 
                            desktopWidth={64} desktopHeight={64} />
                    }
                </TouchableOpacity>
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
        borderRadius: 50,
    },
    iconStyle: {
        objectFit: 'contain',
        objectPosition: 'top',
    },
})

