'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Companies',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      stockName: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Companies');
  }
};
