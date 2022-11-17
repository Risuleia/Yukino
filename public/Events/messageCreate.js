const client = require("../index");
const Database = require("@replit/database");
const db = new Database();

client.on("messageCreate", async message => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    if (await !message.member.permissions.has(command.userPermissions || [])) return message.reply("You do not have permission to use this command!");
    if (await !message.guild.me.permissions.has(command.botPermissions || [])) return message.reply("I do not have the required permission to use this command!");

    await command.execute(client, message, args, db);
});