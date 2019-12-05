module.exports = (sequelize, type) => {
  return sequelize.define('level', {
    level_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    grid: {
      type: type.STRING,
      allowNull: true,
    },
    turns: {type: type.INTEGER, default: 10},
    scoreToBeat: {type: type.INTEGER, default: 50},
    createdAt: type.DATE,
    updatedAt: type.DATE,
  })
};

