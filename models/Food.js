const Sequelize = require('sequelize');
const db = require('../db');

const Food = db.define('food', {
  name: {
    type: Sequelize.STRING,
  },
  deliciousness: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5,
    }
  }
});

module.exports = Food;