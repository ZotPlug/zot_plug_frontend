// web/app/graph_section/page.tsx
'use client'

import { useEffect, useState } from "react"
import { UserDeviceInfo } from "ui/types"
import { get_all_devices_by_userId } from "../api_utils/api_actions"
import { Colors } from "ui/colors"
import { StyleSheet } from 'react-native'

import UsageStatisticsGraph from "../info/graphs/usage_stats"
import MostUsedDevicesGraph from "../info/graphs/devices"
import LinearGradient from "react-native-linear-gradient"
import useGraphData from "../hooks/useGraphData"

interface Props {
    userId: string,
    isRange?: boolean
    fixedRange?: '24h' | '7d' | '30d'
    showUsageStats?: boolean
    showDevices?: boolean
    globalDeviceId?: number
}

export default function GraphSection({ 
    userId, 
    isRange = true,
    fixedRange,
    showUsageStats = true,
    showDevices = true,
    globalDeviceId
 }: Props) {
    const [devices, setDevices] = useState<UserDeviceInfo[]>([])
    const [localDeviceId, setLocalDeviceId] = useState<number | undefined>()
    const selectedDeviceId = globalDeviceId ?? localDeviceId
    const [range, setRange] = useState<'24h' | '7d' | '30d'>(
        fixedRange ?? '24h'
    )
    const effectiveRange = fixedRange ?? range
    const { usageData, deviceData, loading } = useGraphData({
        userId, 
        deviceId: selectedDeviceId,
        range: effectiveRange, 
        fetchUsage: showUsageStats,
        fetchDevices: showDevices
    })

    useEffect(() => {
        async function fetchDevices() {
            const res = await get_all_devices_by_userId({ userId })
            if (res.ok) {
                setDevices(res.value)
                if (res.value.length > 0) {
                    setLocalDeviceId(res.value[0].device_id)
                }
            }
        }
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
                {devices.length > 0 && (
                    <select
                        value={selectedDeviceId}
                        onChange={(e) => setLocalDeviceId(Number(e.target.value))}
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
                    <p>Loading graphs...</p>
                </div>
            ) : (
                // <div className="flex flex-row gap-6 mt-2 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2 w-full">
                    {showUsageStats && (
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={[Colors.GGrad1, Colors.GGrad2]}
                            style={styles.graphCard}
                        >
                            <h3 className="text-black font-semibold mb-2">Usage Statistics</h3>
                            
                            <UsageStatisticsGraph 
                                data={usageData}
                                range={range}
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
                            <h3 className="text-black font-semibold mb-2">Most Used Devices</h3>
                            
                            <MostUsedDevicesGraph 
                                data={deviceData}
                                range={range}
                            />
                        </LinearGradient>
                    )}
                </div>
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
    graphCard: {
        flex: 1,          
        padding: 12,
        borderRadius: 12,
    },
})