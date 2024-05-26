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
      Users.create({
        username: username,
      })
        .then((user) => {
          const user_id = user.dataValues.user_id;
          Quotes.create({
            quote: quote,
            user_id: user_id,
          });
        })
        .catch(async () => {
          const user = await Users.findOne({
            where: {
              username: username,
            },
          });
          Quotes.create({
            quote: quote,
            user_id: user.dataValues.user_id,
          });
        });

      return interaction.reply(
        `Quote successfully added. Quote is "${quote}" ~ ${username}`
      );
    } catch (error) {
      return interaction.reply(`Something went wrong. ${error}`);
    }
  },
};
