import {
  LOAD_STOCK_STATISTICS_REQUEST,
  LOAD_STOCK_STATISTICS_SUCCESS,
  LOAD_STOCK_STATISTICS_ERROR,
  UPDATE_STOCK_STATISTICS_REQUEST,
  UPDATE_STOCK_STATISTICS_SUCCESS,
  UPDATE_STOCK_STATISTICS_ERROR,
  UPDATE_LAST_FETCHED_TIME
} from '../../constants'

export function loadStockStatistics (isSorting = false) {
  console.log(isSorting)
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    const { offset, data } = getState().fetchedData.stockStatistics
    const { orderBy, isAscending } = getState().tableUtils
    dispatch({ type: LOAD_STOCK_STATISTICS_REQUEST })
    return axios.get(`${protocol}://${host}/api/companies`, {
      params: {
        offset: (isSorting ? 0 : offset),
        limit: data.length,
        orderBy,
        isAscending
      }
    })
    .then(res => {
      dispatch({
        type: LOAD_STOCK_STATISTICS_SUCCESS,
        data: (isSorting ? res.data.rows : data.concat(res.data.rows)),
        totalInDB: res.data.count,
        offset: (isSorting ? offset : offset + res.data.rows.length)
      })
    })
    .catch(error => {
      console.log(error)
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
    const { orderBy, isAscending } = getState().tableUtils
    dispatch({ type: UPDATE_STOCK_STATISTICS_REQUEST })
    return axios.get(`${protocol}://${host}/api/companies`, {
      params: {
        offset: 0,
        limit: dataLength,
        orderBy,
        isAscending
      }
    })
    .then(res => {
      dispatch({
        type: UPDATE_STOCK_STATISTICS_SUCCESS,
        data: res.data.rows,
        totalInDB: res.data.count,
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
