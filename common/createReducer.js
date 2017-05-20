import { combineReducers } from 'redux'

const initialState = {
  host: '',
  protocol: ''
}
const sourceRequest = (state = initialState, action) => state

import fetchedData from './reducers/fetchedData/reducer'

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer () {
  return combineReducers({
    sourceRequest,
    fetchedData
  })
}
