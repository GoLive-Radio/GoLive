const router = require('express').Router();
const {Station} = require('../db/models');
const { User } = require('../db/models')
const { User_stations } = require('../db/models')

module.exports = router;

// exact path '/stations/
// /stations?userId=${userId}
router.get('/', (req, res, next) => {
  if (req.query.userId) {
    Station.findAll({
      include: [{
        model: User,
        required: true,
        attributes: ['id', 'email', 'profilePic', 'summary'],
        through: { where: { userId: req.query.userId } }
    }]
    })
    .then(stationsByUser => res.json(stationsByUser))
    .catch(next);
  } else {
    Station.findAll({})
        .then(stations => res.json(stations))
        .catch(next);
  }
});

// exact path '/stations/:id
router.get('/:id', (req, res, next) => {
    Station.findById(+req.params.id)
        .then(station => res.json(station))
        .catch(next);
});
