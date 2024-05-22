const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Users",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
