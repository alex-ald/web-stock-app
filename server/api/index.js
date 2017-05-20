import { Router } from 'express'
const router = new Router()

router.use('/companies', require('./companies'))

module.exports = router
