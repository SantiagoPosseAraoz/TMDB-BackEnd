const Sequelize = require('sequelize');

const db = new Sequelize('tmdb_santiago', "tmdb_santiago_user", "ZP11oKRf0sndJq9X1ViBdd8QQO36cdYU", {
  host: 'dpg-cd1h1vqen0hm1trfblrg-a',
  dialect: 'postgres',
  loggin : false,

});

module.exports = db;