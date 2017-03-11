var router = require('express').Router();

var puppies = require('./puppies')

module.exports = router;

// get all puppies route
router.get('/', function(req, res, next) {
  res.send(puppies)
});

// get puppy by id
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var query = req.query;
  var puppy = puppies[id];
  // allow for queries for particular keys in the puppy object
  // or for sending back the entire puppy
  var isEmptyQuery = Object.keys(query).length
  if (!isEmptyQuery) {
    res.send(puppy);
  } else {
    var responses = {}
    Object.keys(query).forEach(function(key) {
      responses[key] = puppy[key]
    })
    res.send(responses);
  }
});

// update a particular puppy
router.put('/:id', function(req, res, next) {
  var puppy = puppies[req.params.id];
  // overwrite or copy new key/value pairs onto the puppy object
  Object.assign(puppy, req.body);
  // send the updated puppy
  res.send(puppy);
});


// dummy route if we had something like Sequelize hooked up
// shows use of two params in a single route
router.get('/:puppyId/orders/:puppyOrderId', function(req, res, next) {
  // find something based on the first param
  puppies.findById(req.params.puppyId)
    .then(function(puppy) {
      // then find something else based on the result of the first query
      return puppy.getAllOrders({
        where: {
          orderId: req.params.orderId
        }
      })
    })
    // once you get both things, send response
    .then(function(result) {
      res.send(result);
    })
})

// post a new puppy
// req.body is the puppy object
router.post('/', function(req, res, next) {
  var puppy = req.body;
  puppies.push(puppy);
  req.puppy = puppy;
  res.send(puppy);
})
