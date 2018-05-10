const router = require('express').Router();
const {User} = require('../db/models');
const {isUser} = require('../auth/middleware');
const {isAdmin} = require('../auth/middleware');
module.exports = router;

// path '/users/'
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

// path '/users/:id'
router.get('/:id', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email'],
    where: {
      id: +req.params.id
    }
  })
  .then(userById => res.json(userById))
  .catch(next);
});
