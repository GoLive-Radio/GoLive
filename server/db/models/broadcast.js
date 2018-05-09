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
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
});

module.exports = Broadcast;
