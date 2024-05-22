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

const force = process.argv.includes("--force") || process.argv.includes("--f");

sequelize
  .sync({ force })
  .then(async () => {
    console.log("All models were synchronised successfully.");

    sequelize.close();
  })
  .catch(console.error);

module.exports = { Quotes, Users };
