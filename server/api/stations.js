const router = require('express').Router();
const {Station} = require('../db/models');
const { User } = require('../db/models');
const { Broadcast } = require('../db/models');

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
  const id = +req.params.id;
  Station.findById(id, {include: [{model: Broadcast}]})
  .then(station => {
    res.json(station);
  })
  .catch(next);
});

// post new station
router.post('/', (req, res, next) => {
  const userId = req.body.userId;
  delete req.body.userId;
  Station.create(req.body)
  .then(station => {
    return User.findById(userId)
      .then(user => {
        return station.addUser(user);
      })
      .then(() => {
        res.json(station);
      });
      // .catch?
  })
  .catch(next);
});

//update station
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  Station.findById(id)
  .then(station => {
    return station.update(req.body);
  })
  .then(updatedStation => {
    res.json(updatedStation);
  })
  .catch(next);
});
