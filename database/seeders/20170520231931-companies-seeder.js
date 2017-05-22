'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('companies', [
      {
        name: 'Apple, Inc',
        stockName: 'AAPL',
        url: 'https://www.apple.com/'
      },
      {
        name: 'Microsoft Corp',
        stockName: 'MSFT',
        url: 'https://www.microsoft.com/'
      },
      {
        name: 'Ford Motor Co',
        stockName: 'F',
        url: 'http://www.ford.com/'
      },
      {
        name: 'Bank of America Corp',
        stockName: 'BAC',
        url: 'https://www.bankofamerica.com/'
      },
      {
        name: 'Advanced Micro Devices Inc',
        stockName: 'AMD',
        url: 'http://www.amd.com/en'
      },
      {
        name: 'Broadcom Ltd',
        stockName: 'AVGO',
        url: 'https://www.broadcom.com/'
      },
      {
        name: 'Ralph Lauren Corp',
        stockName: 'RL',
        url: 'http://www.ralphlauren.com/'
      },
      {
        name: 'Symantec Corp',
        stockName: 'SYMC',
        url: 'https://www.symantec.com/'
      },
      {
        name: 'Foot Locker Inc',
        stockName: 'FL',
        url: 'http://www.footlocker.com/'
      },
      {
        name: 'Deere & Co',
        stockName: 'DE',
        url: 'https://www.deere.com/'
      },
      {
        name: 'Gap Inc',
        stockName: 'GPS',
        url: 'http://www.gap.com/'
      },
      {
        name: 'Alexion Pharmaceuticals Inc',
        stockName: 'ALXN',
        url: 'http://www.alexion.com/'
      },
      {
        name: 'Campbell Soup Co',
        stockName: 'CPB',
        url: 'https://www.campbells.com/'
      },
      {
        name: 'XL Group Ltd',
        stockName: 'XL',
        url: 'http://xlgroup.com/'
      },
      {
        name: 'NetApp Inc',
        stockName: 'NTAP',
        url: 'http://www.netapp.com'
      },
      {
        name: 'Viacom Inc',
        stockName: 'VIAB',
        url: 'http://www.viacom.com/'
      },
      {
        name: 'Autodesk Inc',
        stockName: 'ADSK',
        url: 'https://www.autodesk.com/'
      },
      {
        name: 'CF Industries Holdings Inc',
        stockName: 'CF',
        url: 'https://www.cfindustries.com/'
      },
      {
        name: 'Cisco Systems Inc',
        stockName: 'CSCO',
        url: 'http://www.cisco.com/'
      },
      {
        name: 'General Electric Co',
        stockName: 'GE',
        url: 'https://www.ge.com/'
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('companies', null, {});
  }
};
