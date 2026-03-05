'use client'

import { useEffect, useState } from "react"
import { DeviceType, UserDeviceInfo } from "ui/types"
import { get_all_devices_by_userId } from "../api_utils/api_actions"
import { Colors } from "ui/colors"
import { StyleSheet, Text } from 'react-native'

import UsageStatisticsGraph from "../info/graphs/usage_stats"
import MostUsedDevicesGraph from "../info/graphs/devices"
import LinearGradient from "react-native-linear-gradient"
import useGraphData from "../hooks/useGraphData"
import { useResponsiveLayout } from "ui/window_utils"

interface DisplayGraphProps {
    userId: string,
    isRange?: boolean
    fixedRange?: '24h' | '7d' | '30d'
    showUsageStats?: boolean
    showDevices?: boolean,
    showDeviceName?: boolean,
    showDescription?: boolean,
    deviceId?: string
}

export default function GraphSection({ 
    userId, 
    isRange = true,
    fixedRange,
    showUsageStats = true,
    showDevices = true,
    showDeviceName = true,
    showDescription = true,
    deviceId
 }: DisplayGraphProps) {
    const [devices, setDevices] = useState<UserDeviceInfo[]>([])
    const [selectedDeviceId, setSelectedDeviceId] = useState<number | undefined>()
    
    const [range, setRange] = useState<'24h' | '7d' | '30d'>(
        fixedRange ?? '24h'
    )
    
    const layout: DeviceType = useResponsiveLayout()
    
    const effectiveRange = fixedRange ?? range

    const { usageData, deviceData, loading } = useGraphData({
        userId, 
        deviceId: selectedDeviceId,
        range: effectiveRange, 
        fetchUsage: showUsageStats,
        fetchDevices: showDevices
    })

    async function fetchDevices() {
        const res = await get_all_devices_by_userId({ userId })
        if (res.ok) {
            setDevices(res.value)
            if (res.value.length > 0) {
                if (typeof deviceId !== 'undefined') {
                    setSelectedDeviceId(parseInt(deviceId))
                } else {
                    setSelectedDeviceId(res.value[0].device_id)
                }
            }
        }
    }

    useEffect(() => {
        fetchDevices()
        
    }, [userId])

    const selectedDeviceName = devices.find(d => d.device_id === selectedDeviceId)?.device_name ?? ""
    
    return (
        <div>
            {/* CONTROLS */}
            <div className="flex gap-4 mt-4 mb-6 text-black">
                {/* RANGE SELECT */}
                {isRange && (
                    <select 
                        value={effectiveRange}
                        onChange={(e) => setRange(e.target.value as '24h' | '7d' | '30d')}
                        className="p-2 border rounded-md text-black"
                    >
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                    </select>
                )}
                
                
                {/* DEVICE SELECT (ONLY AFFECTS USAGE GRAPH)*/}
                {showDeviceName && devices.length > 0 && (
                    <select
                        value={selectedDeviceId}
                        onChange={(e) => setSelectedDeviceId(Number(e.target.value))}
                        className="p-2 border rounded-md text-black"
                    >
                        {devices.map(device => (
                            <option key={device.device_id} value={device.device_id}>
                                {device.device_name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {loading ? (
                <div className="text-center py-10 text-black">
                    <Text style={styles.loadingText}>Loading graphs...</Text>
                </div>
            ) : (
                layout !== DeviceType.Desktop ? (

                 <div className="flex flex-col gap-6 mt-2 w-full">
                    {showUsageStats && (
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={[Colors.GGrad1, Colors.GGrad2]}
                            style={styles.graphCard}
                        >
                            <Text style={styles.graphTitle}>Usage Statistics</Text>
                            
                            <UsageStatisticsGraph 
                                showDescription={showDescription}
                                data={usageData}
                                range={effectiveRange}
                                title={selectedDeviceName}
                            />
                        </LinearGradient>
                    )}

                    {showDevices && (
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={[Colors.GGrad1, Colors.GGrad2]}
                            style={styles.graphCard}
                        >
                            <Text style={styles.graphTitle}>Most Used Devices</Text>
                            
                            <MostUsedDevicesGraph 
                                showDescription={showDescription}
                                data={deviceData}
                                range={effectiveRange}
                            />
                        </LinearGradient>
                    )}
                </div>
                ) : (
                 <div className="flex flex-row gap-6 mt-2 w-full">
                    {showUsageStats && (
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={[Colors.GGrad1, Colors.GGrad2]}
                            style={styles.graphCard}
                        >
                            <Text style={styles.graphTitle}>Usage Statistics</Text>
                            
                            <UsageStatisticsGraph 
                                showDescription={showDescription}
                                data={usageData}
                                range={effectiveRange}
                                title={selectedDeviceName}
                            />
                        </LinearGradient>
                    )}

                    {showDevices && (
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={[Colors.GGrad1, Colors.GGrad2]}
                            style={styles.graphCard}
                        >
                            <Text style={styles.graphTitle}>Most Used Devices</Text>
                            
                            <MostUsedDevicesGraph 
                                showDescription={showDescription}
                                data={deviceData}
                                range={effectiveRange}
                            />
                        </LinearGradient>
                    )}
                </div>
                )
                // <div className="flex flex-row gap-6 mt-2 w-full">
                //<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2 w-full">
            )}
        </div>
    )
}

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        padding: 12,
        borderRadius: 12,
    },
    graphTitle: {
        fontWeight: 600,
        fontSize: 16,
        color: Colors.S1
    },
    loadingText: {
        color: Colors.S1,
        fontSize: 14,
        fontStyle: 'italic'
    },
    graphCard: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        padding: 12,
        borderRadius: 12,
        boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
})