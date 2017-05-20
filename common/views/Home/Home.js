import React from 'react'
import { connect } from 'react-redux'

import { Header, StockTable } from './components'
import { loadStockStatistics } from '../../reducers/fetchedData/actions'

const mapStateToProps = (state) => ({
  data: state.fetchedData.stockStatistics.data,
  isLoading: state.fetchedData.stockStatistics.isLoading,
  error: state.fetchedData.stockStatistics.error,
  lastFetched: new Date(state.fetchedData.stockStatistics.lastFetched).toString().slice(0,21)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadStockStatistics: () => {
      dispatch(loadStockStatistics())
    }
  }
}

class Home extends React.Component {
  componentDidMount () {
    this.props.loadStockStatistics()
  }
  render () {
    let { data, lastFetched } = this.props
    return (
      <div>
        <div className='row'>
          <div className='col-xs'>
            <Header className='header-centered' />
          </div>
        </div>
        <div className='row center-xs'>
          <div className='col-xs-7'>
            <p className='last-fetched-text'>{'Last Fetched: ' + lastFetched}</p>
            <StockTable className='stock-table' stockInfo={data} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
