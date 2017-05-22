import schedule from 'node-schedule'

export default function (db, io) {
  var NewRandomCompanyPrices = schedule.scheduleJob('59 * * * * *',  () => {
    db.Company.generateRandomCompanyPrices(db)
    .then(function () {
      io.emit('new-data')
    })
  })
}
