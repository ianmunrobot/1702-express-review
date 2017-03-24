var Sequelize = require('sequelize');

// when you go to start the server, be smarter than me and make sure you have postgres actually running on your machine!
var db = new Sequelize('postgres://localhost:5432/puppies', {
  logging: false
});

module.exports = db;

// Here we will define associations
var Puppy = require('./models/Puppy');
var Park = require('./models/Park');
var Food = require('./models/Food');
var Location = require('./models/Location');

// this will put a foreign key for favParkId in the Puppy model
// and give Puppy .setFavPark() and .getFavPark() instance methods
// Puppy.belongsTo(Park)
// Park.hasOne(Puppy)

// Park.belongsTo(Location);