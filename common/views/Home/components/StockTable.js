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

  render () {
    let { className, stockInfo, getPriceChangeClass, filterTable, isAscending, orderBy } = this.props

    let tableRows = []
    stockInfo.map((company, i) => {
      let priceChangeClass = getPriceChangeClass(company.priceChange)
      // create all rows for the table
      tableRows.push(
        <tr key={i}>
          <td data-header='Stock Code'>{company.stockName}</td>
          <td data-header='Company Name'><a href={company.url} target='blank'>{company.name}</a></td>
          <td data-header="Today's Price">{'$' + (company.todaysPrice ? company.todaysPrice.toFixed(2) : '0.00')}</td>
          <td data-header='Price Change ($)' className={priceChangeClass}>{this.formatPriceChange((company.priceChange.toFixed(2) || '0.00'))}</td>
          <td data-header='Price Change (%)' className={priceChangeClass}>{(company.priceChangePercentage.toFixed(2) || '0.00') + '%'}</td>
        </tr>
      )
    })

    let orderByClass = (isAscending ? 'arrow up' : 'arrow down')

    return (
      <table className={className}>
        <tr>
          <th>
            <div key='stock code' data-sortable='true' onClick={filterTable.bind(this, 'stock code')}>
              <a>Stock Code</a>
              { orderBy === 'stock code' &&
                <div className={orderByClass}></div>
              }
            </div>
          </th>
          <th>
            <div name='name' data-sortable='true' onClick={filterTable.bind(this, 'name')}>
              <a>Company Name</a>
              { orderBy === 'name' &&
                <div className={orderByClass}></div>
              }
            </div>
          </th>
          <th>
            <div>
              <a>Today's Price</a>
            </div>
          </th>
          <th>
            <div>
              <a>Price Change ($)</a>
            </div>
          </th>
          <th>
            <div>
              <a>Price Change (%)</a>
            </div>
          </th>
        </tr>
        { tableRows }
      </table>
    )
  }
}

export default StockTable
