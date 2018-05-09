const router = require('express').Router();
const {User} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'profilePic', 'summary']
  })
    .then(users => res.json(users))
    .catch(next);
});

//update user information
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
  .then(user => {
    return user.update(req.body);
  })
  .then(updatedUser => {
    res.json(updatedUser);
  })
  .catch(next);
});
