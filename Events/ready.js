const client = require("../index");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`${client.config.prefix}help`, { type: 'WATCHING' });
  client.user.setStatus('idle');
});