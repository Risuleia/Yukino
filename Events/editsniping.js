const client = require('../index');

  client.on('messageUpdate', (oldMessage, newMessage) => {
    
    if (message.author.bot) return;

    if (message.embeds) return;
    
    let esnipes = client.edit_snipes.get(message.channel.id) || [];

    esnipes.unshift({
      newmsg: newMessage,
			oldmsg: oldMessage,
      image: message.attachments.first()?.proxyURL || null,
      time: Date.now()
    });

    client.edit_snipes.set(message.channel.id, esnipes)
  })