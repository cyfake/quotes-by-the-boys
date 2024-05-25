const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const Quotes = require("./models/Quotes.js")(sequelize, Sequelize.DataTypes);
const Users = require("./models/Users.js")(sequelize, Sequelize.DataTypes);

Quotes.belongsTo(Users, {
  foreignKey: {
    name: "user_id",
    type: DataTypes.UUID,
  },
});

Users.hasMany(Quotes, {
  foreignKey: {
    name: "user_id",
    type: DataTypes.UUID,
  },
});

const force = process.argv.includes("--force") || process.argv.includes("--f");

sequelize
  .authenticate()
  .then(async () => {
    await Users.sync({ force });
    await Quotes.sync({ force });
    console.log("All models were synchronised successfully.");

    sequelize.close();
  })
  .catch(console.error);
