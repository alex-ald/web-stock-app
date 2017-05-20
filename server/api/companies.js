import { Router } from 'express'
import db from '../../database/models/'

const router = new Router()

// get all companies and their information
router.get('/', function(req, res) {
  var currentDate = new Date()
  db.Company.findAll({
    include: [{
      model: db.Price,
      where: {
        createdAt: {
          $lte: currentDate.setUTCHours(23,59,59,59),
          $gte: new Date(currentDate.setDate(currentDate.getDate()-1)).setUTCHours(0,0,0,0)
        }
      },
      order: 'Price.createdAt DESC',
      limit: 2
    }]
  })
    .then(function(companies) {
      var companiesWithPriceChange = []
      for (var i = 0; i < companies.length; i++) {
        let { priceChange, priceChangePercentage } = db.Company.getPriceChange(companies[i])
        let todaysPrice = (companies[i].Prices.length > 0 ? companies[i].Prices[0].price : null)

        companiesWithPriceChange.push({
          ...companies[i].dataValues,
          price: todaysPrice,
          priceChange: priceChange.toFixed(2),
          priceChangePercentage: priceChangePercentage.toFixed(2)
        })
      }
      res.status(200).json(companiesWithPriceChange)
    });
});

// post new company
router.post('/', function(req, res) {
  db.Company.create({
    name: req.body.name,
    stockName: req.body.stockName
  })
    .then(function(company) {
        res.status(200).json({success: true})
    });
});

module.exports = router
