const { EmbedBuilder } = require('discord.js')
const { misc } = require('../../Utilities/emotes')

module.exports = {
    name: "purge",
    aliases: ['purge'],
    description: "Purges messages. Atmost, 100 message can be purged.",
    userPermissions: ['ManageMessages'],
    botPermissions: ['ManageMessages'],
    dm: false,
    execute: async (client, message, args, db) => {

				const err = (str) => {
					message.reply({
						embeds: [
								new EmbedBuilder()
									.setColor(0x2f3136)
									.setDescription(`${misc.catstanding} _${str}_`)
							]
					})
				}
        
        if (!args || !args.length || !args.length < 0) return err('Please specify the number of messages to delete.')

        const qty = args[0].toLowerCase() === 'max' ? 100 : parseInt(args[0])

        if (isNaN(qty) || qty < 0) return err('Please specify a valid number (1 to 100) of messages to delete.')
        if (qty > 100) return err('You can\'t delete more than 100 messages at a time. pls specify an quantity from 1 to 100.')

        try {
            
            message.delete()
            .then(m => {
                message.channel.bulkDelete(qty)
                    .then(deleted => {
                        m.channel.send({
                            embeds: [{
                                color: 0x2f3136,
                                description: `Deleted ${deleted.size} messages.`
                            }]
                        
                        })
                        .then(msg => {
                            setTimeout(() => {
                                msg.delete()
                            }, 5000)
													}
                        );
                    })
            })

        } catch (error) {
            return
        }
        

    }
}