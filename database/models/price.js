module.exports = function(sequelize, DataTypes) {
  var Price = sequelize.define('Price', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    classMethods: {
      associate: function(models) {
        Price.belongsTo(models.Company)
      },
    }
  })
  return Price
}
