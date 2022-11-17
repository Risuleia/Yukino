module.exports = {
  name: 'pin',
  aliases: [],
  description: "Pins the message the command is run in reply to.",
  userPermissions: ['MANAGE_MESSAGES'],
  botPermissions: ['MANAGE_MESSAGES'],
  execute: async (client, message, args, db) => {

    if (!message.reference) {
      message.reply("You need to reply to a message to pin it!")
    } else {
      message.channel.messages.pin(message.reference.messageId)
      message.delete()
    }

  }
}