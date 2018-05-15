const router = require('express').Router();
const { Broadcast } = require('../db/models');
const { Station } = require('../db/models');
const { User } = require('../db/models');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = router;

// exact path '/broadcasts/'
// /broadcasts?stationId=stationId
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
    Broadcast.findAll({
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
      .then(allBroadcasts => res.json(allBroadcasts))
      .catch(next);
  }
});

// GET single broadcast by id '/broadcasts/:broadcastId'
router.get('/:broadcastId', (req, res, next) => {
  Broadcast.findById(req.params.broadcastId,
    {
      include: [{
        model: User,
        attributes: ['id', 'profilePic', 'broadcasterRating', 'callerRating', 'userName']
      }]
    }
  )
    .then(broadcast => res.json(broadcast))
    .catch(next);
});

//post new broadcast
router.post('/', (req, res, next) => {
  Broadcast.create(req.body)
    .then(broadcast => res.json(broadcast))
    .catch(next);
});

//path: /broadcasts/:id
router.put('/:id', upload.single('blob'), (req, res, next) => {
  const id = req.params.id;
  Broadcast.findById(id)
    .then(broadcast => {
      return broadcast.update({
        audioPath: req.file.filename,
        blob: req.file.buffer,
        isArchived: true,
        isLive: false
      });
    })
    .then(updatedBroadcast => {
      res.json(updatedBroadcast);
    })
    .catch(next);
});

// path:  /broadcasts/:id/playback
router.get('/:id/playback', (req, res, next) => {
  Broadcast.findById(req.params.id)
    .then(broadcast => {
      res.json(broadcast);
    })
    .catch(next);
});

router.put('/:id/is-live', (req, res, next) => {
  const id = req.params.id;
  Broadcast.findById(id)
    .then(broadcast => {
      return broadcast.update({
        isLive: true
      });
    })
    .then(updatedBroadcast => {
      res.json(updatedBroadcast);
    })
    .catch(next);
});
