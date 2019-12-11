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


// grid: {
//   type: type.STRING,
//   default: "red green blue yellow green green green red blue red red blue violet blue red green blue green yellow green violet blue violet red green blue red yellow red blue violet red violet blue green blue",
// },
// turns: {type: type.INTEGER, default: 5},
// scoreToBeat: {type: type.INTEGER, default: 15},
// score: {type: type.Integer, default: 15},
// dimensions: {type: type.INTEGER, default: 6},
