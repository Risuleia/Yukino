const { EmbedBuilder } = require('discord.js')
const { misc } = require('../../Utilities/emotes')

module.exports = {
  name: 'pin',
  aliases: [],
  description: "Pins the message the command is run in reply to.",
  userPermissions: ['ManageMessages'],
  botPermissions: ['ManageMessages'],
  dm: false,
  execute: async (client, message, args, db) => {

    if (!message.reference) return err("You need to reply to a message to pin it!")
		const pins = await message.channel?.messages?.fetchPinned()
		if (pins.size == 50) return err("This channel has reached the max number of pins.")
		
		message.channel.messages.pin(message.reference.messageId)
		message.delete()

  }
}