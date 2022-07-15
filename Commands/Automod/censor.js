module.exports = {
  name: 'censor',
  aliases: [],
  description: "Add/removes a specific word from the censor list. Displays the censor list if used with the 'list' parameter.",
  userPermissions: ['MANAGE_MESSAGES'],
  botPermissions: ['MANAGE_MESSAGES'],
  execute: async (client, message, args, db) => {

    const wordItem = args.slice(1,args.length).join(` `).toLowerCase();
    const acceptedParameters = ['+', '-', 'list'];
    
    if (!acceptedParameters.some(parameter => args[0] === parameter)) return message.reply("You didn't specify any parameters.");

    db.get('censored_words').then(words => {

      if (args[0] === '+') {

        if (args.length < 2) return message.reply("You need to specify something to censor.");

        if (words.some(word => wordItem === word)) return message.reply("That is already censored.");

        words.push(wordItem)
        db.set('censored_words', words)
        message.reply(`Added "${wordItem}" to censored list.`)

      }
      if (args[0] === '-') {

        if (args.length < 2) return message.reply("You need to specify something to uncensor.");

        if (!words.some(word => wordItem === word)) return message.reply("That is not censored.");

        const remove_index = words.findIndex(word => wordItem === word)
        words.splice(remove_index, 1)
        db.set('censored_words', words)
        message.reply(`Removed "${wordItem}" from censored list.`)

      }

      if (args[0] === 'list') {

        const word_list = `${words?.join('\n')}\n\u200b` || null

        const censoredWordEmbed = {
          color: 0xD4C2DD,
          title: `Censor List in ${message.guild.name}`,
          description: (word_list || word_list.length || word_list.length > 0) ? word_list : 'No censored words in this server.\n',
          footer: {
            text: client.user.tag,
            icon_url: client.user.displayAvatarURL()
          }
        }

        return message.reply({ embeds: [censoredWordEmbed], allowedMentions: { repliedUser: false } })
      }
    })
    
  }
}