const config = require('../db.config');

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize; //sequelize library
db.sequelize = sequelize; // the db instance

//Models
db.medicine = require("./medicine.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);




module.exports = db;