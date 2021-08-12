import { withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'

export const mappingWords = {
  covid19: 'COVID new cases',
  clustering: 'COVID new cases',
  EMP_EPR: 'Employment population ratio',
  ENT_ATT: 'Entertainment attendance',
  HOS_NL: 'Housing new listings',
  HOS_DOM: 'Housing days on market',
  TRS_GAS: 'Gasoline consumption',
  TRS_ADD: 'Flight departure delay',
}

export const unitMapping = {
  clustering: 'Cases',
  similarity: 'Cases',
  covid19: 'Cases',
  CVD_NC: 'Cases',
  EMP_EPR: 'Percentage',
  ENT_ATT: 'Relative change',
  HOS_NL: 'Cases',
  HOS_DOM: 'Days',
  TRS_GAS: 'Gallon',
  TRS_ADD: 'Minutes',
}

export const tab3UnitMapping = {
  clustering: 'Cases',
  similarity: 'Cases',
  covid19: 'Cases',
  CVD_NC: 'Cases',
  EMP_EPR: 'Relative change',
  ENT_ATT: 'Relative change',
  HOS_NL: 'Relative change',
  HOS_DOM: 'Relative change',
  TRS_GAS: 'Relative change',
  TRS_ADD: 'Relative change',
}

export const stateColors = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
]

export const groupBy = (data, key1, key2) => {
  let reduceData = data.reduce((rv, x) => {
    const k1 = x[key1]
    rv[k1] = rv[k1] || []

    if (rv[k1]) {
      rv[k1].push([new Date(x.Record_time).getTime(), +x.value])
    }
    return rv
  }, {})
  return reduceData
}

export const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase)
