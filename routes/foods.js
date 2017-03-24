const router = require('express').Router();

const Food = require('../models/Food');

module.exports = router;

router.get('/', (req, res, next) => {
  Food.findAll()
    .then(res.send.bind(res))
    .catch(next)
});

router.post('/', (req, res, next) => {
  Food.findOrCreate({
    where: req.body
  })
  .then(res.send.bind(res))
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  Food.findById(req.params.id)
    .then(res.send.bind(res))
    .catch(next);
});