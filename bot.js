require("dotenv").config();

// Requiring discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");

// Create new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Initialisation
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log into Discord with token
client.login(process.env.DISCORD_TOKEN);
