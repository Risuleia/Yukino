const client = require('../index');

  client.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.channel.isDMBased()) return
    
    if (newMessage.author.bot) return;

    if (newMessage.embeds) return;
    
    let esnipes = client.esnipes.get(newMessage.channel.id) || [];

    esnipes.unshift({
      newmsg: newMessage,
			oldmsg: oldMessage,
      image: newMessage.attachments.first()?.proxyURL || null,
      time: Date.now()
    });

    client.enipes.set(message.channel.id, esnipes)
  })
