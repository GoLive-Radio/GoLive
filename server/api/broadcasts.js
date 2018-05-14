const router = require('express').Router();
const { Broadcast } = require('../db/models');
const { Station } = require('../db/models');
const { User } = require('../db/models');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({
  dest: path.join(__dirname, '..', '..', '/public/audio/')
});

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

/*
This put request fires when the recording is finished. We use the multer package in order to handle formData. Multer is configured with dest: path.join(__dirname, '..', '..', '/public/audio/'). This is writing the blob data to our public/audio folder. We're then updating the broadcast DB data and attaching the audioPath: req.file.filename

path: /broadcasts/:id
*/
router.put('/:id', upload.single('blob'), (req, res, next) => {
  console.log(`req.body: `, req.body);
  console.log(`req.file: `, req.file);
  const id = req.params.id;
  Broadcast.findById(id)
    .then(broadcast => {
      return broadcast.update({
        audioPath: req.file.filename,
        isArchived: true,
        isLive: false
      });
    })
    .then(updatedBroadcast => {
      res.json(updatedBroadcast);
    })
    .catch(next);
});

/*
This get request fires when the playback react component mounts. If there is no filepath in the DB then we set it temporarily to a default mp3. If there is an audioPath in the DB for the specific broadcast we fs.readfile the associated audio file and res.json out the data to the frontend.

path:  /broadcasts/:id/playback
*/
router.get('/:id/playback', (req, res, next) => {
  Broadcast.findById(req.params.id)
    .then(broadcast => {
      if (!broadcast.audioPath) {
        broadcast.audioPath = 'good-company.mp3';
      }
      fs.readFile(
        path.join(
          __dirname,
          '..',
          '..',
          `/public/audio/${broadcast.audioPath}`
        ),
        (err, data) => {
          if (err) {
            throw err;
          } else {
            res.json(data);
          }
        }
      );
    })
    .catch(next);
});
router.put('/:id/is-live', (req, res, next) => {
  console.log(`req.body: `, req.body);
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
