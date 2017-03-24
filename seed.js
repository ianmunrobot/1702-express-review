// importing Bluebird promises so we can Promise.map
var Promise = require('bluebird');
// bring in the db and all the Models to seed
var db = require('./db');
var Puppy = require('./models/Puppy');
var Park = require('./models/Park');
var Food = require('./models/Food');
var Location = require('./models/Location');

// each of the following array will be iterated and Created
var locationData = [
  {
    address: '11th Floor, 5 Hanover Square, NY'
  },
  {
    address: '450 Flatbush Ave, Brooklyn'
  },
  {
    address: 'Washington Square, NY'
  },
]

var puppyData = [
  {
    firstName: 'Puppy',
    lastName: 'Doggo',
    age: 1,
  },
  {
    firstName: 'Pupster',
    lastName: 'Puppo',
    age: 2,
  },
  {
    firstName: 'Mr.',
    lastName: 'Puppyface',
    age: 3,
  },
  {
    firstName: 'Ham',
    lastName: 'Sandwich',
    age: 1,
  },
  {
    firstName: 'Jon',
    lastName: 'MacPuppald',
    age: 2,
  },
  {
    firstName: 'Omri',
    lastName: 'Puppstein',
    age: 1,
  },
];

var foodData = [
  {
    name: 'pizza',
    deliciousness: 4,
  },
  {
    name: 'dumplings',
    deliciousness: 5,
  },
  {
    name: 'lettuce',
    deliciousness: 3,
  },
  {
    name: 'kao soi',
    deliciousness: 5,
  },
  {
    name: 'cheetos',
    deliciousness: 5,
  },
]

var parkData = [
  {
    name: 'Fullstack Park',
  },
  {
    name: 'Prospect Park',
  },
  {
    name: 'Washington Square Park',
  },
]


// We will go through the Models one by one and create an instance
// for each element in the array. Look below for a commented out version of how to do this in one slick nested Promise.

// Sync and restart db before seeding
db.sync({ force: true })
.then(function() {
  console.log('synced DB and dropped old data');
})
// here, we go through all the models one by one, create each
// element from the seed arrays above, and log how many are created
.then(function() {
  return Promise.map(locationData, function(location) {
    return Location.create(location);
  })
})
.then(function(createdLocations) {
  console.log(`${createdLocations.length} locations created`);
})
.then(function() {
  return Promise.map(puppyData, function(puppy) {
    return Puppy.create(puppy);
  })
})
.then(function(createdPuppies) {
  console.log(`${createdPuppies.length} puppies created`);
})
.then(function() {
  return Promise.map(foodData, function(food) {
    return Food.create(food);
  })
})
.then(function(createdFoods) {
  console.log(`${createdFoods.length} foods created`);
})
.then(function() {
  return Promise.map(parkData, function(park) {
    return Park.create(park);
  })
})
.then(function(createdParks) {
  console.log(`${createdParks.length} parks created`);
})
.then(function () {
  console.log('Seeded successfully');
})
.catch(function(err) {
  console.error('Error!', err, err.stack);
})
.finally(function() {
  db.close();
  console.log('Finished!');
  return null;
});

// Nested version:
// const allData = {
//   location: locationData,
//   puppy: puppyData,
//   food: foodData,
//   park: parkData,
// }

// db.sync({force: true})
// .then(function () {
//   console.log('synced DB and dropped old data');
//   return Promise.map(Object.keys(allData), name => {
//     return Promise.map(allData[name], element => {
//       return db.model(name)
//         .create(element);
//     });
//   });
// })
// .then(function () {
//   console.log('Seeded successfully');
// })
// .catch(function(err) {
//   console.error('Error!', err, err.stack);
// })
// .finally(function() {
//   db.close();
//   console.log('Finished!');
//   return null;
// })