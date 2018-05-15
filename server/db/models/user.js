const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

//profile image
const defaultProfileImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emoji_Grinning_Face_Smiling_Eyes.svg/128px-Emoji_Grinning_Face_Smiling_Eyes.svg.png';

const User = db.define('user', {
  userName: {
    type: Sequelize.STRING,
    // uncomment next lines after changing front end Forms to accept userName upon sigup/ login with google, 
    // or create getter/setter to just slice off the characters before the @ symbol in the email upon signup
    // unique: true,
    // isEmpty: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get () {
      return () => this.getDataValue('salt');
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  profilePic: {
    type: Sequelize.STRING(1000),
    defaultValue: defaultProfileImg,
    validate: {
      isUrl: true
    }
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'Weird creature who loves radio!'
  },
  broadcasterRating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 4
  },
  callerRating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 3
  }
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
