import {React, useState} from "react"
import { Text, View, StyleSheet, TouchableOpacity, } from "react-native"
import { Colors } from "../colors"
import PlatformImage from "../info/platform_image"
import { DeviceType } from "../types"
import { useResponsiveLayout } from "../window_utils"

export type MobileTabs = {
    titles: Array<string>,
    images: Array<string>,
    imagesSelected: Array<string>,
    onOpen: Array<Function>
}

export default function MobileTabs({ titles, images, imagesSelected, onOpen } : MobileTabs) {
    const [selectedTab, setSelectedTab] = useState(0);
    const layout: DeviceType = useResponsiveLayout()

    if (titles.length !== images.length || titles.length !== imagesSelected.length || titles.length !== onOpen.length) {
        console.log("Error: There is a mismatch in the number of mobile tabs.")
    }
    
    const tabs = (
        titles.map((title, index) => (
            <View
                key={index}
                style={layout === DeviceType.Mobile ? styles.mobileHorizontalChildren : styles.tabletHorizontalChildren}>
                <TouchableOpacity 
                    key={index}
                    onPress={() => {
                        setSelectedTab(index)
                        onOpen[index]()
                    }}
                    style={styles.tabContainer}>

                    <PlatformImage 
                        style={styles.tabImage}
                        width={24} height={24}
                        imagePath={selectedTab === index ? imagesSelected[index] : images[index]}/>
                    <Text style={selectedTab === index ? styles.selectedTabText : styles.tabText}>
                        {title}
                    </Text>
                </TouchableOpacity>
                {(index < titles.length - 1) ? 
                    <View 
                        style={layout === DeviceType.Mobile ? styles.mobileSpacer : styles.tabletSpacer}>
                        <View style={styles.lineContainer}>
                            <View style={styles.line}></View>
                        </View>
                    </View> : <View/>}
            </View>
        ))
    )
    

    return (
        <View style={layout === DeviceType.Mobile ? styles.mobileContainer : styles.tabletContainer}>
            {tabs}
        </View>
    )
}

const styles = StyleSheet.create({
    tabImage: {
        width: 24,
        height: 24,
        objectFit: 'contain',
        objectPosition: 'center',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    lineContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        height: 50,
    },
    line: {
        flex: 1,
        width: 3,
        height: 50,
        backgroundColor: Colors.P2,
    },
    tabletHorizontalChildren: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25
    },
    mobileHorizontalChildren: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    tabletSpacer: {
        alignItems: 'center',
        height: 30,
        marginRight: 25,
    },
    mobileSpacer: {
        alignItems: 'center',
        height: 30,
        marginRight: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    mobileContainer: {
        padding: 12,
        height: 60,
        backgroundColor: Colors.P4,

        borderRadius: 10,
        borderColor: Colors.P2,
        borderWidth: 3,
        
        position: 'fixed',
        bottom: 15,
        
        alignSelf: 'center',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    tabletContainer: {
        padding: 15,
        paddingLeft: 33,
        height: 60,
        backgroundColor: Colors.P4,

        borderRadius: 10,
        borderColor: Colors.P2,
        borderWidth: 3,

        position: 'fixed',
        bottom: 15,
        
        alignSelf: 'center',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'

    },
    tabContainer: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        textAlign: 'center',
    },
    tabText: {
        fontSize: 12,
        fontWeight: 600,
        color: Colors.P3
    },
    selectedTabText: {
        fontSize: 12,
        fontWeight: 600,
        color: Colors.P1
    }
})