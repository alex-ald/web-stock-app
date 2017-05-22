import React from 'react'

class StockTable extends React.Component {
  // add plus symbol to price if positive
  formatPriceChange (priceChange) {
    if (priceChange > 0) {
      return '+' + priceChange
    } else {
      return priceChange
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

  filterTable () {
    console.log('filtering...')
  }

  render () {
    let { className, stockInfo } = this.props

    let tableRows = []
    stockInfo.map((company, i) => {
      let priceChangeClass = this.getPriceChangeClass(company.priceChange)
      // create all rows for the table
      tableRows.push(
        <tr key={i}>
          <td data-header='Stock Code'>{company.stockName}</td>
          <td data-header='Company Name'><a href={company.url} target='blank'>{company.name}</a></td>
          <td data-header="Today's Price">{'$' + (company.todaysPrice || '0.00')}</td>
          <td data-header='Price Change ($)' className={priceChangeClass}>{this.formatPriceChange((company.priceChange.toFixed(2) || '0.00'))}</td>
          <td data-header='Price Change (%)' className={priceChangeClass}>{(company.priceChangePercentage.toFixed(2) || '0.00') + '%'}</td>
        </tr>
      )
    })

    return (
      <table className={className}>
        <tr>
          <th><a>Stock Code</a></th>
          <th><a>Company Name</a></th>
          <th><a>Today's Price</a></th>
          <th><a>Price Change ($)</a></th>
          <th><a>Price Change (%)</a></th>
        </tr>
        { tableRows }
      </table>
    )
  }
}

export default StockTable
