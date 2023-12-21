import {ModalSubmitInteraction} from "discord.js";
import { generateKey, generateSalt, generatePassword, generateClient} from "../../../utils/crypto";
import { TokenRepository } from "../../../utils/tokenRepository";
import {IToken} from "../../../utils/sql"
const tokenRepository = new TokenRepository()
interface AppInfo {
  name: string,
  description: string,
  features: string
}
export const apiRequestModal: (interaction: ModalSubmitInteraction) => void =
  async (interaction) => {
    await interaction.deferReply({ephemeral: true});
    const app: AppInfo = {
      name: interaction.fields.getTextInputValue(`appName`) || `no.name`,
      description: interaction.fields.getTextInputValue(`appDescription`) || `no.description`,
      features: interaction.fields.getTextInputValue(`appFeatures`) || `no.features`,
    };
    const client = generateClient(app.name, interaction.user.id);
    const salt = generateSalt();
    const pass = generatePassword();
    const key = await generateKey(pass, salt);
    const credentials = <IToken>{};
    credentials.id = interaction.user.id;
    credentials.client = client;
    credentials.description = interaction.fields.getTextInputValue(`appDescription`);
    credentials.key = key;
    credentials.salt = salt;
    await tokenRepository.create(interaction.user.id, credentials)
    await interaction.editReply({
      content: `added api key for: `+app.name+`\n`+`Your key: ||${pass}||\nYour client: ||${client}||`,
    })
  }