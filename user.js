module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      role: {
          type: DataTypes.STRING,
          allowNull: false
      }
  });
  return User;
};
