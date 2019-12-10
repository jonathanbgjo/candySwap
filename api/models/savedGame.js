module.exports = (sequelize, type) => {
  return sequelize.define('savedGame', {
    savedGame_id: {
      type: type.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },

    grid: {
      type: type.STRING,
      default: "red green blue yellow green green green red blue red red blue violet blue red green blue green yellow green violet blue violet red green blue red yellow red blue violet red violet blue green blue",
    },
    turns: {type: type.INTEGER, default: 5},
    scoreToBeat: {type: type.INTEGER, default: 15},
    score: {type: type.Integer, default: 15},
    dimensions: {type: type.INTEGER, default: 6},
    createdAt: type.DATE,
    updatedAt: type.DATE,
  })
};





// level_id: {
//   type: type.INTEGER,
//   foreignKey: true,
// },
// level_id: {
//   type: type.INTEGER,
//   foreignKey: true,
// },
