import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import { stateColors } from './utils'
import { BootstrapInput } from './utils'
import { tab3UnitMapping } from './utils'

import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'

const mappingWords = {
  CVD_NC: 'COVID new cases',
  ENT_ATT: 'Entertainment attendance',
  EMP_EPR: 'Employment population ratio',
  HOS_DOM: 'Housing days on market',
  HOS_NL: 'Housing new listings',
  TRS_ADD: 'Flight departure delay',
  TRS_GAS: 'Gasoline consumption',
}

const Tab3Charts = ({ fetchData }) => {
  const perspectiveArr = Array.from(
    new Set(fetchData.map((d) => d.pers))
  ).sort()
  const clusterArr = (perspective) =>
    fetchData
      .find((x) => x.pers === perspective)
      .pers_data.map((m) => m.cluster)
      .sort()

  const [perspective, setPerspective] = useState('CVD_NC')
  const [cluster, setCluster] = useState(clusterArr(perspective)[0])

  const handlePChange = (event) => {
    setPerspective(event.target.value)
    setCluster(clusterArr(perspective)[0])
  }
  const handleSChange = (event) => setCluster(event.target.value)

  const data = fetchData
    .find((x) => x.pers === perspective)
    .pers_data.find((y) => y.cluster === +cluster).cluster_data
  const des = fetchData.find((x) => x.pers === perspective).pers_doc

  let minY = 0.8
  const result = []
  const getNested = (d) => {
    const stateData = []
    d.state_data.forEach((s) => {
      const v = s.value
      minY = v < minY ? v : minY
      stateData.push([new Date(s.Record_time).getTime(), `${v}`])
    })
    return stateData
  }
  data.forEach((d) => {
    result.push({
      name: `${d.state}`,
      data: getNested(d),
    })
  })

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
    // grid: {
    //   padding: {
    //     left: 90,
    //   },
    // },
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
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      min: minY,
      tickAmount: 4,
      title: {
        text: `${tab3UnitMapping[perspective]}`,
      },
      labels: {
        formatter: function (val, index) {
          if (parseInt(val) >= 1000) {
            return val
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          return val.toFixed(2)
        },
        offsetX: 9,
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
    },
  }

  return (
    <>
      <div className='radio'>
        <div className='text'>
          perspective:{' '}
          <FormControl className={'drop-down'}>
            <NativeSelect
              value={perspective}
              onChange={handlePChange}
              input={<BootstrapInput />}
            >
              {perspectiveArr.map((p) => {
                return <option value={p}>{mappingWords[p]}</option>
              })}
            </NativeSelect>
          </FormControl>
        </div>
        <div className='text'>
          cluster:{' '}
          <FormControl className={'drop-down'}>
            <NativeSelect
              value={cluster}
              onChange={handleSChange}
              input={<BootstrapInput />}
            >
              {clusterArr(perspective).map((p) => {
                return <option value={p}>{p}</option>
              })}
            </NativeSelect>
          </FormControl>
        </div>
      </div>
      <div className='text'>{des}</div>
      <Chart options={option} series={result} type='line' width='75%' />
    </>
  )
}

export default Tab3Charts
