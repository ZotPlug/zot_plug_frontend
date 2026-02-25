'use client'
import { useState, useEffect } from "react"
import { get_usage_stats_graph, get_most_used_devices_graph } from "../api_utils/api_actions"

type RangeType = '24h' | '7d' | '30d'

interface UsageDataPoint { x: number, y: number }
interface DeviceDataPoint { x: string, y: number }

interface UseGraphDataOptions {
    userId: string, 
    deviceId?: number
    range?: RangeType
    fetchUsage?: boolean
    fetchDevices?: boolean
}

export default function useGraphData({
    userId,
    deviceId,
    range = '24h',
    fetchUsage = true,
    fetchDevices = true,
}: UseGraphDataOptions) {
    const [usageData, setUsageData] = useState<UsageDataPoint[]>([])
    const [deviceData, setDeviceData] = useState<DeviceDataPoint[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchGraphs() {
        setLoading(true)

        try {
            // ----- USAGE STATS -----
            if (fetchUsage && deviceId != null) {
                const res = await get_usage_stats_graph({ userId, range, deviceId })
                
                if (res.ok) {
                    const expectedLength = range === '24h' ? 24 : range === '7d' ? 7 : 30
                    const formatted: UsageDataPoint[] = Array.from({ length: expectedLength }, (_, range) => ({
                        x: range,
                        y: Number(res.value[range]?.y ?? 0)
                    }))
                    setUsageData(formatted)
                } else {
                    console.error("Failed to fetch usage data:", res.error)
                    setUsageData([])
                }
            }

            // ----- MOST USED DEVICES -----
            if (fetchDevices) {
                const res = await get_most_used_devices_graph({ userId, range })
                
                if (res.ok) {
                    const formatted: DeviceDataPoint[] = res.value.map(d => ({
                        x: d.x ?? "Unknown Device",
                        y: Number(d.y ?? 0)
                    }))
                    setDeviceData(formatted)
                } else {
                    console.error("Failed to fetch most used devices:", res.error)
                    setDeviceData([])
                }
            }
        
        } catch (err) {
            console.error("Error fetching graphs:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGraphs()
        
    }, [userId, deviceId, range, fetchUsage, fetchDevices])

    return { usageData, deviceData, loading }
}