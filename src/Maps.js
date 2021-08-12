import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import usAll from './usAll'
import Slider from '@material-ui/core/Slider'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

require('highcharts/modules/map')(Highcharts)

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      track: {
        color: 'blue',
      },
      rail: {
        color: 'white',
      },
      markLabelActive: {
        color: 'white',
      },
      markLabel: {
        color: 'white',
      },
    },
  },
})

const Maps = ({ fetchData, view }) => {
  const uniqueTime = Array.from(
    new Set(fetchData.map((d) => d.Record_time))
  ).sort((a, b) => new Date(a) - new Date(b))

  const [time, setTime] = useState(uniqueTime[0])
  const [val, setVal] = useState(uniqueTime[0])
  const toTime = 106 / uniqueTime.length

  const updateRange = (e, data) => {
    setVal(data)
    setTime(uniqueTime[Math.round(data / toTime)])
  }

  const getOptions = (time) => {
    const data = []

    fetchData
      .filter((d) => d.Record_time === time)
      .forEach(function (d) {
        data.push([d['us-abbr'], +d['value'], d['Record_time']])
      })

    return {
      title: {
        text: `${view} for ${time}`,
      },
      plotOptions: {
        map: {
          states: {
            hover: {
              color: '#EEDD66',
            },
          },
        },
      },
      colorAxis: {
        min: 0,
        minColor: '#EEEEFF',
        maxColor: '#000022',
        stops: [
          [0, '#EFEFFF'],
          [0.67, '#4444FF'],
          [1, '#000022'],
        ],
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },
      subtitle: {
        floating: true,
        align: 'right',
        y: 50000,
        style: {
          fontSize: '16px',
        },
      },
      series: [
        {
          mapData: usAll,
          data: data,
          name: 'USA',
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
        },
      ],
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom',
        },
      },
    }
  }

  const marks = []
  for (var i = 0; i <= uniqueTime.length - 1; i++) {
    marks.push({
      value: i * toTime,
      label: `${new Date(uniqueTime[i]).getMonth() + 1}/${new Date(
        uniqueTime[i]
      ).getFullYear()}`,
    })
  }

  return (
    <>
      <HighchartsReact
        constructorType={'mapChart'}
        highcharts={Highcharts}
        options={getOptions(time)}
      />
      <div className='text'>slide to see dynamic data</div>
      <ThemeProvider theme={muiTheme}>
        <Slider
          defaultValue={uniqueTime[0]}
          valueLabelFormat={(v) => {
            let i = marks.findIndex((mark) => mark.value === v)
            i = i > 0 ? i : i + 1
            return marks[i].label
          }}
          getAriaValueText={(v) => `${v}`}
          aria-labelledby='discrete-slider-restrict'
          step={null}
          valueLabelDisplay='auto'
          marks={marks}
          value={val}
          onChangeCommitted={updateRange}
        />
      </ThemeProvider>
    </>
  )
}

export default Maps
