'use client'

import { 
    VictoryChart, 
    VictoryBar, 
    VictoryTheme, 
    VictoryAxis,
    VictoryTooltip,
    VictoryScatter
} from "victory"

interface Props {
    data: { x: string; y: number }[]
    range: '24h' | '7d' | '30d'
}

export default function MostUsedDevicesGraph({ data, range }: Props) {
    const rangeLabel = range === '24h' ? '24 hours' : range === '7d' ? '7 days' : '30 days'

    return (
        <div style={{ width: "100%" }}>
            <VictoryChart 
                theme={VictoryTheme.clean} 
                height={300}
                width={undefined}
                domainPadding={{ x: 30, y: 20 }}
                // animate={{
                //     duration: 500,
                //     easing: "quadInOut"
                // }}
            >
                <VictoryAxis 
                    label="My Devices" 
                    style={{
                        axisLabel: { padding: 40, fontSize: 14, fontWeight: 600 },
                        tickLabels: { fontSize: 12, angle: -15, padding: 5 }
                    }}  
                />
                <VictoryAxis
                    dependentAxis
                    label="Energy (kWh)"
                    style={{
                        axisLabel: { padding: 40, fontSize: 14, fontWeight: 600 },
                        tickLabels: { fontSize: 10 }
                    }}
                />
                <VictoryBar
                    data={data}
                    x='x'
                    y='y'
                    style={{
                        data: { fill: "#10b981", width: 25 }
                    }}
                />
                <VictoryScatter
                    data={data}
                    x="x"
                    y="y"
                    size={4}
                    style={{data: { fill: "#065f46" } }}
                    labels={({ datum }) => `${datum.y.toFixed(3)} kWh`}
                    labelComponent={<VictoryTooltip />}
                />
            </VictoryChart>

            <h3 style={{ textAlign: "center", marginTop: 2, width: "100%", color: "black", wordWrap: 'break-word' }}>
                Total energy consumption over the past {rangeLabel} across my most used devices
            </h3>
        </div>
    )
}