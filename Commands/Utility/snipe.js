const { EmbedBuilder } = require('discord.js')
const { misc } = require('../../Utilities/emotes')
const moment = require('moment');
const trim = require('../../Models/trim')

module.exports = {
  name: 'snipe',
  aliases: [],
  description: 'Shows the deleted message(s) in a channel.',
	dm: false,
  execute: async (client, message, args, db) => {

		const err = (str) => {
			message.reply({
				embeds: [
						new EmbedBuilder()
							.setColor(0x2f3136)
							.setDescription(`${misc.catstanding} _${str}_`)
					]
			})
		}

    const snipes = client.snipes.get(message.channel.id)
    if (!snipes) return err('There are no deleted messages in this channel!')

    const snipe = +args[0] - 1 || 0;
    
    const target = snipes[snipe]
    if (!target) return err(`There are only ${snipes.length} deleted messages in this channel.`)

    const { msg, time, image } = target

		const emb = new EmbedBuilder()
					.setColor(0xb9d3ee)
					.setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
					.addFields(
						{ name: 'Message deleted' || '\u200b', value: trim(msg.content, 1024) || '\u200b' }
					)
					.setImage(image)
					.setFooter({ text: `${moment(time).fromNow()}  •  ${snipe + 1}/${snipes.length}` })

    message.reply({ embeds: [emb], allowedMentions: { repliedUser: false } })

  }
}