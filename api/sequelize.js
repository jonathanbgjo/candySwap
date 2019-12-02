// import Sequelize from 'sequelize';
// import UserModel from './models/users';
var Sequelize = require('sequelize');
var UserModel = require('./models/users');
const sequelize = new Sequelize ('colorSwap', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync()
.then(()=> {
  console.log('Users db and user table have been created');
});
module.exports = User;
