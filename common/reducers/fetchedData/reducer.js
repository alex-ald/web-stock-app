import {
  LOAD_STOCK_STATISTICS_REQUEST,
  LOAD_STOCK_STATISTICS_SUCCESS,
  LOAD_STOCK_STATISTICS_ERROR
} from '../../constants'

const initialState = {
  stockStatistics: {
    data: [],
    isLoading: false,
    lastFetched: null,
    error: null
  }
}

export default function fetchedData (state = initialState, action) {
  switch (action.type) {
    case LOAD_STOCK_STATISTICS_REQUEST:
      return { ...state,
        stockStatistics: { ...state.stockStatistics,
          isLoading: true
        }
      }
    case LOAD_STOCK_STATISTICS_SUCCESS:
      return { ...state,
        stockStatistics: { ...state.stockStatistics,
          data: action.data,
          lastFetched: new Date(),
          error: null,
          isLoading: false
        }
      }
    case LOAD_STOCK_STATISTICS_ERROR:
      return { ...state,
        stockStatistics: { ...state.stockStatistics,
          error: action.data,
          isLoading: false
        }
      }
    default:
      return state
  }
}
