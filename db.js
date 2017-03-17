var Sequelize = require('sequelize');

// when you go to start the server, be smarter than me and make sure you have postgres actually running on your machine!

var db = new Sequelize('postgres://localhost:5432/puppies');

var Puppy = db.define('puppy', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  favFood: {
    type: Sequelize.STRING,
  },
  // one way to set a getter method/virtual: define it on the model
  // see getterMethods below for another option
  // make sure to use this.getDataValue() to access any properties in getters defined on the model
  // to avoid timing issues/infinite loops

  // fullName: {
  //   type: Sequelize.VIRTUAL,
  //   get: function() {
  //     return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
  //   }
  // }
}, {
  getterMethods: {
    // `this` refers to the instance
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    }
  },
  instanceMethods: {
    // `this` refers to the instance
    greet: function() {
      return 'Woof my name is ' + this.fullName;
    },
    // fullName: function() {
    //   return this.firstName + ' ' + this.lastName;
    // }
  },
  classMethods: {
    // this refers to the class (capital 'P' Puppy) in class methods
    // class Methods are great for making custom queries
    findByFavFood: function(food) {
      return this.findAll({
        where: {
          favFood: food
        }
      })
    },
    // Sequelize provides counts, so this is a bit redundant, but you can see
    // how you might also
    count: function() {
      return this.findAll()
              .then(function(puppies) {
                return puppies.length;
              })
    }
  },
  hooks: {
    // `this` refers to the class, but the instance(s) is the first argument many hook functions
    // this is a contrived example! Hooks are useful in more complicated dbs, but in this case,
    // if a puppy's favorite food is pizza, we override the user input with a particularly delicious variety
    beforeValidate: function(puppy) {
      if (pupy.favFood === 'pizza') {
        puppy.favFood = 'buffalo chicken pizza';
      }
    }
  }
});

// quick association - Puppies can have Parks
Park = db.define('park', {
  name: Sequelize.STRING
})

// this will put a foreign key for favParkId in the Puppy model
// and give Puppy .setFavPark() and .getFavPark() instance methods
Puppy.belongsTo(Park, {as: 'favPark'})

module.exports = {
  Puppy: Puppy,
  db: db,
}
