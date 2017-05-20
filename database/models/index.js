import Sequelize from 'sequelize';
import path from 'path';
import fs from 'fs';
import * as models from './models'

var db = {};
const env = process.env.NODE_ENV || 'developement';
const config = require('../config.json')[env];

var sequelize = new Sequelize(config.database, config.username, config.password, config)

// Initialize models
for( let mdl in models) {
  if (models.hasOwnProperty(mdl)) {
    var model = models[mdl](sequelize, Sequelize)
    db[model.name] = model
  }
}

// Apply associations
Object.keys(db).forEach((modelName) => {
 if (db[modelName].associate) {
   db[modelName].associate(db);
 }
});

// Adds `sequelize` instance to db object.
db.sequelize = sequelize;

// Adds `Sequelize` class to db object.
db.Sequelize = Sequelize;

export default db;
