module.exports = {
    name: "serverconfig",
    aliases: ['serverconfig', 'serverconf', 'config', 'conf'],
    description: "Shows and changes information related to the server configuration",
    userPermissions: ['Administrator'],
		dm: false,
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
				const PREFIX = !config?.prefix ? client.config.prefix : config.prefix
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
        const modmail = await channel(config.modmail)
        const welcome_emb = config.welcome_emb ? config.welcome_emb : "_Not Set_"
        const boost_emb = config.boost_emb ? config.boost_emb : "_Not Set_"
        
        const desc = `  ˚₊  __General__\nPrefix: \`${PREFIX}\`\n\n  ˚₊  __Staff__\nAdmin Role: ${admin}\nHead-Mod Role: ${headmod}\nMod Role: ${mod}\nT-Mod Role: ${tmod}\n\n  ˚₊  __Roles__\nHead Partner Manager: ${headpm}\nPartnership Manager: ${pm}\nPoll Manager: ${pollmanager}\n Uploader: ${uploader}\nMute-role: ${muterole}\n\n  ˚₊  __Channels__\nAnnouncements: ${announcements}\nWelcome: ${welcome}\nBoost: ${boost}\nPolls: ${polls}\nModmail: ${modmail}\n\n  ˚₊  __Embeds__\nWelcome Embed: ${welcome_emb}\nBoost Embed: ${boost_emb}`
        
        const emb = {
            color: 0x2f3136,
            title: "Server Configuration",
            description: desc
        }

        message.channel.send({ embeds: [emb] })

    }
}