const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("helloworld")
    .setDescription("Greets the world! Hello world!"),
  async execute(interaction) {
    await interaction.reply(
      `Hello world! This command was run by ${interaction.user.username}`
    );
  },
};
