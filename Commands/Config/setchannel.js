module.exports = {
    name: "setchannel",
    aliases: ['setchan', 'setc'],
    description: "Sets a specific channel for the server configuration.",
		userPermissions: ['ADMINISTRATOR'],
    execute: async (client, message, args, db) => {
        
        const chan = message.channel

        const param = ['announcements', 'welcome', 'boost', 'polls']

        if (!args.length || args.length < 1) return chan.send({
            content: "specify a parameter",
            reply: { messageReference: message.id }
        })
        
        const arg = args[0]?.toLowerCase()
        if (!param.some(p => p === arg)) return chan.send({
            content: "not a valid parameter",
            reply: { messageReference: message.id }
        })

        const setting = args[1]?.toLowerCase()
        if (!setting) return chan.send({
            content: "provide something to set",
            reply: { messageReference: message.id }
        })

        const regex = /^\d{18}$|^<#\d{18}>$|^remove$/g
        const replacement = /<|#|>/g
        const match = setting.match(regex)
        if (!match) return chan.send({
            content: "not a valid option",
            reply: { messageReference: message.id }
        })

        const channel = match[0]?.toLowerCase() === "remove" ? null : await message.guild.channels.cache.find(c => c.id === match[0]?.replace(replacement,""))

        const conf = await db.get('serverconf')
        const original = conf[arg]
        conf[arg] = channel?.id
        await db.set('serverconf', conf)

        const headings = {
            announcements: "Announcements",
            welcome: "Welcome",
            boost: "Boost",
            polls: "Polls"
        }

        chan.send({
            embeds: [{
                color: 0xe6d0ce,
                title: headings[arg],
                description: `${!original ? "_None_" : await message.guild.channels.cache.find(c => c.id === original)?.toString()} → ${!channel ? "_None_" : channel?.toString()}`
            }]
        })

    }
}