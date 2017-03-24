// importing Bluebird promises so we can Promise.map
const Promise = require('bluebird');
// bring in the db and all the Models to seed
const db = require('./db');
const Puppy = require('./models/Puppy');
const Park = require('./models/Park');
const Food = require('./models/Food');
const Location = require('./models/Location');

// outer-scoped variable that will hold the db data
let allPuppies,
    allFoods,
    allParks,
    allLocations;

// array of promises to find all the db data
let findAllPromises = [
  Puppy.findAll().then(puppies => allPuppies = puppies),
  Food.findAll().then(foods => allFoods = foods),
  Park.findAll().then(parks => allParks = parks),
  Location.findAll().then(locations => allLocations),
]

// not syncing - we'll run this after we seed the rest of the db
db.sync({force: false})
.then(() => {
  // make sure we don't move on until all the db associations have happened
  return Promise.all(findAllPromises)
})
.then(allFound => {
  let length = allPuppies.length;
  let puppyPromises = allPuppies.map(puppy => {
    return puppy.setBestFriend(Math.ceil(Math.random() * length));
  });
  return Promise.all(puppyPromises)
})
.then(newFriends => {
  console.log(`Added ${newFriends.length} new best friends!`);
  let length = allFoods.length;
  let puppyFoodPromises = allPuppies.map(puppy => {
    // give each Puppy 3 favorite foods, starting at a random food
    let foodIndex = Math.floor(Math.random() * length);
    return Promise.all([
      // I'll  show two methods of setting the association. Here we grab the whole instance by
      // array index from the allFoods array. Below in the location setting, we'll just
      // use the id# to set the association
      puppy.addFavFoods(allFoods[foodIndex++ % length]),
      puppy.addFavFoods(allFoods[foodIndex++ % length]),
      puppy.addFavFoods(allFoods[foodIndex++ % length]),
    ]);
  });
  return Promise.all(puppyFoodPromises);
})
.then(newFoods => {
  console.log(`Added 3 fav foods to all ${newFoods.length} puppies`);
  // create promise array to set location association for parks
  let parksPromises = allParks.map((park, index) => {
    return park.setLocation(index + 1);
  })
  return Promise.all(parksPromises);
})
.then(newLocations => {
  console.log(`Set locations for ${newLocations.length} parks`);
  let parksLength = allParks.length;
  // set each puppy's favorite park to a random park from the allParks array
  let puppyParkPromises = allPuppies.map(puppy => {
    return puppy.setPark(Math.ceil(Math.random() * parksLength))
  })
  return Promise.all(puppyParkPromises)
})
.then(puppyParks => {
  console.log(`Set favorite parks for ${puppyParks.length} puppies`)
  console.log('Whew! Set a lot of associations')
})
.catch(console.error.bind(console))
.finally(() => {
  db.close();
  console.log('Exiting...');
  return null;
})