import schedule from 'node-schedule'

export default function (db, io) {
  // Scheduler that will run when the second is 59
  var NewRandomCompanyPrices = schedule.scheduleJob('59 * * * * *',  () => {
    // Will create new prices for a random amount of companies
    db.Company.generateRandomCompanyPrices(db)
    .then(function () {
      // When the new prices are created, inform the clients
      io.emit('new-data')
    })
  })
}
