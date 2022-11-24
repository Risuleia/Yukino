const placeholders = require("../../Models/placeholders")

module.exports = {
    name: "placeholders",
    aliases: [],
    description: "Shows all the available placeholders.",
    execute: async (client, message, args, db) => {
        
        const ph = Object.keys(placeholders)
        const desc = ph.map(a => `  \`{${a}}\``)

        const type_user = desc.filter(a => a.includes('user'))
        const type_server = desc.filter(a => a.includes('server'))
        const type_boost = desc.filter(a => a.includes('boost'))
        const type_channel = desc.filter(a => a.includes('channel') && !a.includes('server'))

        const emb = {
            color: 0xabdecf,
            title: "Yukino's Placeholders",
            fields: [
                {
                    name: "─  ‚User‛﹒",
                    value: type_user.join('\n'),
                    inline: true
                },
                {
                    name: "─  ‚Server‛﹒",
                    value: `  ${type_server.join('\n')}`,
                    inline: true
                },
                {
                    name: "─  ‚Boost‛﹒",
                    value: `  ${type_boost.join('\n')}`,
                    inline: true
                },
                {
                    name: "─  ‚Channel‛﹒",
                    value: `  ${type_channel.join('\n')}`,
                    inline: true
                }
            ]
        }
        
        message.channel.send({
            embeds: [emb],
            reply: { messageReference: message.id },
            allowedMentions: { repliedUser: false }
        })

    }
}