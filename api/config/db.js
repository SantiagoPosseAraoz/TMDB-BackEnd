const Sequelize = require('sequelize');

const db = new Sequelize('TMDB', "postgres", "123", {
  host: 'localhost',
  dialect: 'postgres',
  loggin : false,

});

module.exports = db;