const router = require('express').Router();
const {Station} = require('../db/models');
module.exports = router;

// exact path '/stations/
router.get('/', (req, res, next) => {
    Stations.findAll({})
        .then(stations => res.json(stations))
        .catch(next);
});

// exact path '/stations/:id
router.get('/:id', (req, res, next) => {
    Stations.findById(+req.params.id)
        .then(station => res.json(station))
        .catch(next);
});


