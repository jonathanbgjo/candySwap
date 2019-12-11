var sequelize = require('../sequelize');
var User = sequelize.User;
var LevelLeaderboard = sequelize.LevelLeaderboard
var SavedLevel = sequelize.SavedLevel

module.exports = (sequelize, type) => {
    var Level = sequelize.define('level', {
      level_id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      grid: {
        type: type.STRING,
        allowNull: true,
        default: "red green blue yellow green green green red blue red red blue violet blue red green blue green yellow green violet blue violet red green blue red yellow red blue violet red violet blue green blue",
      },
      turns: {type: type.INTEGER, default: 6},
      scoreToBeat: {type: type.INTEGER, default: 15},
      dimensions: {type: type.INTEGER, default: 6},
      createdAt: type.DATE,
      updatedAt: type.DATE},
      { sequelize, modelName: LevelLeaderboard},
      { sequelize, modelName: SavedLevel}

    )

  return Level;

};





