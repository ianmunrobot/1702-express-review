var router = require('express').Router();

// old non-persistent puppy 'memory'
// var puppies = require('./puppies');

var Puppy = require('./db').Puppy;

module.exports = router;

// get all puppies route
router.get('/', function(req, res, next) {
  // here we can also use a req.query to match against puppies if we need to!
  // this allows use to use routes like /puppies?favFood=pizza to get all puppies who love pizza.
  // if no query is present, we there is no where condition to match against, so everthing is returned. neat!
  Puppy.findAll({
    where: req.query
  })
    // quick one-line res.send. This will res.send whatever the previous promise resolves to.
    .then(res.send.bind(res))
    .catch(next);
});

// update a particular puppy
router.put('/:id', function(req, res, next) {
  // two arguments: object of key/value pairs to update,
  // options object with where matching and other options, like whether to return or not!
  Puppy.update(req.body,
  {
    where: {
      id: req.params.id,
    },
    // must use returning option to actually get the updated instances back from the db
    returning: true,
  })
  .then(function(whateverUpdateReturns) {
    // Model.update returns an array of two elements:
    // element 1: number of rows theActualUpdatedPuppy
    // element 2: array of all updated instances.
    // in this case we are only ever updating one instance(by id)
    // so we'll scrape out the actual updated puppy from this array
    console.log(whateverUpdateReturns);
    return whateverUpdateReturns[1][0];
  })
  .then(function(theActualUpdatedPuppy) {
    res.send(theActualUpdatedPuppy);
  })
  .catch(next);
});

// post a new puppy
// req.body is the puppy object
router.post('/', function(req, res, next) {
  Puppy.create(req.body)
    .then(function(puppy) {
      res.send(puppy);
    })
    .catch(next);
});

// get puppy by id
router.get('/:id', function(req, res, next) {
  Puppy.findOne({
    where: {
      id: req.params.id
    }
  })
  // the previous query and the one on the following line work identically in this instance
  // Puppy.findById(req.params.id)
  .then(function(puppy) {
    // if no puppy is found, we can let the requester know
    if (!puppy) res.send('not found!')
    else {
      // if we want, we can call an instance method of this puppy here
      console.log(puppy.greet());
      res.send(puppy)
    }
  })
  .catch(next);
});
