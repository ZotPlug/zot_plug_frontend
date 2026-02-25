'use client'

import { 
    VictoryChart, 
    VictoryArea, 
    VictoryTheme,
    VictoryAxis,
    VictoryTooltip,
    VictoryScatter
} from "victory"

interface UsageStatsProps {
    data: { x: number; y: number }[]
    range: '24h' | '7d' | '30d'
    title: string
}

export default function UsageStatisticsGraph({ data, range, title }: UsageStatsProps) {
    let domainMax = 23
    let tickValues: number[] = []
    let tickFormat: (t: number) => string = (t) => `${t}`
    let xLabel = ""

    if (range === '24h') {
        domainMax = 23
        tickValues = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
        tickFormat = (t) => `${t}:00`
        xLabel = "Last 24 Hours"
    } else if (range === '7d') {
        domainMax = 6
        tickValues = [0, 1, 2, 3, 4, 5, 6]
        tickFormat = (t) => `Day ${t + 1}`
        xLabel = "Last 7 Days"
    }  else if (range === '30d') {
        domainMax = 29
        tickValues = [0, 4, 9, 14, 19, 24, 29]
        tickFormat = (t) => `Day ${t + 1}`
        xLabel = "Last 30 Days"
    }

    const maxY = Math.max(...data.map(d => d.y), 0)
    const rawMaxY = maxY * 1.15
    const paddedMaxY = Math.ceil(rawMaxY * 100) / 100
    const rangeLabel = range === '24h' ? '24 hours' : range === '7d' ? '7 days' : '30 days'

    return (
        <div style={{ width: "100%" }}>
            <h3 style={{ textAlign: "center", color: "black" }}>Device Name: {title}</h3>

            <VictoryChart 
                theme={VictoryTheme.clean}  
                height={300}
                width={undefined}
                domain={{ 
                    x: [0, domainMax], 
                    y: [0, paddedMaxY] 
                }}
                // animate={{
                //     duration: 500,
                //     easing: "quadInOut"
                // }}     
            >  
                <VictoryAxis 
                    tickValues={tickValues}
                    tickFormat={tickFormat}
                    label={xLabel} 
                    style={{
                        axisLabel: { padding: 40, fontSize: 14, fontWeight: 600 },
                        tickLabels: { fontSize: 10, angle: -45, padding: 10 }
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
                <VictoryArea
                    data={data}
                    interpolation="linear"
                    style={{
                        data: {
                            fill: '#4f46e5',
                            stroke: '#4f46e5',
                            fillOpacity: 0.4,
                        }
                    }}
                />
                <VictoryScatter
                    data={data}
                    size={4}
                    style={{ data: { fill: '#4f46e5' } }}
                    labels={({ datum }) => `${datum.y.toFixed(3)} kWh`}
                    labelComponent={<VictoryTooltip />}
                />

            </VictoryChart>

            <h3 style={{ textAlign: "center", marginTop: 12, width: "100%", color: "black", wordWrap: 'break-word' }}>
                Total energy consumption over the past {rangeLabel}
            </h3>
        </div>
    );
}