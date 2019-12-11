module.exports = (sequelize, type) => {
  var SavedLevel = sequelize.define('SavedLevel', {

    userScore: type.INTEGER,
    scoreToBeat: type.INTEGER,
    turnsLeft: type.INTEGER,
    grid: type.STRING,
    dimensions: type.INTEGER,
    createdAt: type.DATE,
    updatedAt: type.DATE,
  }
  )
  return SavedLevel;
};
