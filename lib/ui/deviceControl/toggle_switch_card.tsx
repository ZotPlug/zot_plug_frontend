import {React} from "react"
import { Text, View, StyleSheet } from "react-native"
import Switch from '../buttons/customSwitch/switch'
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../colors"
import { useResponsiveLayout } from "../window_utils"
import { DeviceType } from "../types"

export type ToggleSwitchCard = {
    defaultValue?: boolean,
    title: string, 
	onSwitchOn?: Function,
	onSwitchOff?: Function,
}

export default function ToggleSwitchCard({defaultValue, title, onSwitchOn, onSwitchOff } : ToggleSwitchCard) {

    const layout: DeviceType = useResponsiveLayout()
    
    // TODO: Make the font size and color dynamic

    return (
        (layout === DeviceType.Mobile) ?
            <LinearGradient
                start={{x: 0, y: 0.4}} 
                end={{x: 1, y: 0.6}} 
                colors={[Colors.BCGrad1, Colors.BCGrad2]}
                style={styles.mobileContainer}>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.mobileTitle}>
                        {title}
                    </Text>
                </View>

                <Switch 
                    onSwitchOn={onSwitchOn}
                    onSwitchOff={onSwitchOff}
                    onColor={Colors.P1}
                    defaultValue={defaultValue}/>
            </LinearGradient>
            :
            <View style={styles.tabletContainer}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.tabletTitle}>
                        {title}
                    </Text>
                </View>

                <Switch 
                    onSwitchOn={onSwitchOn}
                    onSwitchOff={onSwitchOff}
                    defaultValue={defaultValue}
                    onColor={Colors.P1}/>
            </View>
    )
}

const styles = StyleSheet.create({
    mobileContainer: {
        padding: 15,
        borderRadius: 10,
        width: '100%',
        height: 120,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'

    },
    tabletContainer: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.S2,
        width: '100%',
        height: 78,

        backgroundColor: Colors.S4,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'

    },
    descriptionContainer: {
        alignSelf: 'center',
        gap: 5,
        flexShrink: 1
    },
    mobileTitle: {
        color: Colors.P1,
        fontSize: 18,
        fontWeight: 600,
    },
    tabletTitle: {
        color: Colors.S1,
        fontSize: 16,
        fontWeight: 700,
    }
})