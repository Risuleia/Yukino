const { hearts, butterflies } = require('../../Utilities/emotes.js')

module.exports = {
  name: 'botauthor',
  aliases: ['botowner', 'author'],
  description: "Displays the creator of the bot and other credits.",
  dm: true,
  execute: async (client, message, args, db) => {

    const risu = await client.users.fetch("693623099710505041")
    const mimi = await client.users.fetch("800686782114693180")
    const content = `_Created with_${hearts.blueberry}_by_ ${risu.toString()} !\n_Debugged with assistance from _${mimi.toString()} ! ${butterflies.fuchsia}`

    const emb = {
      color: 0x2f3136,
      description: content
    }

    message.reply({
      embeds: [emb],
      allowedMentions: { repliedUser: false, users: false }
    })
  }
}