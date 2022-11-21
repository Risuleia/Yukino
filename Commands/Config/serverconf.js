module.exports = {
    name: "serverconfig",
    aliases: ['serverconfig','config', 'conf'],
    description: "Shows and changes information related to the server configuration",
    usage: "[settings] <value>",
    userPermissions: ['ADMINISTRATOR'],
    execute: async (client, message, args, db) => {

        const role = async (prop) => {
            let guild = await client.guilds.cache.find(g => g.id === "879726321155051530")
            try {
                const r = await guild.roles.cache.find(f => f.id === prop)
                if (!r) return "_Not Set_"
                else return r.toString()
            } catch (error) {
                throw error
            }
        }
        const channel = async (prop) => {
            let guild = await client.guilds.cache.find(g => g.id === "879726321155051530")
            try {
                const c = await guild.channels.cache.find(f => f.id === prop)
                if (!c) return "_Not Set_"
                else return c.toString()
            } catch (error) {
                throw err
            }
        }

        const config = await db.get('serverconf')
        const admin = await role(config.admin)
        const headmod = await role(config.headmod)
        const mod = await role(config.mod)
        const tmod = await role(config.tmod)
        const pollmanager = await role(config.pollmanager)
        const headpm = await role(config.headpm)
        const pm = await role(config.pm)
        const uploader = await role(config.uploader)
        const muterole = await role(config.muterole)
        const announcements = await channel(config.announcements)
        const welcome = await channel(config.welcome)
        const boost = await channel(config.boost)
        const polls = await channel(config.polls)
        
        const desc = `╭  ˚₊  __Staff__\n │ Admin Role: ${admin}\n │ Head-Mod Role: ${headmod}\n │ Mod Role: ${mod}\n │ T-Mod Role: ${tmod}\n\n╭  ˚₊  __Roles__\n │ Head Partner Manager: ${headpm}\n │ Partnership Manager: ${pm}\n │ Poll Manager: ${pollmanager}\n │ Uploader: ${uploader}\n │ Mute-role: ${muterole}\n\n╭  ˚₊  __Channels__\n │ Announcements: ${announcements}\n │ Welcome: ${welcome}\n │ Boost: ${boost}\n │ Polls: ${polls}`
        
        const emb = {
            color: 0xabcedf,
            title: "Server Configuration",
            description: desc
        }

        message.channel.send({ embeds: [emb] })

    }
}