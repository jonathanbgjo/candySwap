// import Sequelize from 'sequelize';
// import UserModel from './models/users';
var Sequelize = require('sequelize');
var UserModel = require('./models/users');
var LevelModel = require('./models/levels');
var SavedLevelModel = require('./models/saveLevel')
var LevelLeaderboardModel = require('./models/levelLeaderboard')
const sequelize = new Sequelize ('colorSwap', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
  });

const User = UserModel(sequelize, Sequelize);
const Level = LevelModel(sequelize, Sequelize);
const LevelLeaderboard = LevelLeaderboardModel(sequelize, Sequelize);
const SavedLevel = SavedLevelModel(sequelize, Sequelize);

User.belongsToMany(Level, {through: LevelLeaderboard, foreignKey: 'user_id' });
Level.belongsToMany(User, {through: LevelLeaderboard, foreignKey: 'level_id' });
User.belongsToMany(Level, {through: SavedLevel, foreignKey: 'user_id' });
Level.belongsToMany(User, {through: SavedLevel, foreignKey: 'level_id' });

sequelize.sync()
.then(()=> {
  console.log(' db and user/level table have been created');
})
module.exports = {User: User, Level: Level, LevelLeaderboard: LevelLeaderboard, SavedLevel: SavedLevel}
