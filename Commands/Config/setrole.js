module.exports = {
    name: "setrole",
    aliases: ['setrol', 'setr'],
    description: "Sets a specific role for the server configuration.",
		userPermissions: ['ADMINISTRATOR'],
    execute: async (client, message, args, db) => {
        
        const chan = message.channel

        const param = ['admin', 'headmod', 'mod', 'tmod', 'pollmanager', 'pm', 'headpm', 'uploader', 'muterole']

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

        const regex = /^\d{18}$|^<@&\d{18}>$|^remove$/g
        const replacement = /<|@|&|>/g
        const match = setting.match(regex)
        if (!match) return chan.send({
            content: "not a valid option",
            reply: { messageReference: message.id }
        })

        const role = match[0]?.toLowerCase() === "remove" ? null : await message.guild.roles.cache.find(r => r.id === match[0]?.replace(replacement,""))

        const conf = await db.get('serverconf')
        const original = conf[arg]
        conf[arg] = role?.id
        await db.set('serverconf', conf)

        const headings = {
            admin: "Admin Role",
            headmod: "Head-Mod Role",
            mod: "Mod Role",
            tmod: "T-Mod Role",
            pollmanager: "Poll Manager",
            pm: "Partnership Manager",
            headpm: "Head Partner Manager",
            uploader: "Uploader",
            muterole: "Mute-role"
        }

        chan.send({
            embeds: [{
                color: 0xe6d0ce,
                title: headings[arg],
                description: `${!original ? "_None_" : await message.guild.roles.cache.find(r => r.id === original)?.toString()} → ${!role ? "_None_" : role?.toString()}`
            }]
        })

    }
}