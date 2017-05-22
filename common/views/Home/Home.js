import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { Header, StockTable, Footer } from './components'
import { loadStockStatistics, updateStockStatistics } from '../../reducers/fetchedData/actions'

const mapStateToProps = (state) => ({
  data: state.fetchedData.stockStatistics.data,
  isLoading: state.fetchedData.stockStatistics.isLoading,
  error: state.fetchedData.stockStatistics.error,
  lastFetched: moment(state.fetchedData.stockStatistics.lastFetched),
  totalInDB: state.fetchedData.stockStatistics.totalInDB
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadStockStatistics: () => {
      dispatch(loadStockStatistics())
    },
    updateStockStatistics: () => {
      dispatch(updateStockStatistics())
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

  render () {
    let { data, lastFetched, loadStockStatistics, totalInDB, isLoading } = this.props
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
            <StockTable className='stock-table' stockInfo={data} />
          </div>
        </div>
        { totalInDB > data.length &&
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
