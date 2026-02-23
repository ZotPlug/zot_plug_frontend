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
}

export default function MostUsedDevicesGraph({ data }: Props) {
    return (
        <VictoryChart 
            theme={VictoryTheme.clean} 
            width={800}
            height={300}
            domainPadding={{ x: 30, y: 20 }}
        >
            <VictoryAxis 
                label="Device" 
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
                    data: { fill: "#10b981", width: 15 }
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
  )
}