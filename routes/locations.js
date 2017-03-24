const router = require('express').Router();

const Location = require('../models/Location');

module.exports = router;

// get a location
router.get('/', (req, res, next) => {
  Location.findAll()
    .then(res.send.bind(res))
    .catch(next)
});

// post a new location
router.post('/', (req, res, next) => {
  Location.findOrCreate({
    where: req.body
  })
  .then(res.send.bind(res))
  .catch(next);
})

// get location by id
router.get('/:id', (req, res, next) => {
  Location.findById(req.params.id)
    .then(res.send.bind(res))
    .catch(next);
});