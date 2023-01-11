const { EmbedBuilder } = require('discord.js')
const { misc } = require('../../Utilities/emotes')

module.exports = {
  name: 'unpin',
  aliases: [],
  description: "Unpins the message the command is run in reply to.",
  userPermissions: ['MANAGE_MESSAGES'],
  botPermissions: ['MANAGE_MESSAGES'],
  dm: false,
  execute: async (client, message, args, db) => {

    if (message.reference === null) {
      message.reply("You need to reply to a message to unpin it!")
    } else {
      message.channel.messages.unpin(message.reference.messageId)
      message.delete()
    }

  }
}