const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  aliases : ['h'],
  description: "Shows all available bot commands.",
  dm: true,
  execute: async (client, message, args, db) => {

    const client_user = await message.guild?.members?.fetchMe()
    const roleColor =
        !message.guild
        ? 0xffffff
        : client_user?.displayHexColor === "#000000"
        ? 0xffffff
        : client_user?.displayColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./Commands/").forEach((dir) => {
        const commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../Commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(", "),
        };

        categories.push(data);
      });

      const embed = {
          title: "Need help? Here are all of my commands:",
          fields: categories,
          description:
            `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`,
          footer: {
            text: `Requested by ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
          },
          timestamp: new Date(),
          color: roleColor
        }
      return message.channel.send({ embeds: [embed] });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new EmbedBuilder()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = {
        title: "Command Details:",
        fields: [
          {
            name: "PREFIX:", 
            value: `\`${prefix}\``
          },
          {
            name: "COMMAND:",
            value: command.name ? `\`${command.name}\`` : "No name for this command."
          },
          {
            name: "ALIASES:",
            value: command.aliases.length !== 0
              ? `\`${command.aliases.join("` `")}\``
              : "No aliases for this command."
          },
          {
            name: "USAGE:",
            value: command.usage
              ? `\`${prefix}${command.name} ${command.usage}\``
              : `\`${prefix}${command.name}\``
          },
          {
            name: "DESCRIPTION:",
            value: command.description
              ? command.description
              : "No description for this command."
          }
        ],
        footer: {
          text: `Requested by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true })
        },
        timestamp: new Date(),
        color: roleColor
      }
      return message.channel.send({ embeds: [embed] });
    }
  },
};