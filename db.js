const Sequelize = require('sequelize');

// when you go to start the server, be smarter than me and make sure you have postgres actually running on your machine!
const db = new Sequelize('postgres://localhost:5432/puppies', {
  logging: false
});

module.exports = db;

// We'll define associations after we import them here
const Puppy = require('./models/Puppy');
const Park = require('./models/Park');
const Food = require('./models/Food');
const Location = require('./models/Location');

// this will put a foreign key for parkId in the Puppy model
// and give Puppy .setPark() and .getPark() instance methods
Puppy.belongsTo(Park);
// this will give Park the magic methods for addPuppy, etc.
// but we already have a foreign key for parkId in the Puppy model, so it will maintain
// the 1:m relationship
Park.hasMany(Puppy);

// Puppy to food M:M associations
// stored in the same-named join table: 'puppiesFoods'
// the `through` property is required in `belongsToMany` associations
// aliased differently in each model
Puppy.belongsToMany(Food, { as: 'favFoods', through: 'puppiesFoods' });
Food.belongsToMany(Puppy, { as: 'puppies', through: 'puppiesFoods' });

// Puppies can have a best friend Puppy
// in this case, you always need to alias the association
Puppy.belongsTo(Puppy, { as: 'bestFriend' });

// puts .setLocation() .getLocation() and `locationId` on the Park model
Park.belongsTo(Location);