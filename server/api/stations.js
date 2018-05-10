const router = require('express').Router();
const {Station} = require('../db/models');
const { User } = require('../db/models')
const { User_stations } = require('../db/models')

module.exports = router;

// exact path '/stations/
router.get('/', (req, res, next) => {
    Station.findAll({})
        .then(stations => res.json(stations))
        .catch(next);
});

// exact path '/stations/user/:userId'
router.get('/user/:userId', (req, res, next) => {
    Station.findAll({
        include: [{
            model: User,
            attributes: ['id', 'profilePic', 'summary'],
            through: {
                where: {
                    userId: +req.params.userId
                }
            }
        }]
    })
    .then(stationsByUserId => res.json(stationsByUserId))
    .catch(next)
});

// exact path '/stations/:id
router.get('/:id', (req, res, next) => {
    Station.findById(+req.params.id)
        .then(station => res.json(station))
        .catch(next);
});




