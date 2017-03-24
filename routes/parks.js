const router = require('express').Router();

const Park = require('../models/Park');
const Location = require('../models/Location');

module.exports = router;

router.get('/', (req, res, next) => {
  Park.findAll()
    .then(res.send.bind(res))
    .catch(next)
});

router.post('/', (req, res, next) => {
  Park.findOrCreate({
    where: req.body
  })
  .then(res.send.bind(res))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Park.findById(req.params.id)
    .then(res.send.bind(res))
    .catch(next);
});

// update the location of a park
// needs a locationId prop in the req.body
router.put('/:id/location', (req, res, next) => {
  Park.findById(req.params.id)
    .then(foundPark => {
      if (!foundPark) res.sendStatus(404);
      return foundPark.setLocation(req.body.locationId)
    })
    .then(res.send.bind(res))
    .catch(next);
});