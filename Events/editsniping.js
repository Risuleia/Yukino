const client = require('../index');

  client.on('messageUpdate', (oldMessage, newMessage) => {

		oldMessage.fetch()
		newMessage.fetch()
		
		if (oldMessage.channel.isDMBased()) return console.log('a');
    
    if (newMessage.author.bot) return console.log('b');

    if (newMessage.embeds.length > 0) return console.log('c');
    
    let esnipes = client.esnipes.get(newMessage.channelId) || [];

    esnipes.unshift({
      newmsg: newMessage,
			oldmsg: oldMessage,
      image: newMessage.attachments.first()?.proxyURL || null,
      time: Date.now()
    });

    client.esnipes.set(newMessage.channelId, esnipes)
  })
