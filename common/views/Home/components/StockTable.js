import React from 'react'

class StockTable extends React.Component {
  formatPriceChange (priceChange) {
    if (priceChange > 0) {
      return '+' + priceChange
    } else {
      return priceChange
    }
  }

  getPriceChangeClass (priceChange) {
    if (priceChange > 0) {
      return 'positive-price-change'
    } else if (priceChange < 0) {
      return 'negative-price-change'
    } else {
      return null
    }
  }

  render () {
    let { className, stockInfo } = this.props

    let tableRows = []
    stockInfo.map((company, i) => {
      let priceChangeClass = this.getPriceChangeClass(company.priceChange)
      // create all rows for the table
      tableRows.push(
        <tr key={i}>
          <td>{company.stockName}</td>
          <td>{company.name}</td>
          <td>{company.price}</td>
          <td className={priceChangeClass}>{this.formatPriceChange(company.priceChange)}</td>
          <td className={priceChangeClass}>{company.priceChangePercentage + '%'}</td>
        </tr>
      )
    })

    return (
      <table className={className}>
        <tr>
          <th></th>
          <th>Company Name</th>
          <th>Today's Price</th>
          <th>Price Change (Since Yesterday)</th>
          <th>Change %</th>
        </tr>
        { tableRows }
      </table>
    )
  }
}

export default StockTable
