'use client'

import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryScatter } from "victory"
import { Colors } from "ui/colors"
import { Text, StyleSheet } from 'react-native'


interface MostUsedDevicesProps {
    data: { x: string; y: number }[]
    range: '24h' | '7d' | '30d'
}

export default function MostUsedDevicesGraph({ data, range }: MostUsedDevicesProps) {
    const rangeLabel = range === '24h' ? '24 hours' : range === '7d' ? '7 days' : '30 days'
    
    const description = `Total energy consumption over the past ${rangeLabel} across my most used devices`

    return (
        <div style={styles.graphContainer}>
            <VictoryChart 
                theme={VictoryTheme.clean} 
                height={250}
                padding={{
                    top: 0,
                    bottom: 60,
                    right: 20,
                    left: 60
                }}
                domainPadding={{ x: 30, y: 20 }}
            >
                <VictoryAxis 
                    label="My Devices"
                    style={{
                        axisLabel: { padding: 40, fontSize: 14, fontWeight: 600 },
                        tickLabels: { fontSize: 10, angle: -15, padding: 5 }
                    }}  
                />
                <VictoryAxis
                    dependentAxis
                    label="Energy (kWh)"
                    style={{
                        axisLabel: { padding: 42, fontSize: 14, fontWeight: 600 },
                        tickLabels: { fontSize: 10 }
                    }}
                />
                <VictoryBar
                    data={data}
                    x='x'
                    y='y'
                    style={{
                        data: { fill: Colors.BCGrad2, width: 50 }
                    }}
                />
                <VictoryScatter
                    data={data}
                    x="x"
                    y="y"
                    size={4}
                    style={{data: { fill: Colors.P1 } }}
                    labels={({ datum }) => `${datum.y.toFixed(3)} kWh`}
                    labelComponent={<VictoryTooltip />}
                />
            </VictoryChart>
            
            <Text style={styles.graphDescription}>
                {description}
            </Text>
        </div>
    )
}

const styles = StyleSheet.create({
    graphContainer: {
        height: '100%',
        width: '100%',
        minHeight: 180,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    graphDescription: {
        color: Colors.S1,
        fontWeight: 400,
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: 'center',
    }
})