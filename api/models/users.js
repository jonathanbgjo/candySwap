module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    user_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: type.STRING,
      allowNull: true,
      defaultValue: " ",
    },
    email: type.STRING,
    password:{
      type: type.STRING,
      allowNull: true,
      defaultValue: " ",
    },totalScore:{
      type: type.INTEGER,
      defaultValue: 0,
    },
    createdAt: type.DATE,
    updatedAt: type.DATE,
  })
};

