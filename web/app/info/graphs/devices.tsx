'use client'

import { VictoryBar, VictoryChart, VictoryTheme } from "victory"

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

// Most Used Devices Graph is a bar graph

export function MostUsedDevicesGraph() {
    return (
        <VictoryChart
        theme={VictoryTheme.clean}
        width={400}
        height={250}
        >
            <VictoryBar
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

export default MostUsedDevicesGraph