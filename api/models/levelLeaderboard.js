module.exports = (sequelize, type) => {
  var LevelLeaderboard = sequelize.define('LevelLeaderboard', {
    score: type.INTEGER
  }
  )
  return LevelLeaderboard;
};
