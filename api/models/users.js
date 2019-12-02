module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: " ",
    },
    email: Sequelize.STRING,
    password:{
      type: Sequelize.STRING,
      allowNull: true,
    },
    confirmPassword:{
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })
};

