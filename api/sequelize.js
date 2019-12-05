// import Sequelize from 'sequelize';
// import UserModel from './models/users';
var Sequelize = require('sequelize');
var UserModel = require('./models/users');
var LevelModel = require('./models/levels');
const sequelize = new Sequelize ('colorSwap', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);
const Level = LevelModel(sequelize, Sequelize);
sequelize.sync()
.then(()=> {
  console.log(' db and user/level table have been created');
})
module.exports = User, Level;
