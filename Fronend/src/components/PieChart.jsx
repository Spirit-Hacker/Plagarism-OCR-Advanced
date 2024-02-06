import React from 'react'
import Chart from "react-apexcharts"

const PieChart = ({data}) => {
  return (
    <div>
      <Chart
        type='pie'
        width={500}
        height={500}
        series={[data, 100 - data]}
        options={{
            labels: ["Plagarized", "Non-Plagarized"]
        }}
      >

      </Chart>
    </div>
  )
}

export default PieChart
