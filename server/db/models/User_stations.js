const Sequelize = require('sequelize');
const db = require('../db');

const User_stations = db.define('user_stations')

module.exports = User_stations;
