var Sequelize = require('sequelize');
var db = require('../db');

var Location = db.define('location', {
  address: {
    type: Sequelize.STRING
  }
});

module.exports = Location;