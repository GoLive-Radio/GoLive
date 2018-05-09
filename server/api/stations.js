const router = require('express').Router();
const {Station} = require('../db/models');
const { User } = require('../db/models')
const { user_stations } = require('../db/models')

module.exports = router;

// exact path '/stations/
router.get('/', (req, res, next) => {
    Station.findAll({})
        .then(stations => res.json(stations))
        .catch(next);
});

// exact path '/stations/user/:id'
router.get('/user/:id', (req, res, next) => {
    Station.findAll({
        include: [{
            model: user_stations,
            where: {
                userId: +req.params.id
            },
            // required: true
        }]
    })
    .then(stationsById => res.json(stationsById))
    .catch(next)
});

// exact path '/stations/:id
router.get('/:id', (req, res, next) => {
    Station.findById(+req.params.id)
        .then(station => res.json(station))
        .catch(next);
});
