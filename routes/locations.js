const router = require('express').Router();

const Location = require('../models/Location');

module.exports = router;

router.get('/', (req, res, next) => {
  Location.findAll()
    .then(res.send.bind(res))
    .catch(next)
});

router.post('/', (req, res, next) => {
  Location.findOrCreate({
    where: req.body
  })
  .then(res.send.bind(res))
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  Location.findById(req.params.id)
    .then(res.send.bind(res))
    .catch(next);
});