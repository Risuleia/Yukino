module.exports = {
  name: 'ping',
  aliases: [],
  description: "Used to check if the bot is alive or not.",
  execute: async (client, message, args, db) => {
    message.channel.send(`Pong!\n**Bot Latency:** ${Date.now() - message.createdTimestamp}ms\n**API Latency:** ${Math.round(client.ws.ping)}ms`)
  }
}