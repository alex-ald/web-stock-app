import {
  UPDATE_TABLE_ORDER_HEADER
} from '../../constants'

export function updateOrderByHeader (headerName) {
  return (dispatch, getState) => {
    var isAscending = true
    if (headerName === getState().tableUtils.orderBy) {
      isAscending = !getState().tableUtils.isAscending
    }
    dispatch({
      type: UPDATE_TABLE_ORDER_HEADER,
      orderBy: headerName,
      isAscending: isAscending
    })
  }
}
