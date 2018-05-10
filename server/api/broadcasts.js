const router = require('express').Router();
const {Broadcast} = require('../db/models');
const { Station } = require('../db/models');
const {User} = require('../db/models');
const { User_stations } = require('../db/models');
module.exports = router;

// exact path '/broadcasts/'
// /broadcasts/?stationId=stationId
router.get('/', (req, res, next) => {
    if (req.query.stationId) {
      Broadcast.findAll({
        where: {
          stationId: req.query.stationId
        },
        include: [
          {
            model: User,
            attributes: ['id', 'email', 'profilePic', 'summary']
          },
          {
            model: Station
          }
        ]
      })
      .then(broadcastsByStation => res.json(broadcastsByStation))
      .catch(next);
    } else {
      Broadcast.findAll({ include: [
        {
          model: User,
          attributes: ['id', 'email', 'profilePic', 'summary']
        },
        {
          model: Station
        }
      ]})
      .then(allBroadcasts => res.json(allBroadcasts))
      .catch(next);
    }
});

// GET single broadcast by id '/broadcasts/:broadcastId'
router.get('/:broadcastId', (req, res, next) => {
  Broadcast.findById(req.params.broadcastId)
  .then(broadcast => res.json(broadcast))
  .catch(next);
});
