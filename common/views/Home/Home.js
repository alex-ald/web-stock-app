import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { Header, StockTable, Footer } from './components'
import { loadStockStatistics, updateStockStatistics } from '../../reducers/fetchedData/actions'
import { updateOrderByHeader } from '../../reducers/tableUtils/actions'

const mapStateToProps = (state) => ({
  data: state.fetchedData.stockStatistics.data,
  isLoading: state.fetchedData.stockStatistics.isLoading,
  error: state.fetchedData.stockStatistics.error,
  lastFetched: moment(state.fetchedData.stockStatistics.lastFetched),
  totalInDB: state.fetchedData.stockStatistics.totalInDB,
  orderBy: state.tableUtils.orderBy,
  isAscending: state.tableUtils.isAscending
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadStockStatistics: (isSorting) => {
      dispatch(loadStockStatistics(isSorting))
    },
    updateStockStatistics: () => {
      dispatch(updateStockStatistics())
    },
    updateOrderByHeader: (headerName) => {
      dispatch(updateOrderByHeader(headerName))
    }
  }
}

class Home extends React.Component {
  componentDidMount () {
    this.props.loadStockStatistics()

    var socket = io()
    socket.emit('test', 'hello from client!')

    socket.on('new-data', () => {
      this.props.updateStockStatistics()
    })
  }

  handleShowMore () {
    if (!this.props.isLoading) {
      this.props.loadStockStatistics()
    }
  }

  // determines the class for the element by checking if price is positive or negative
  getPriceChangeClass (priceChange) {
    if (priceChange > 0) {
      return 'positive-price-change'
    } else if (priceChange < 0) {
      return 'negative-price-change'
    } else {
      return null
    }
  }

  filterTable (headerName) {
    console.log('filtering...')
    console.log(headerName)
    this.props.updateOrderByHeader(headerName)
    this.props.loadStockStatistics(true)
  }

  render () {
    let { data, lastFetched, loadStockStatistics, totalInDB, isLoading, orderBy, isAscending } = this.props
    let showMoreBtnText = 'SHOW MORE'
    if (isLoading) {
      showMoreBtnText = <img src='loading.svg' alt='Loading' />
    }
    let fetchedDate = (lastFetched.isValid() ? lastFetched.format('MMM. D, YYYY h:mm A') : '')
    return (
      <div>
        <div className='row'>
          <div className='col-xs'>
            <Header className='header-centered' />
          </div>
        </div>
        <div className='row center-xs'>
          <div className='col-xs-10 col-sm-7'>
            <p className='last-fetched-text'>
              <strong>last Fetched: </strong>
              { fetchedDate }
            </p>
            <StockTable
              className='stock-table'
              stockInfo={data}
              orderBy={orderBy}
              isAscending={isAscending}
              filterTable={this.filterTable.bind(this)}
              getPriceChangeClass={this.getPriceChangeClass} />
          </div>
        </div>
        { (totalInDB > data.length || isLoading) &&
          <div className='row center-xs'>
            <div className='col-xs-10 col-sm-7'>
              <button className='show-more-btn' onClick={this.handleShowMore.bind(this)}>
                { showMoreBtnText }
              </button>
            </div>
          </div>
        }
        <div className='row center-xs'>
          <div className='col-xs-10 col-sm-7'>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
