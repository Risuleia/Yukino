const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const { hearts, butterflies, dots, misc } = require('../../Utilities/emotes.js')
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  aliases : ['h'],
  description: "Shows all available bot commands.",
  dm: true,
  execute: async (client, message, args, db) => {

    // const client_user = await message.guild?.members?.fetchMe()
    // const roleColor =
    //     !message.guild
    //     ? 0x2f3136
    //     : client_user?.displayHexColor === "#000000"
    //     ? 0x2f3136
    //     : client_user?.displayColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./Commands/").forEach((dir, index) => {
        const commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../Commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `_\`${name}\`_`;
        });

        let data = new Object();

				let emote = Object.keys(butterflies)[index]

        data = {
          name: `${butterflies[emote]} ⁏⁏ ${dir.toUpperCase()}`,
          value: cmds.length === 0 ? "In progress." : cmds.join(", "),
        };

        categories.push(data);
      });

      const embed = {
          title: `${hearts.strawberry}Require assistance? Here are my commands:`,
          fields: categories,
          description:
            `_Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`._`,
          footer: {
            text: `Requested by ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
          },
          timestamp: new Date(),
          color: 0x2f3136
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
          .setDescription(`${misc.catstanding} _Invalid command! Use \`${prefix}help\` for all of my commands!_`)
          .setColor("2f3136");
        return message.channel.send({ embeds: [embed] });
      }

      const embed = {
        title: "Command Details:",
        fields: [
          {
            name: dots.flower + "PREFIX:", 
            value: `\`${prefix}\``
          },
          {
            name: dots.flower + "COMMAND:",
            value: command.name ? `_\`${command.name}\`_` : "_No name for this command._"
          },
          {
            name: dots.flower + "ALIASES:",
            value: (command.aliases.length !== 0 && command.aliases[0] != command.name)
              ? `_\`${command.aliases.join("`, `")}\`_`
              : "_No aliases for this command._"
          },
          {
            name: dots.flower + "USAGE:",
            value: command.usage
              ? `_\`${prefix}${command.name} ${command.usage}\`_`
              : `_\`${prefix}${command.name}\`_`
          },
          {
            name: dots.flower + "DESCRIPTION:",
            value: command.description
              ? `_${command.description}_`
              : "_No description for this command._"
          }
        ],
        footer: {
          text: `Requested by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true })
        },
        timestamp: new Date(),
        color: 0x2f3136
      }
      return message.channel.send({ embeds: [embed] });
    }
  },
};