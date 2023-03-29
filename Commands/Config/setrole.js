const Regex = require("../../Models/regex")
const { EmbedBuilder } = require('discord.js')
const { misc, bounceheart, arrows } = require('../../Utilities/emotes')

module.exports = {
    name: "setrole",
    aliases: ['setrol', 'setr'],
    description: "Sets a specific role for the server configuration.",
		userPermissions: ['Administrator'],
		dm: false,
    execute: async (client, message, args, db) => {
        
        const chan = message.channel

        const param = ['admin', 'headmod', 'mod', 'tmod', 'pollmanager', 'pm', 'headpm', 'uploader', 'muterole']

				const err = (str) => {
					message.reply({
						embeds: [
								new EmbedBuilder()
									.setColor(0x2f3136)
									.setDescription(`${misc.catstanding} _${str}_`)
							]
					})
				}

        if (!args.length || args.length < 1) return err("Specify a parameter.")
        
        const arg = args[0]?.toLowerCase()
        if (!param.some(p => p === arg)) return err("Not a valid parameter.")

        const setting = args[1]?.toLowerCase()
        if (!setting) return err("Provide something to set.")

        const regex = Regex.role_specific
        const replacement = /<|@|&|>/g
        const match = setting.match(regex)
        if (!match) return err("Not a valid option.")

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
                color: 0x2f3136,
                title: headings[arg],
                description: `${bounceheart.pink} ${!original ? "_None_" : await message.guild.roles.cache.find(r => r.id === original)?.toString()} ${arrows.pink} ${!role ? "_None_" : role?.toString()}`
            }]
        })

    }
}