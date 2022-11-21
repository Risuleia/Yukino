const client = require("../index");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('i love mimi <333')
  client.user.setStatus('idle');
});