const Sequelize = require('sequelize');
const db = require('../db');

const Park = db.define('park', {
  name: Sequelize.STRING
})

module.exports = Park;