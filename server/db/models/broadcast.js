const Sequelize = require('sequelize');
const db = require('../db');

//define a model
const Broadcast = db.define('broadcast', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  blob: {
    type: Sequelize.BLOB('long')
  },
  isLive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isArchived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = Broadcast;
