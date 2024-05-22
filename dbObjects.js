const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const Quotes = require("./models/Users.js")(sequelize, Sequelize.DataTypes);
const Users = require("./models/Quotes.js")(sequelize, Sequelize.DataTypes);

Users.hasOne(Quotes);
Quotes.belongsTo(Users, { foreignKey: "user_id", type: DataTypes.UUID });

module.exports = { Quotes, Users };
