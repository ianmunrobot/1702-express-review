var Sequelize = require('sequelize');
var db = require('../db');

var Food = db.define('food', {
  name: {
    type: Sequelize.STRING,
  },
  deliciousness: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10,
    }
  }
});

module.exports = Food;