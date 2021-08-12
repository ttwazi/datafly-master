import React from 'react'
import Chart from 'react-apexcharts'
import { stateColors } from './utils'
import { groupBy } from './utils'
import { unitMapping } from './utils'

const Tab2Charts = ({ fetchData, view }) => {
  const nested_data = groupBy(fetchData, 'us-abbr', 'Record_time')

  const option = {
    chart: {
      id: 'chart2',
      type: 'line',
      height: 230,
      width: '100%',
      foreColor: '#ccc',
    },
    colors: stateColors,
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    tooltip: {
      theme: 'dark',
      followCursor: true,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        return (
          '<div class="arrow_box">' +
          '<span>' +
          w.globals.seriesNames[seriesIndex] +
          ': ' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        )
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
      title: {
        text: `${unitMapping[view]}`,
      },
      labels: {
        formatter: function (val, index) {
          if (parseInt(val) >= 1000) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          return val.toFixed(1)
        },
        offsetX: 9,
      },
    },
  }

  const result = Object.keys(nested_data).map((key) => {
    return {
      name: `${key}`,
      data: nested_data[key],
    }
  })

  return (
    <>
      <Chart options={option} series={result} type='line' width='75%' />
    </>
  )
}

export default Tab2Charts
