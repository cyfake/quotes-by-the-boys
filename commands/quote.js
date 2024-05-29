const {
  SlashCommandBuilder,
  ApplicationCommandOptionWithChoicesMixin,
} = require("discord.js");
const { Users, Quotes } = require("../dbObjects.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Refer to a specific quote previously said by a user.")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to quote.")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("quote")
        .setDescription("The exact quote said.")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    const allUsers = await Users.findAll({ attributes: ["username"] });

    let choices;

    if (focusedOption.name === "user") {
      choices = allUsers.map((user) => user.username);
    }

    if (focusedOption.name === "quote") {
      let chosenUser = interaction.options.get("user")?.value;

      let user = await Users.findOne({ where: { username: chosenUser } });

      let userQuotes = await Quotes.findAll({
        where: {
          user_id: user.user_id,
        },
      });
      choices = userQuotes.map((userQuote) => userQuote.quote);
    }

    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedOption.value)
    );

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction) {
    const givenUsername = interaction.options.getString("user");
    const givenQuote = interaction.options.getString("quote");

    try {
      const username = await Users.findOne({
        where: { username: givenUsername },
      });
      const quote = await Quotes.findOne({ where: { quote: givenQuote } });

      await interaction.reply(`"*${quote.quote}*" ~**${username.username}**`);
    } catch (error) {
      return interaction.reply(`Something went wrong. ${error}`);
    }
  },
};
