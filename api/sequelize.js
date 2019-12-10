// import Sequelize from 'sequelize';
// import UserModel from './models/users';
var Sequelize = require('sequelize');
var UserModel = require('./models/users');
var LevelModel = require('./models/levels');
var LevelLeaderboardModel = require('./models/levelLeaderboard')
const sequelize = new Sequelize ('colorSwap', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
  });

const User = UserModel(sequelize, Sequelize);
const Level = LevelModel(sequelize, Sequelize);
const LevelLeaderboard = LevelLeaderboardModel(sequelize, Sequelize);
//const LevelLeaderboard = LevelLeaderboardModel(sequelize, Sequelize);


// Level.associate = (models) => {
//   Level.belongsToMany(models.User, {
//     through: 'LevelLeaderboard',
//     as: 'levels',
//     foreignKey: 'level_id'
//   });
// };


// User.belongsToMany(Level, {as:'Levels', through: LevelLeaderboard, foreignKey: 'user_id' });
// Level.belongsToMany(User, {as: 'Users', through: LevelLeaderboard, foreignKey: 'level_id' });
User.belongsToMany(Level, {through: LevelLeaderboard, foreignKey: 'user_id' });
Level.belongsToMany(User, {through: LevelLeaderboard, foreignKey: 'level_id' });

sequelize.sync()
.then(()=> {
  console.log(' db and user/level table have been created');
})
module.exports = {User: User, Level: Level, LevelLeaderboard: LevelLeaderboard}

// m.Book.hasMany(m.Article, {through: 'book_articles'});
// m.Article.hasMany(m.Books, {through: 'book_articles'});



// This is how i solved the similar problem i had two models a user model

// var user = sequelize.define('user', {
//     name: {
//         Sequelize.STRING(255)
//     },
//     email: {
//         type: Sequelize.STRING(255),
//         unique: true,
//         validate: {
//             isEmail: true
//         }
//     }
// });
// and a roles model

// var Role = sequelize.define('role', {
//     name: {
//         Sequelize.ENUM('ER', 'ALL', 'DL')
//     },
//     description: {
//         type: Sequelize.TEXT
//     }
// });
// Then i created the union model UserRole

// var UserRole = sequelize.define('user_role', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {
//         type: Sequelize.ENUM('Admin', 'Staff', 'Customer', 'Owner')
//     }
// });
// Note: you have to explicitly define the id for UserRole otherwise sequelize will use the two foreign keys in this case user_id and role_id as your primary keys.

// Then i created the belongs to many relationship as follows

// User.belongsToMany(Role, { as: 'Roles', through: { model: UserRole, unique: false }, foreignKey: 'user_id' });
// Role.belongsToMany(User, { as: 'Users', through: { model: UserRole, unique: false },


// ableNames: PascalCase

// keys: camelCase

// foreignkeys: TableNameInPascalCase_foreignKeyInCamelCase

// Example: User_pictureId Meaning: This key of pictureId came from the User table.

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
