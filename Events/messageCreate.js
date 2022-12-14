const client = require("../index");
const db = require("../db");

client.on("messageCreate", async message => {
    if (
        message.author.bot ||
        (!message.guild && !message.channel.isDMBased()) ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    
    if (message.channel.isDMBased() && !command.dm) return;

    const client_user = await message.guild?.members.fetchMe()
    if (!message.channel.isDMBased() && !message.member.permissions.has(command.userPermissions || [])) return message.reply("You do not have permission to use this command!");
    if (!message.channel.isDMBased() && !client_user.permissions.has(command.botPermissions || [])) return message.reply("I do not have the required permission to use this command!");

    await command.execute(client, message, args, db);
});