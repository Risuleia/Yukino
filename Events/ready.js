const client = require("../index");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('mimi\'s server', { type: 'WATCHING' });
  client.user.setStatus('idle');
});