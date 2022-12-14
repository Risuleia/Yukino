module.exports = {
    name: "purge",
    aliases: ['purge'],
    description: "Purges messages. Atmost, 100 message can be purged.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_MESSAGES'],
    dm: false,
    execute: async (client, message, args, db) => {
        
        if (!args || !args.length || !args.length < 0) return message.reply({
            embeds: [{
                color: 0xe6d0ce,
                description: 'pls specify the number of messages to delete',
            }]
        })

        const qty = args[0].toLowerCase() === 'max' ? 100 : parseInt(args[0])

        if (isNaN(qty) || qty < 0) return message.reply({
            embeds: [{
                color: 0xe6d0ce,
                description: 'pls specify a valid number (1 to 100) of messages to delete',
            }]
        })
        if (qty > 100) return message.reply({
            embeds: [{
                color: 0xe6d0ce,
                description: 'you can\'t delete more than 100 messages at a time. pls specify an quantity from 1 to 100',
            }]
        })

        try {
            
            message.delete()
            .then(m => {
                message.channel.bulkDelete(qty)
                    .then(deleted => {
                        m.channel.send({
                            embeds: [{
                                color: 0xabdefc,
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

        } catch (err) {
            throw err
        }
        

    }
}