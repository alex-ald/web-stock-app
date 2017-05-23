import { Router } from 'express'
import db from '../../database/models/'

const router = new Router()

// get all companies and their information
router.get('/', function (req, res) {

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

  // check the ordering format
  var orderFormat = 'ASC'
  if (typeof req.query.isAscending === 'string') {
    if (req.query.isAscending.toLowerCase() === 'false') {
        orderFormat = 'DESC'
    }
  }

  // obtain all companies
  db.Company.findAndCountAll({
    order: orderBy + ' ' + orderFormat, // Ex: 'name DESC'
    offset: parseInt(req.query.offset) || 0,
    limit: parseInt(req.query.limit) || 10,
    include: [{
      model: db.Price,
      limit: 2,
      order: 'Price.createdAt DESC'
    }]
  }).then(function(companies) {
    // time out to demonstrate the ascynchronous calls on the client,
    // NOTE: Should be removed for production
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

// for developer purposes, will execute the scheduler task: NewRandomCompanyPrices
router.post('/new-prices', function (req, res) {
  db.Company.generateRandomCompanyPrices(db).then(function () {
    res.locals.io.emit('new-data')
    res.status(200).json({success: true})
  }).catch(function () {
    res.json({ success: false })
  })
})

module.exports = router
