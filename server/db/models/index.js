const User = require('./user');
const Station = require('./station');
const Broadcast = require('./broadcast');
const User_stations = require('./User_stations');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsToMany(Station, {through: 'user_stations'});
Station.belongsToMany(User, {through: 'user_stations'});
Station.hasMany(Broadcast);
Broadcast.belongsTo(User);
Broadcast.belongsTo(Station);
User.hasMany(Broadcast);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Station,
  Broadcast,
  User_stations
};




