const placeholders = require("../../Models/placeholders")
const { lines, hearts } = require('../../Utilities/emotes')

module.exports = {
    name: "variables",
    aliases: ['vars', 'var'],
    description: "Shows all the available placeholders.",
    dm: false,
    execute: async (client, message, args, db) => {
        
        const ph = Object.keys(placeholders)
        const desc = ph.map(a => `‎‎‎‎‎‎‎‎ㅤ*\`{${a}}\`*`)

        const type_user = desc.filter(a => a.includes('user'))
        const type_server = desc.filter(a => a.includes('server'))
        const type_boost = desc.filter(a => a.includes('boost'))
        const type_channel = desc.filter(a => a.includes('channel') && !a.includes('server'))

        const emb = {
            color: 0x37393e,
            title: `_My Variables_ ${hearts.bubblegum}`,
            fields: [
                {
                    name: `${lines.pink}  User‛`,
                    value: type_user.join('\n'),
                    inline: true
                },
                {
                    name: `${lines.pink}  Server‛`,
                    value: type_server.join('\n'),
                    inline: true
                },
                {
                    name: `${lines.pink}  Boost‛`,
                    value: type_boost.join('\n'),
                    inline: true
                },
                {
                    name: `${lines.pink}  Channel‛`,
                    value: type_channel.join('\n'),
                    inline: true
                }
            ]
        }
        
        message.reply({
            embeds: [emb],
            allowedMentions: { repliedUser: false }
        })

    }
}