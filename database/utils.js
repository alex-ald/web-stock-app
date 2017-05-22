// Returns random value that is between minPrice and maxPrice
export let getRandomValue =  (minPrice, maxPrice) => {
  return Math.random() * (maxPrice - minPrice) + minPrice
}

// Create a new price from provided company
export let createRandomPriceDb = (db, companyId) => {
  return new Promise(function(resolve, reject) {
    return db.Price.create({
      price: getRandomValue(0.00, 100.00),
      CompanyId: companyId
    }).then((price) => {
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}
