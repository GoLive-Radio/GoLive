const router = require('express').Router();
const {Broadcast} = require('../db/models');
const { Station } = require('../db/models');
const {User} = require('../db/models');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, '..', '..', '/public/audio/') });

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

//post new broadcast
router.post('/', (req, res, next) => {
  Broadcast.create(req.body)
  .then(broadcast => res.json(broadcast))
  .catch(next);
});

//upload broadcast audio
router.put('/:id', upload.single('blob'), (req, res, next) => {
  console.log(`req.body: `, req.body);
  console.log(`req.file: `, req.file);
  const id = req.params.id;
  Broadcast.findById(id)
  .then(broadcast => {
    return broadcast.update(req.body);
  })
  .then(updatedBroadcast => {
    res.json(updatedBroadcast);
  })
  .catch(next);
});

router.get('/:id/playback', (req, res, next) => {
  fs.readFile(path.join(__dirname, '..', '..', '/public/audio/4ce1ea38c6624626c5b26c194ad42126'), (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(`data on api route: `, data);
      res.json(data);
    }
  });
});
