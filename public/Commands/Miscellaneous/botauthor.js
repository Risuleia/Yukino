module.exports = {
  name: 'botauthor',
  aliases: ['botowner', 'author'],
  description: "Displays the creator of the bot and other credits.",
  execute: async (client, message, args, db) => {
    message.reply({ content: `Created with ♡ by Risuleia#0755!\nDebugged with assistance from mimi'#7777!`, allowedMentions: { repliedUser: false } })
  }
}