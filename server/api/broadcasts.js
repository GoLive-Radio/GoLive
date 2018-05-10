const router = require('express').Router();
const {Broadcast} = require('../db/models');
const { Station } = require('../db/models');
const { User_stations } = require('../db/models')
module.exports = router;

// exact path '/broadcasts/'
router.get('/', (req, res, next) => {
    Broadcast.findAll({})
        .then(allBroadcasts => res.json(allBroadcasts))
        .catch(next);
});

// exact path '/broadcasts/:stationId'
router.get('/:stationId', (req, res, next) => {
    Broadcast.findAll({
       where: {
           stationId: req.params.stationId
       }
    })
        .then(broadcastsByStation => res.json(broadcastsByStation))
        .catch(next)
});

// GET single broadcast by id '/broadcasts/:broadcastId'
router.get('/:broadcastId', (req, res, next) => {
  Broadcast.findById(req.params.broadcastId)
  .then(broadcast => res.json(broadcast))
  .catch(next);
});
