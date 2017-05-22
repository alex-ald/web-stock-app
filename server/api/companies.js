import { Router } from 'express'
import db from '../../database/models/'
import { io } from '../index'

const router = new Router()

// get all companies and their information
router.get('/', function (req, res) {
  // end of today's date and start of yesterday's date
  var currentDate = new Date()
  var endOfToday = currentDate.setUTCHours(23,59,59,59)
  var startOfYesterday = new Date(currentDate.setDate(currentDate.getDate()-1)).setUTCHours(0,0,0,0)

  // obtain all companies
  db.Company.findAndCountAll({
    include: [{
      model: db.Price,
      where: {
        createdAt: {
          $lte: endOfToday,
          $gte: startOfYesterday
        }
      },
      limit: 2,
      order: 'Price.createdAt DESC'
    }],
    offset: parseInt(req.query.offset) || 0,
    limit: parseInt(req.query.limit) || 4
  }).then(function(companies) {
    setTimeout ( () => {
        res.status(200).json(companies)
      },
      1000
    )
  })
})

// post new company
router.post('/', function (req, res) {
  db.Company.create({
    name: req.body.name,
    stockName: req.body.stockName
  })
    .then(function (company) {
        res.status(200).json({success: true})
    })
})

router.post('/new-prices', function (req, res) {
  db.Company.generateRandomCompanyPrices(db).then(function () {
    io.emit('new-data')
    res.status(200).json({success: true})
  }).catch(function () {
    res.json({ success: false })
  })
})

module.exports = router
