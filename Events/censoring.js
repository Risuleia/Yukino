// const client = require('../index');
// const Database = require("@replit/database");
// const db = new Database();

// client.on('messageCreate', msg => {

// 	if (!db.get('censored_words')) return

//   db.get('censored_words').then(words => {
//     if (msg.author.bot) return
//     if (msg.content.startsWith(`${client.config.prefix}censor`)) return

//     if (words?.some(word => msg.content?.toLowerCase().includes(word))) {
//       msg.delete()
//         .catch((e) => console.log(e))
//     }
//   })

// })