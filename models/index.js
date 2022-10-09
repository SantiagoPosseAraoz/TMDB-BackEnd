const  S = require('sequelize');
const sequelize = require("../config/db")
const bcrypt = require("bcrypt")
class User extends S.Model {}

User.init({
  userName: {
    type: S.STRING,
    allowNull: false,
    unique: true
  },
  password : {
    type : S.STRING,
    allowNull : false
  },
  movieFavorites: {
    type: S.ARRAY(S.INTEGER),
    defaultValue : []
  },
  tvFavorites: {
    type: S.ARRAY(S.INTEGER),
    defaultValue : []
  },
  salt : { type : S.STRING}
}, {
  sequelize,
  modelName: 'User'
});

User.prototype.hash = function (pw, salt) {
  return bcrypt.hash(pw, salt);
};

User.prototype.validatePassword = function (password) {
  return bcrypt
    .hash(password, this.salt)
    .then((hash) => hash === this.password);
};


User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;
  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});


module.exports = User