'use client'

import { VictoryChart, VictoryArea, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryScatter } from "victory"
import { Colors } from "ui/colors"
import { Text, StyleSheet } from 'react-native'
import SharedH5 from "ui/info/text/shared_h5"

interface UsageStatsProps {
    data: { x: number; y: number }[]
    range: '24h' | '7d' | '30d'
    title: string,
    showDescription?: boolean
}

export default function UsageStatisticsGraph({ data, range, title, showDescription=true }: UsageStatsProps) {
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
    
    const description = `Total energy consumption over the past ${rangeLabel} (${title})`

    return (
        <div style={styles.graphContainer}>
            <VictoryChart 
                theme={VictoryTheme.clean}  
                height={250}
                padding={{ top: 0, bottom: 60, right: 20, left: 60}}
                domain={{ 
                    x: [0, domainMax], 
                    y: [0, paddedMaxY] 
                }}   
            >  
                <VictoryAxis 
                    tickValues={tickValues}
                    tickFormat={tickFormat}
                    label={xLabel} 
                    orientation="bottom"
                    style={{
                        axisLabel: { padding: 40, fontSize: 14, fontWeight: 600 },
                        tickLabels: { fontSize: 10, angle: -45, padding: 10 }
                    }}    
                />
                <VictoryAxis 
                    dependentAxis 
                    label="Energy (kWh)" 
                    orientation="left"
                    tickFormat={(t) => t.toFixed(2)}
                    style={{
                        axisLabel: { padding: 42, fontSize: 14, fontWeight: 600 },
                        tickLabels: { fontSize: 10 }
                    }}
                />
                <VictoryArea
                    data={data}
                    interpolation="linear"
                    style={{
                        data: {
                            fill: Colors.BCGrad2,
                            stroke: Colors.BCGrad2,
                            fillOpacity: 0.4,
                        }
                    }}
                />
                <VictoryScatter
                    data={data}
                    size={4}
                    style={{ data: { fill: Colors.P1 } }}
                    labels={({ datum }) => `${datum.y.toFixed(3)} kWh`}
                    labelComponent={<VictoryTooltip />}
                />
            </VictoryChart>
            {showDescription ? 
                <Text style={styles.graphDescription}>
                    {description}
                </Text>
                :
                <div></div>
            }

        </div>
    );
}

const styles = StyleSheet.create({
    graphContainer: {
        width: '100%',
        height: '100%',
        minHeight: 250,
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