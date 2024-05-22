const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Quotes",
    {
      quote_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      quote: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
