import {
  LOAD_STOCK_STATISTICS_REQUEST,
  LOAD_STOCK_STATISTICS_SUCCESS,
  LOAD_STOCK_STATISTICS_ERROR
} from '../../constants'

export function loadStockStatistics () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    dispatch({ type: LOAD_STOCK_STATISTICS_REQUEST })
    return axios.get(`${protocol}://${host}/api/companies`)
    .then(res => {
      dispatch({
        type: LOAD_STOCK_STATISTICS_SUCCESS,
        data: res.data,
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
