import {
  LOAD_STOCK_STATISTICS_REQUEST,
  LOAD_STOCK_STATISTICS_SUCCESS,
  LOAD_STOCK_STATISTICS_ERROR,
  UPDATE_STOCK_STATISTICS_REQUEST,
  UPDATE_STOCK_STATISTICS_SUCCESS,
  UPDATE_STOCK_STATISTICS_ERROR,
  UPDATE_LAST_FETCHED_TIME
} from '../../constants'

export function loadStockStatistics () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    const { offset } = getState().fetchedData.stockStatistics
    dispatch({ type: LOAD_STOCK_STATISTICS_REQUEST })
    return axios.get(`${protocol}://${host}/api/companies`, {
      params: {
        offset
      }
    })
    .then(res => {
      dispatch({
        type: LOAD_STOCK_STATISTICS_SUCCESS,
        data: res.data.rows,
        totalInDB: res.data.count,
        lastFetched: new Date()
      })
    })
    .catch(error => {
      dispatch({
        type: LOAD_STOCK_STATISTICS_ERROR,
        error: error
      })
    })
  }
}

export function updateStockStatistics () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    const dataLength = getState().fetchedData.stockStatistics.data.length
    dispatch({ type: UPDATE_STOCK_STATISTICS_REQUEST })
    return axios.get(`${protocol}://${host}/api/companies`, {
      params: {
        offset: 0,
        limit: dataLength
      }
    })
    .then(res => {
      dispatch({
        type: UPDATE_STOCK_STATISTICS_SUCCESS,
        data: res.data.rows,
        totalInDB: res.data.count,
        lastFetched: new Date(),
        offset: dataLength
      })
    })
    .catch(error => {
      dispatch({
        type: UPDATE_STOCK_STATISTICS_ERROR,
        error: error
      })
    })
  }
}

export function updateLastFetchedTime (value) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_LAST_FETCHED_TIME,
      data: value
    })
  }
}
