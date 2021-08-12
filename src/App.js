import React, { useEffect, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import { BootstrapInput } from './utils'
import { mappingWords } from './utils'

import './App.css'
import Header from './Header'
import Tab2Charts from './Tab2Charts'
import Tab3Charts from './Tab3Charts'
import Tab3Radar from './Tab3Radar'
import Tab3Similarity from './Tab3Similarity'

import Maps from './Maps'
import fetchData from './fetch'
import covidFile from './data/Tab1_covid.csv'
import employmentFile from './data/Tab1_employment.csv'
import entertainmentFile from './data/Tab1_entertainment.csv'
import housingNLFile from './data/Tab1_housing_NL.csv'
import housingDOMFile from './data/Tab1_housing_DOM.csv'
import transportationADDFile from './data/Tab1_transportation_add.csv'
import transportationGASFile from './data/Tab1_transportation_gas.csv'

import clusteringFile from './data/Tab3_clustering.json'
import tab3SimilarityFile from './data/Tab3_similarity_final.json'
import robustness from './data/Tab3_robustness_scaled.csv'

function App() {
  const [file, setFile] = useState(covidFile)
  const { data, loading } = fetchData(file)
  const { data: similarityData, loading: similarityLoading } = fetchData(
    tab3SimilarityFile
  )
  const { data: clusteringData, loading: clusteringLoading } = fetchData(
    clusteringFile
  )
  const [tab, setTab] = useState('0')
  const [view, setView] = useState('covid19')

  useEffect(() => {
    if (tab === '2') {
      setView('clustering')
    }
  }, [tab])

  const tabOnClick = (tabNumber) => {
    switch (tabNumber) {
      case 0:
        setFile(covidFile)
        setTab('0')
        break
      case 1:
        setFile(covidFile)
        setTab('1')
        break
      case 2:
        setFile(clusteringFile)
        setTab('2')
        break
      default:
    }
  }

  const perspectiveArr = {
    covid19: covidFile,
    EMP_EPR: employmentFile,
    ENT_ATT: entertainmentFile,
    HOS_NL: housingNLFile,
    HOS_DOM: housingDOMFile,
    TRS_GAS: transportationGASFile,
    TRS_ADD: transportationADDFile,
  }

  const handleChange = (event) => {
    const v = event.target.value
    setView(v)
    setFile(perspectiveArr[v])
  }

  return (
    <div className='App'>
      <div className='topBar'>
        <Header />
        <div className='buttonGroup'>
          <button
            className={tab === '0' && 'selected'}
            onClick={() => tabOnClick(0)}
          >
            Data by states
          </button>
          <button
            className={tab === '1' && 'selected'}
            onClick={() => tabOnClick(1)}
          >
            Data by life perspectives
          </button>
          <button
            className={tab === '2' && 'selected'}
            onClick={() => tabOnClick(2)}
          >
            Analysis results
          </button>
        </div>
      </div>
      <div className='graphs'>
        {loading === 'loading' && <div className='text'>loading...</div>}
        {data && tab === '0' && (
          <div>
            <FormControl className={'drop-down'}>
              <NativeSelect
                value={view}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                {Object.keys(perspectiveArr).map((p) => {
                  return <option value={p}>{mappingWords[p]}</option>
                })}
              </NativeSelect>
            </FormControl>
            {loading === 'succeeded' && (
              <Maps fetchData={data} view={mappingWords[view]} />
            )}
          </div>
        )}
        {data && tab === '1' && (
          <div>
            <FormControl className={'drop-down'}>
              <NativeSelect
                value={view}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                {Object.keys(perspectiveArr).map((p) => {
                  return <option value={p}>{mappingWords[p]}</option>
                })}
              </NativeSelect>
            </FormControl>
            {loading === 'succeeded' && (
              <Tab2Charts fetchData={data} view={view} />
            )}
          </div>
        )}
        {data && tab === '2' && (
          <div>
            <div className='radioGroup'>
              <div className='radio'>
                <input
                  type='radio'
                  value='clustering'
                  name='radio'
                  defaultChecked
                  onChange={() => {
                    setView('clustering')
                    setFile(clusteringFile)
                  }}
                />{' '}
                <div className='text'>clustering</div>
              </div>
              <div className='radio'>
                <input
                  type='radio'
                  value='similarity'
                  name='radio'
                  onChange={() => {
                    setFile(tab3SimilarityFile)
                    setView('similarity')
                  }}
                />{' '}
                <div className='text'>similarity</div>
              </div>
              <div className='radio'>
                <input
                  type='radio'
                  value='robustness'
                  name='radio'
                  onChange={() => {
                    setView('robustness')
                    setFile(robustness)
                  }}
                />{' '}
                <div className='text'>robustness</div>
              </div>
            </div>
            {view !== 'similarity' &&
              view !== 'robustness' &&
              clusteringLoading === 'succeeded' && (
                <div>{<Tab3Charts fetchData={clusteringData} />}</div>
              )}
            {loading === 'succeeded' && (
              <>{view === 'robustness' && <Tab3Radar fetchData={data} />}</>
            )}
            {view === 'similarity' && similarityLoading === 'succeeded' && (
              <Tab3Similarity data={similarityData} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
