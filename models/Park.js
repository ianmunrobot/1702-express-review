var Sequelize = require('sequelize');
var db = require('../db');

Park = db.define('park', {
  name: Sequelize.STRING
})

module.exports = Park;