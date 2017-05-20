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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    getterMethods: {
    },
    classMethods: {
      associate: function(models) {
        Company.hasMany(models.Price)
      },
      getPriceChange: function (company) {
        let priceChange = 0.00
        let priceChangePercentage = 0.00
        if (company.Prices.length >= 2) {
          priceChange = company.Prices[0].price - company.Prices[1].price
          priceChangePercentage = priceChange / company.Prices[1].price
          return { priceChange, priceChangePercentage }
        } else {
          return { priceChange, priceChangePercentage }
        }
      }
    }
  });
  return Company;
};
