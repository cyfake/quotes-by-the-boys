const { SlashCommandBuilder } = require("discord.js");
const { Quotes } = require("../dbObjects.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deletequote")
    .setDescription("Delete a quote.")
    .addStringOption((option) =>
      option
        .setName("quote")
        .setDescription("The exact quote to be deleted.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const quote = interaction.options.getString("quote");

    const quoteRemoved = await Quotes.destroy({ where: { quote: quote } });

    if (!quoteRemoved) return interaction.reply("Quote does not exist.");

    return interaction.reply({
      content: "Quote successfully deleted.",
      ephemeral: true,
    });
  },
};
