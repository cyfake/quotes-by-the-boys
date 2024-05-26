const { SlashCommandBuilder } = require("discord.js");
const { Users, Quotes } = require("../dbObjects.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomquote")
    .setDescription("Get a random quote."),
  async execute(interaction) {
    try {
      Quotes.findOne({
        order: sequelize.random(),
      }).then((res) => {
        const quote = res.quote;
        Users.findOne({
          where: {
            user_id: res.user_id,
          },
        }).then((res) => {
          const username = res.username;
          return interaction.reply(`"*${quote}*" ~**${username}**`);
        });
      });
    } catch (error) {
      return interaction.reply(`Something went wrong. ${error}`);
    }
  },
};
