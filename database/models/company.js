import { getRandomValue, createRandomPriceDb } from '../utils'

module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stockName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    getterMethods: {
      // If company contains today's price then return it
      todaysPrice: function () {
        if (!this.Prices) return 0.00

        if (this.Prices.length > 0) {
          return this.Prices[0].price
        }
      },
      // If company contains yesterday's price then return it
      yesterdaysPrice: function () {
        if (!this.Prices) return 0.00

        if (this.Prices.length >= 2) {
          return this.Prices[1].price
        }
      },
      // If company contains today's and yesterday's price then calculate the change in price and return it
      priceChange: function () {
        if (!this.Prices) return 0.00

        if (this.Prices.length >= 2) {
          return parseFloat((this.todaysPrice - this.yesterdaysPrice).toFixed(2))
        } else {
          return 0.00
        }
      },
      // If company contains today's and yesterday's price then calculate percentage of change in price and return it
      priceChangePercentage: function () {
        if (!this.Prices) return 0.00

        if (this.Prices.length >= 2) {
          return parseFloat(((this.priceChange / this.yesterdaysPrice) * 100).toFixed(2))
        } else {
          return 0.00
        }
      }
    },
    classMethods: {
      associate: function(models) {
        Company.hasMany(models.Price)
      },
      // obtain a random list of companies and generate a new random price for them
      generateRandomCompanyPrices: function (db) {
        return new Promise(function(resolve, reject) {
          db.Company.findAll({
          order: [ db.Sequelize.fn('RAND')],
          limit: Math.floor(getRandomValue(0, 20))
        })
          .then(function(companies) {
            // get array of all db calls for new company prices
            let dbCalls = []
            companies.forEach(company => {
              dbCalls.push(createRandomPriceDb(db, company.id))
            })
            // perform all db calls
            Promise.all(dbCalls)
              .then(() => {
                console.log('new company prices have been created, total: ' + dbCalls.length)
                resolve()
              })
              .catch((err) => {
                console.log('error when creating new company prices')
                reject()
              })
          })
        })
      }
    }
  })
  return Company
}
