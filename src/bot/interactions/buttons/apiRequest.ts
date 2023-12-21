import {
  ActionRowBuilder,
  ButtonInteraction, ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";

const modal = new ModalBuilder()
  .setCustomId('apiRequest')
  .setTitle('api.request');

const appName = new TextInputBuilder()
  .setCustomId('appName')
  .setLabel("provide app.name")
  .setRequired(true)
  .setPlaceholder(`alt.finder`)
  .setStyle(TextInputStyle.Short);

const appDescription = new TextInputBuilder()
  .setCustomId('appDescription')
  .setRequired(true)
  .setLabel("provide app.description")
  .setMaxLength(2000)
  .setMinLength(250)
  .setStyle(TextInputStyle.Paragraph);

const appFeatures = new TextInputBuilder()
  .setCustomId('appFeatures')
  .setRequired(true)
  .setLabel("provide app.features")
  .setMaxLength(2000)
  .setMinLength(10)
  .setStyle(TextInputStyle.Paragraph);

const row1 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(appName);
const row2 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(appDescription);
const row3 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(appFeatures);
modal.addComponents(row1, row2, row3);

export const apiRequest: (interaction: ButtonInteraction) => void =
  async (interaction) => {
    await interaction.showModal(modal);
  }