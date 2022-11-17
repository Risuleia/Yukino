module.exports = {
  name: 'botauthor',
  aliases: ['botowner', 'author'],
  description: "Displays the creator of the bot and other credits.",
  execute: async (client, message, args, db) => {

    const risu = client.users.fetch("69362309971050501")
    const mimi = client.users.fetch("92756667385317391")

    message.reply({ 
      content: `Created with ♡ by ${risu.username}#${risu.discriminator}!\nDebugged with assistance from ${mimi.username}#${mimi.discriminator}!`,
      allowedMentions: { repliedUser: false }
    })
  }
}