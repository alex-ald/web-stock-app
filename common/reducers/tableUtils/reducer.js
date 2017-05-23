import {
  UPDATE_TABLE_ORDER_HEADER
} from '../../constants'

const initialState = {
  orderBy: '',
  isAscending: null
}

export default function tableUtils (state = initialState, action) {
  switch (action.type) {
    case UPDATE_TABLE_ORDER_HEADER:
      return { ...state,
        orderBy: action.orderBy,
        isAscending: action.isAscending
      }
    default:
      return state
  }
}
