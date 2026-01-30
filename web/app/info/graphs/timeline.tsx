'use client'

import { VictoryChart, VictoryArea, VictoryTheme, VictoryLabel, VictoryAxis } from "victory"

const series = [{
    name: "Canada",
    data: [
        396.70002, 526.50003, 62.01,
        780.10006, 96.94, 112.14001,
        119.73001, 122.50001, 12.816001,
    ],
},
];

export function TimelineGraph() {
    return (
        <VictoryChart
            theme={VictoryTheme.clean}
            width={400}
            height={250}
            padding={{
                top: 50,
                left: 70,
                right: 50,
                bottom: 100,
            }}
        >
            <VictoryLabel
                text={"Timeline"}
                x={80}
                y={20}
                textAnchor={"middle"}
                style={{
                    ...VictoryTheme.clean.label,
                    fontSize: 16,
                }}
            />

            <VictoryAxis
                label={"Total power consumption over the past 24 hours"}
                tickValues={[0, 6, 12, 18, 24]}
                style={{
                    tickLabels: { fontSize: 12 },
                    ticks: {
                        stroke: "#757575",
                        strokeWidth: 1,
                    },
                }}
            />

            <VictoryAxis
                dependentAxis
                label={"Power (W)"}
                tickValues={[0, 150, 300, 450, 600]}
                tickFormat={(value) => `${value} W`}
                style={{
                    axis: { stroke: "transparent" },
                    axisLabel: { fontSize: 8, padding: 40 },
                    tickLabels: { fontSize: 8 },
                    grid: {
                        stroke: "#d9d9d9",
                        strokeWidth: 1,
                    },
                }}
            />

            <VictoryArea
                data={series[0].data.map((d, i) => ({
                    x: i + 10,
                    y: d,
                }))}
                interpolation={"natural"}
            />
        </VictoryChart>
    );
}

export default TimelineGraph