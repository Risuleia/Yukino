module.exports = {
  name: 'botauthor',
  aliases: ['botowner', 'author'],
  description: "Displays the creator of the bot and other credits.",
  dm: true,
  execute: async (client, message, args, db) => {

    const risu = await client.users.fetch("693623099710505041")
    const mimi = await client.users.fetch("800686782114693180")
    const content = `Created with ♡ by ${risu.toString()}!\nDebugged with assistance from ${mimi.toString()}!`

    const emb = {
      color: 0xe6d0ce,
      description: content
    }

    message.reply({
      embeds: [emb],
      allowedMentions: { repliedUser: false, users: false }
    })
  }
}