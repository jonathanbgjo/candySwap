module.exports = (sequelize, type) => {
  var SavedLevel = sequelize.define('SavedLevel', {

    score: type.INTEGER,
    scoreToBeat: type.INTEGER,
    turns: type.INTEGER,
    grid: type.STRING,
    dimensions: type.INTEGER,
    createdAt: type.DATE,
    updatedAt: type.DATE,
  }
  )
  return SavedLevel;
};
