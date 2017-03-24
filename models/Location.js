const Sequelize = require('sequelize');
const db = require('../db');

const Location = db.define('location', {
  address: {
    type: Sequelize.STRING
  }
});

module.exports = Location;