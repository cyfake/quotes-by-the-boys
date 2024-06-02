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
    .setName("randomquoteby")
    .setDescription("Get a random quote said by a specific user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to quote.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const username = interaction.options.getUser("user").username;

    try {
      Users.findOne({ where: { username: username } }).then((res) => {
        Quotes.findOne({
          where: {
            user_id: res.user_id,
          },
          order: sequelize.random(),
        }).then((res) => {
          return interaction.reply(`"*${res.quote}*" ~**${username}**`);
        });
      });
    } catch (error) {
      return interaction.reply(`Something went wrong. ${error}`);
    }
  },
};
