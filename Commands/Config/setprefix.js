const Regex = require("../../Models/regex")
const { misc, bounceheart, arrows } = require('../../Utilities/emotes')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "setprefix",
    aliases: ['setpref', 'setp'],
    description: "Sets the bot prefix.",
		usage: "<prefix/'default'>",
		userPermissions: ['Administrator'],
		dm: false,
    execute: async (client, message, args, db) => {
        
        const chan = message.channel
				const DEFAULT = client.config.prefix

				const err = (str) => {
					message.reply({
						embeds: [
								new EmbedBuilder()
									.setColor(0x2f3136)
									.setDescription(`${misc.catstanding} _${str}_`)
							]
					})
				}
        
        if (!args.length || args.length < 1) return err("Provide something to set as the bot prefix.")
        const setting = args[0].toLowerCase() === 'default' ? DEFAULT : args[0]

        const conf = await db.get('serverconf')
        const original = conf['prefix']
        conf['prefix'] = setting
        await db.set('serverconf', conf)

        chan.send({
            embeds: [{
                color: 0x2f3136,
                title: "Prefix Changed",
                description: `${bounceheart.purple} _\`${!original ? DEFAULT : original}\`_ ${arrows.pink} _\`${setting}\`_`
            }]
        })

    }
}