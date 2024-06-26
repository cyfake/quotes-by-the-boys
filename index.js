// Require the .env file with the Bot Token, Client ID and Guild ID
require("dotenv").config();

// Require modules to load command files
const fs = require("node:fs");
const path = require("node:path");

// Require database models
const { Users, Quotes } = require("./dbObjects.js");

// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require("discord.js");

// Create new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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

// Dynamic retrieval of events files
const eventsPath = path.join(__dirname, "events");
const eventsFolder = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventsFolder) {
  const filePath = path.join(eventsPath, file);
  const events = require(filePath);
  if (events.once) {
    client.once(events.name, (...args) => events.execute(...args));
  } else {
    client.on(events.name, (...args) => events.execute(...args));
  }
}

// Log into Discord with token
client.login(process.env.DISCORD_TOKEN);
