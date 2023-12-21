import { SlashCommandBuilder, TextChannel, EmbedBuilder, ColorResolvable, PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../types";

export const embed: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Create a new embed message.")
    .addStringOption(option =>
      option
        .setName("title")
        .setDescription("Title of the embed message")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("description")
        .setDescription("Description of the embed message.")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("color")
        .setDescription("Select an hex color, for example: #2B4C9B")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  run: async (interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const options: { [key: string]: string | number | boolean } = {};
      if (!interaction.options) return interaction.editReply({ content: "Something went wrong..." });
      for (let i = 0; i < interaction.options.data.length; i++) {
        const element = interaction.options.data[i];
        if (element.name && element.value) options[element.name] = element.value;
      }
      const embed = new EmbedBuilder()
        .setColor(options.color.toString() as ColorResolvable)
        .setTitle(options.title.toString())
        .setDescription(options.description.toString())
      const selectedTextChannel = interaction.channel as TextChannel
      await selectedTextChannel.send({embeds: [embed]});
      return interaction.editReply({ content: "Embed message successfully sent." })
    } catch (error) {
      await interaction.editReply({content: "Something went wrong..."});
    }

  }
}