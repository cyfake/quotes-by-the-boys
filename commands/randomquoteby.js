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
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to quote.")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const allUsers = await Users.findAll();

    const choices = allUsers.map((user) => user.username);

    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction) {
    const username = interaction.options.getString("user");

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
