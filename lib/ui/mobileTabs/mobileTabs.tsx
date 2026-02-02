import {React, useState} from "react"
import { Text, View, StyleSheet, TouchableOpacity, } from "react-native"
import { Colors } from "../colors"
import PlatformImage from "../info/platform_image"

export type MobileTabs = {
    titles: Array<string>,
    images: Array<string>,
    imagesSelected: Array<string>,
    onOpen: Array<Function>
}

export default function MobileTabs({ titles, images, imagesSelected, onOpen } : MobileTabs) {
    const [selectedTab, setSelectedTab] = useState(0);
    

    if (titles.length !== images.length || titles.length !== imagesSelected.length || titles.length !== onOpen.length) {
        console.log("Error: There is a mismatch in the number of mobile tabs.")
    }
    
    const tabs = (
        titles.map((title, index) => (
            <TouchableOpacity 
                onPress={() => {
                    setSelectedTab(index)
                    onOpen[index]()
                }}
                style={styles.tabContainer}>

                <PlatformImage 
                    imagePath={selectedTab === index ? imagesSelected[index] : images[index]}/>
                <Text style={styles.tabText}>
                    {title}
                </Text>
            </TouchableOpacity>
        ))
    )
    

    return (
        <View style={styles.container}>
            {tabs}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        width: '100%',
        height: 60,
        backgroundColor: Colors.P4,

        borderRadius: 10,
        borderColor: Colors.P2,
        borderWidth: 3,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'

    },
    tabContainer: {

    },
    tabText: {

    }
})