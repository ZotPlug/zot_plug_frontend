'use client'

import React from "react"
import { VictoryChart, VictoryLine, VictoryTheme } from "victory"

const series = [
  {
    name: "Canada",
    data: [
      3.9670002, 5.2650003, 6.201,
      7.8010006, 9.694, 11.214001,
      11.973001, 12.250001, 12.816001,
      13.413001, 13.626961, 14.30356,
      15.295461,
    ],
  },
];

// Timeline of power consumption across X hours/days/weeks is a area (maybe line) graph

export function TimelineGraph() {
  return (
    <VictoryChart
      theme={VictoryTheme.clean}
    >
      <VictoryLine
        data={series[0].data.map(
          (d, i) => ({
            x: i + 2010,
            y: d,
          }),
        )}
      />
    </VictoryChart>
  );
}

export default TimelineGraph