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
module.exports = {User: User, Level: Level}



// const CLASSMETHODS = 'classMethods';
// const ASSOCIATE = 'associate';
// var sequelize = new Sequelize(cfg.db.database, cfg.db.user, cfg.db.password, cfg.db.options);

// fs.readdirSync(__dirname).filter(function (file) {
//     return (file.indexOf('.') !== 0) && (file !== 'index.js');
// }).forEach(function (file) {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;});
// Object.keys(db).forEach(function (modelName) {
//     if (CLASSMETHODS in db[modelName].options) {
//      if (ASSOCIATE in db[modelName].options[CLASSMETHODS]) {
//       db[modelName].options.classMethods.associate(db);
//     }}});
// Character.js:

// module.exports = (sequelize, DataTypes) => {
//     const Character = sequelize.define('Character', {
//       Id: { type: DataTypes.INTEGER, primaryKey: true, autoincrement: true },
//       FirstName: DataTypes.STRING,
//       LastName: DataTypes.STRING,
//       DoB: DataTypes.DATE,
//       createdAt: DataTypes.DATE,
//       updatedAt: DataTypes.DATE
//     }, {
//       classMethods: {
//       associate: (models) => {
//         Character.belongsTo(models.CharacterDetail, {
//           foreignKey: 'fk_detail_id',
//           as: 'Detail'})}}});
//       return Character;
// }
