const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const Quotes = require("./models/Users.js")(sequelize, Sequelize.DataTypes);
const Users = require("./models/Quotes.js")(sequelize, Sequelize.DataTypes);

Users.belongsTo(Quotes, {
  foreignKey: {
    name: "user_id",
    type: DataTypes.UUID,
  },
});

module.exports = { Quotes, Users };
