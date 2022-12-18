const { EmbedBuilder } = require('discord.js')
const moment = require('moment');

module.exports = {
  name: 'editsnipe',
  aliases: ['esnipe'],
  description: 'Shows the edited message(s) in a channel.',
	dm: false,
  execute: async (client, message, args, db) => {

    const esnipes = client.edit_snipes.get(message.channel.id);

    if (!esnipes) return message.reply('There are no edited messages in this channel!');

    const esnipe = +args[0] - 1 || 0;
    
    const target = esnipes[esnipe]
    if (!target) return message.reply(`There are only ${esnipes.length} deleted messages in this channel.`)

    const { newmsg, oldmsg, time, image } = target

		const emb = new EmbedBuilder()
					.setColor(0xb9d3ee)
					.setAuthor({ name: newmsg.author.tag, iconURL: newmsg.author.displayAvatarURL({ dynamic: true }) })
					.setFields([
						{ name: 'Message edited' || '\u200b', value: trim(newmsg.content) || '\u200b' },
						{ name: 'Original:' || '\u200b', value: trim(oldmsg.content) || '\u200b' }
					])
					.setImage(image)
					.setFooter({ text: `${moment(time).fromNow()}  •  ${esnipe + 1}/${esnipes.length}` })

    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })

  }
}