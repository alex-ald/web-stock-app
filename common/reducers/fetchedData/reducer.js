import {
  LOAD_STOCK_STATISTICS_REQUEST,
  LOAD_STOCK_STATISTICS_SUCCESS,
  LOAD_STOCK_STATISTICS_ERROR,
  UPDATE_STOCK_STATISTICS_REQUEST,
  UPDATE_STOCK_STATISTICS_SUCCESS,
  UPDATE_STOCK_STATISTICS_ERROR,
  UPDATE_LAST_FETCHED_TIME
} from '../../constants'

const initialState = {
  stockStatistics: {
    data: [],
    isLoading: false,
    lastFetched: null,
    error: null,
    offset: 0,
    totalInDB: 1
  }
}

export default function fetchedData (state = initialState, action) {
  switch (action.type) {
    case LOAD_STOCK_STATISTICS_REQUEST:
      return { ...state,
        stockStatistics: {...state.stockStatistics,
          isLoading: true
        }
      }
    case LOAD_STOCK_STATISTICS_SUCCESS:
      return { ...state,
        stockStatistics: {...state.stockStatistics,
          data: action.data,
          lastFetched: new Date(),
          error: null,
          isLoading: false,
          offset: action.offset,
          totalInDB: action.totalInDB
        }
      }
    case LOAD_STOCK_STATISTICS_ERROR:
      return { ...state,
        stockStatistics: {...state.stockStatistics,
          error: action.data,
          isLoading: false
        }
      }
    case UPDATE_STOCK_STATISTICS_REQUEST:
      return { ...state,
        stockStatistics: {...state.stockStatistics,
          isLoading: true
        }
      }
    case UPDATE_STOCK_STATISTICS_SUCCESS:
      return { ...state,
        stockStatistics: {...state.stockStatistics,
          data: action.data,
          lastFetched: new Date(),
          error: null,
          isLoading: false,
          offset: action.offset,
          totalInDB: action.totalInDB
        }
      }
    case UPDATE_STOCK_STATISTICS_ERROR:
      return { ...state,
        stockStatistics: {...state.stockStatistics,
          error: action.error,
          isLoading: false
        }
      }
    case UPDATE_LAST_FETCHED_TIME:
      return {...state,
        stockStatistics: {...state.stockStatistics,
          lastFetched: action.data
        }
      }
    default:
      return state
  }
}
