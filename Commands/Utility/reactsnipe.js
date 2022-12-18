const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'reactsnipe',
  aliases: ['rsnipe'],
  description: 'Shows the added reactions in a channel.',
	dm: false,
  execute: async (client, message, args, db) => {

    const rsnipes = client.rsnipes.get(message.channel.id)
    if (!rsnipes) return message.reply('No reactions have been added in this channel!')

    const rsnipe = +args[0] - 1 || 0;
    
    const target = rsnipes[rsnipe]
    if (!target) return message.reply(`There are only ${rsnipes.length} reactions in this channel.`)

    const { msg, time, reaction, user } = target

		const emb = new EmbedBuilder()
					.setColor(0xb9d3ee)
					.setAuthor({
						name: `${user.username}#${user.discriminator}`,
						iconURL: user.displayAvatarURL({ dynamic: true }),
		        url: msg.url
					})
          .addFields(
            { name: 'Reaction added', value: reaction.toString() }
          )
					.setFooter({ text: `${moment(time).fromNow()}  •  ${rsnipe + 1}/${rsnipes.length}` })

    message.reply({ embeds: [emb], allowedMentions: { repliedUser: false } })

  }
}