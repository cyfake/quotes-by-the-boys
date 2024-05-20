// Require the .env file with the Bot Token, Client ID and Guild ID
require("dotenv").config();

// Required modules to load command files
const fs = require("node:fs");
const path = require("node:path");

// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

// Create new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Log into Discord with token
client.login(process.env.DISCORD_TOKEN);

client.commands = new Collection();

// Dynamic retrieval of command files
const commandsFolderPath = path.join(__dirname, "commands");
const commandsFolder = fs.readdirSync(commandsFolderPath);

for (const file of commandsFolder) {
  const filePath = path.join(commandsFolderPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`
    );
  }
}

// Receive command interactions
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
});
