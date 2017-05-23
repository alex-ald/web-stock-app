import { combineReducers } from 'redux'

const initialState = {
  host: '',
  protocol: ''
}

// reducer holds url route for api requests
const sourceRequest = (state = initialState, action) => state

import fetchedData from './reducers/fetchedData/reducer'
import tableUtils from './reducers/tableUtils/reducer'

// add all reducers to the redux store
export default function createReducer () {
  return combineReducers({
    sourceRequest,
    fetchedData,
    tableUtils
  })
}
