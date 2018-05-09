const router = require('express').Router();
const {User} = require('../db/models');
module.exports = router;

// path '/users/'
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next);
});

// path '/users/:id'
router.get('/:id', (req, res, next) => {
  User.findById(+req.params.id)
    .then(userById => res.json(userById))
    .catch(next);
})
