// Require the .env file with the Bot Token, Client ID and Guild ID
require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
// Grab all the command folders from the commands directory
const commandsFolderPath = path.join(__dirname, "commands");
const commandsFolder = fs.readdirSync(commandsFolderPath);

for (const file of commandsFolder) {
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  const filePath = path.join(commandsFolderPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.clientId,
        process.env.guildId
      ),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
