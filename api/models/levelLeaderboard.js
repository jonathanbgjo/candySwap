module.exports = (sequelize, type) => {
  var LevelLeaderboard = sequelize.define('LevelLeaderboard', {
    score: type.INTEGER
  }
  )
  return LevelLeaderboard;
};





// level_id: {
//   type: type.INTEGER,
//   foreignKey: true,
// },
// level_id: {
//   type: type.INTEGER,
//   foreignKey: true,
// },
