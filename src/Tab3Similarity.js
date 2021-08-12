import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import { BootstrapInput } from './utils'

const Tab3Similarity = ({ data }) => {
  const [method, setMethod] = useState('CPC')
  const [perspective, setPerspective] = useState(0)
  const [state, setState] = useState(0)
  const makeMethodArr = data.map((m) => m.similarity)
  const methodMapping = {
    CPC: 'Correlation of percentage change',
    DTW: 'Dynamic time warping',
  }
  const filterDataByMethod = data.filter((m) => m.similarity === method)[0]
    .similarity_data

  const perspectiveData = filterDataByMethod[0]
  const stateData = filterDataByMethod[1]

  const makePerspectiveArr = perspectiveData.supdata.map((s) => s.subname)

  const makeStateArr = stateData.supdata.map((s) => s.subname)

  const options = {
    legend: {
      labels: {
        colors: '#fff',
      },
    },
    chart: {
      height: 350,
      type: 'heatmap',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    colors: ['#008FFB'],
    xaxis: {
      labels: {
        style: {
          colors: '#fff',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff',
        },
      },
    },
  }

  const getOptions = (method) => {
    options['plotOptions'] =
      method === 'CPC'
        ? {
            heatmap: {
              radius: 0,
              colorScale: {
                ranges: [
                  {
                    from: -101,
                    to: -99,
                    name: 'No available data',
                    color: '#636363',
                  },
                  {
                    from: -1,
                    to: -0.7,
                    name: 'Strong negative correlation',
                    color: '#bd0026',
                  },
                  {
                    from: -0.69999999,
                    to: -0.4,
                    name: 'Moderate negative correlation',
                    color: '#fd8d3c',
                  },
                  {
                    from: -0.39999999,
                    to: 0,
                    name: 'Weak negative correlation',
                    color: '#fed976',
                  },
                  {
                    from: 0.00000001,
                    to: 0.4,
                    name: 'Weak positive correlation',
                    color: '#c6dbef',
                  },
                  {
                    from: 0.40000001,
                    to: 0.7,
                    name: 'Moderate positive correlation',
                    color: '#6baed6',
                  },
                  {
                    from: 0.70000001,
                    to: 1,
                    name: 'Strong positive correlation',
                    color: '#08519c',
                  },
                ],
              },
            },
          }
        : {
            heatmap: {
              radius: 0,
              colorScale: {
                ranges: [
                  {
                    from: -101,
                    to: -99,
                    name: 'No available data',
                    color: '#636363',
                  },
                  {
                    from: -21,
                    to: -11.5,
                    name: 'Weak similarity',
                    color: '#ffffb2',
                  },
                  {
                    from: -11.49999999,
                    to: -4.8,
                    name: 'Moderate similarity',
                    color: '#fd8d3c',
                  },
                  {
                    from: -4.79999999,
                    to: 0,
                    name: 'Strong similarity',
                    color: '#bd0026',
                  },
                ],
              },
            },
          }
    options['tooltip'] =
      method === 'CPC'
        ? {
            enabled: true,
            y: {
              formatter: function (value) {
                return `${value}`
              },
            },
          }
        : {
            enabled: true,
            y: {
              formatter: function (value) {
                if (value === -100) return `N/A`
                return `${value * -1}`
              },
            },
          }

    return options
  }
  const perspectiveSeries = (perspective) =>
    perspectiveData.supdata[perspective].subdata
  const stateSeries = (state) => stateData.supdata[state].subdata

  const handleMChange = (event) => setMethod(event.target.value)
  const handlePChange = (event) => setPerspective(event.target.value)
  const handleSChange = (event) => setState(event.target.value)

  return (
    <>
      <div className='text'>Method Selection:</div>
      <FormControl className={'drop-down'}>
        <NativeSelect
          value={method}
          onChange={handleMChange}
          input={<BootstrapInput />}
        >
          {makeMethodArr.map((p) => {
            return <option value={p}>{methodMapping[p]}</option>
          })}
        </NativeSelect>
      </FormControl>
      <div className='heatmap'>
        <div className='sub-heatmap'>
          <div className='text'>select perspective</div>
          <FormControl className={'drop-down'}>
            <NativeSelect
              value={perspective}
              onChange={handlePChange}
              input={<BootstrapInput />}
            >
              {makePerspectiveArr.map((p) => {
                return (
                  <option value={makePerspectiveArr.indexOf(p)}>{p}</option>
                )
              })}
            </NativeSelect>
          </FormControl>
          <Chart
            options={getOptions(method)}
            series={perspectiveSeries(perspective)}
            type='heatmap'
            width='150%'
            height={500}
          />
        </div>
        <div className='sub-heatmap'>
          <div className='text'>select state</div>
          <FormControl className={'drop-down'}>
            <NativeSelect
              value={state}
              onChange={handleSChange}
              input={<BootstrapInput />}
            >
              {makeStateArr.map((p) => {
                return <option value={makeStateArr.indexOf(p)}>{p}</option>
              })}
            </NativeSelect>
          </FormControl>
          <Chart
            options={getOptions(method)}
            series={stateSeries(state)}
            type='heatmap'
            width='150%'
            height={500}
          />
        </div>
        <div className='radarLegend'>
          <div>{makePerspectiveArr[0]}: COVID new cases</div>
          <div>{makePerspectiveArr[1]}: Entertainment attendance</div>
          <div>{makePerspectiveArr[2]}: Employment population ratio</div>
          <div>{makePerspectiveArr[3]}: Housing days on market</div>
          <div>{makePerspectiveArr[4]}: Housing new listings</div>
          <div>{makePerspectiveArr[5]}: Flight departure delay</div>
          <div>{makePerspectiveArr[6]}: Gasoline consumption</div>
        </div>
      </div>
    </>
  )
}

export default Tab3Similarity
