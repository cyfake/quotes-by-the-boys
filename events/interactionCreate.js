const { Events } = require("discord.js");

// Receive command interactions

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (
      interaction.isChatInputCommand() ||
      interaction.isMessageContextMenuCommand()
    ) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }
      try {
        await command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
