const Regex = require("../../Models/regex")
const { misc, bounceheart, arrows } = require('../../Utilities/emotes')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "setchannel",
    aliases: ['setchan', 'setc'],
    description: "Sets a specific channel for the server configuration.",
		userPermissions: ['Administrator'],
		dm: false,
    execute: async (client, message, args, db) => {
        
        const chan = message.channel

        const param = ['announcements', 'welcome', 'boost', 'polls', 'modmail']

				const err = (str) => {
					message.reply({
						embeds: [
								new EmbedBuilder()
									.setColor(0x2f3136)
									.setDescription(`${misc.catstanding} _${str}_`)
							]
					})
				}

        if (!args.length || args.length < 1) return err('Specify a paramater.')
        
        const arg = args[0]?.toLowerCase()
        if (!param.some(p => p === arg)) return err("Not a valid parameter.")

        const setting = args[1]?.toLowerCase()
        if (!setting) return err("Provide something to set.")
        
        const regex = Regex.channel_specific
        const replacement = /<|#|>/g
        const match = setting.match(regex)
        if (!match) return err("Not a valid option.")

        const channel = match[0]?.toLowerCase() === "remove" ? null : await message.guild.channels.cache.find(c => c.id === match[0]?.replace(replacement,""))

        const conf = await db.get('serverconf')
        const original = conf[arg]
        conf[arg] = channel?.id
        await db.set('serverconf', conf)

        const headings = {
            announcements: "Announcements",
            welcome: "Welcome",
            boost: "Boost",
            polls: "Polls",
            modmail: "Modmail"
        }

        chan.send({
            embeds: [{
                color: 0x2f3136,
                title: headings[arg],
                description: `${bounceheart.purple} ${!original ? "_None_" : await message.guild.channels.cache.find(c => c.id === original)?.toString()} ${arrows.pink} ${!channel ? "_None_" : channel?.toString()}`
            }]
        })

    }
}