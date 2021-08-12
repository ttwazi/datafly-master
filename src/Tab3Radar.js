import React, { useState } from 'react'
import Radar from 'react-apexcharts'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import { BootstrapInput } from './utils'

const Tab3Radar = ({ fetchData }) => {
  const [state, setState] = useState(['California'])

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const result = []
  fetchData.forEach((e) => {
    result.push({
      name: e.States,
      data: [e.HOS_DOM, e.HOS_NL, e.EMP_EPR, e.TRS_GAS, e.TRS_ADD, e.ENT_ATT],
      robustness: e.Robustness,
    })
  })

  const stateArr = Array.from(new Set(result.map((d) => d.name))).sort(
    (a, b) => new Date(a) - new Date(b)
  )

  const options = {
    chart: {
      height: 200,
      type: 'radar',
    },
    title: {
      text: 'Please select states',
      style: {
        color: '#fff',
      },
    },
    legend: {
      labels: {
        colors: '#fff',
      },
    },
    xaxis: {
      categories: [
        'Housing days on market',
        'Housing new listings',
        'Employment population ratio',
        'Gasoline consumption',
        'Flight departure delay',
        'Entertainment attendance',
      ],
    },
    yaxis: {
      show: false,
      tooltip: {
        enable: true,
        offsetX: 0,
      },
    },
  }

  const getSeries = (state) => result.filter((d) => state.includes(d.name))

  const handleChange = (event) => setState(event.target.value)

  const newData = getSeries(state)

  return (
    <>
      <FormControl className={'drop-down'}>
        <Select
          labelId='demo-mutiple-checkbox-label'
          id='demo-mutiple-checkbox'
          multiple
          value={state}
          onChange={handleChange}
          input={<BootstrapInput />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {stateArr.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={state.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Radar options={options} series={newData} type='radar' width='60%' />
      <div className='radarLegendsGroup'>
        {newData.map((d) => {
          const data = d.data
          return (
            <div className='radarLegend'>
              <div>Name: {d.name}</div>
              <div>Robustness: {d.robustness}</div>
              <div>Housing days on market: {data[0]}</div>
              <div>Housing new listings: {data[1]}</div>
              <div>Employment population ratio: {data[2]}</div>
              <div>Gasoline Consumption: {data[3]}</div>
              <div>Flight departure delay: {data[4]}</div>
              <div>Entertainment attendance: {data[5]}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Tab3Radar
