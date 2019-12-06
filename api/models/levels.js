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
      turns: {type: type.INTEGER, default: 5},
      scoreToBeat: {type: type.INTEGER, default: 15},
      dimensions: {type: type.INTEGER, default: 6},
      createdAt: type.DATE,
      updatedAt: type.DATE,
    })
};





