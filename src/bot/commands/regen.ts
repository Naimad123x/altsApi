import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType
} from "discord.js"
import { SlashCommand } from "../types";
import {createEmbed} from "../utils/func";

const row = new ActionRowBuilder<ButtonBuilder>()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('apirequest')
      .setLabel('api.request')
      .setStyle(ButtonStyle.Primary),
  );
export const regen: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("regen")
    .setDescription("regen messages")
    .addStringOption(option =>
      option
        .setName("query")
        .setDescription("what you want to regen")
        .addChoices(
          {
            name: `api request`,
            value: `api-request`,
          },
        )
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  run: async (interaction) => {
    await interaction.deferReply();
    const options: { [key: string]: string | number | boolean } = {};
    if (!interaction.options) return interaction.editReply({ content: "something went wrong..." });
    for (let i = 0; i < interaction.options.data.length; i++) {
      const element = interaction.options.data[i];
      if (element.name && element.value) options[element.name] = element.value;
    }
    if(options.query.toString() === `query`) {
      try {
        await interaction.deferReply({ephemeral: true});
        if (interaction.channel.type !== ChannelType.GuildText)
          return;
        await interaction.channel.send({
          embeds: [createEmbed(
            `To create api credentials for your application, ` +
            `click the button below`,
            {name: `api.request`})],
          components: [row]
        });
        return interaction.editReply({content: "message successfully sent."})
      } catch (error) {
        await interaction.editReply({content: "something went wrong..."});
      }
    }

  }
}