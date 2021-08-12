/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

import { csv } from 'd3'

const LoadingStatus = {
  NOT_STARTED: 'not started',
  LOADING: 'loading',
  FAILED: 'failed',
  SUCCEEDED: 'succeeded',
}

const fetchData = (file) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(LoadingStatus.NOT_STARTED)

  const isCSV = file.toString().split('.').pop() === 'csv'
  useEffect(() => {
    setLoading(LoadingStatus.LOADING)
    if (isCSV) {
      csv(file).then((data) => {
        setData(data)
        setLoading(LoadingStatus.SUCCEEDED)
      })
    } else {
      fetch(file).then((data) => {
        setData(file.summary)
        setLoading(LoadingStatus.SUCCEEDED)
      })
    }
  }, [file])

  return { data, loading }
}

export default fetchData
