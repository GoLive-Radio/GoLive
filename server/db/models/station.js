const Sequelize = require('sequelize');
const db = require('../db');

//logoUrl
const defaultLogoImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Logo_Goodvibes_large.svg/512px-Logo_Goodvibes_large.svg.png';

//define a model
const Station = db.define('station', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  logoUrl: {
    type: Sequelize.STRING(1000),
    defaultValue: defaultLogoImg,
    validate: {
      isUrl: true
    }
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
});

module.exports = Station;
