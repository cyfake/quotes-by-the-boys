const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");
const { Users, Quotes } = require("../dbObjects.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Add a new quote")
    .setType(ApplicationCommandType.Message),
  async execute(interaction) {
    const quote = interaction.targetMessage.content;
    const username = interaction.targetMessage.author.username;
    try {
      await Users.create({
        username: username,
      });

      await Quotes.create({
        quote: quote,
      });
      interaction.reply(
        `Quote successfully added. Quote is "${quote}" ~ ${username}`
      );
      return console.log(`Quote successfully added. Quote is "${quote}"`);
    } catch (error) {
      return interaction.reply(`Something went wrong. ${error}`);
    }
  },
};
