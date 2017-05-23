import { Router } from 'express'
import db from '../../database/models/'

const router = new Router()

// get all companies and their information
router.get('/', function (req, res) {
  // end of today's date and start of yesterday's date
  var currentDate = new Date()
  var endOfToday = currentDate.setUTCHours(23,59,59,59)
  var startOfYesterday = new Date(currentDate.setDate(currentDate.getDate()-1)).setUTCHours(0,0,0,0)

  // check if their is a requested ordering
  var orderBy = null
  if (typeof req.query.orderBy === 'string') {
    switch (req.query.orderBy.toLowerCase()) {
      case 'stock code':
        orderBy = 'stockName'
        break
      case 'name':
        orderBy = 'name'
        break
      default:
        break
    }
  }

  var orderFormat = 'ASC'
  if (typeof req.query.isAscending === 'string') {
    if (req.query.isAscending.toLowerCase() === 'false') {
        orderFormat = 'DESC'
    }
  }

  // obtain all companies
  db.Company.findAndCountAll({
    order: orderBy + ' ' + orderFormat,
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
    res.locals.io.emit('new-data')
    res.status(200).json({success: true})
  }).catch(function () {
    res.json({ success: false })
  })
})

module.exports = router
