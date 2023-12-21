import { Interaction } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import {apiRequest} from "../interactions/buttons/apiRequest";
import {apiRequestModal} from "../interactions/modals/apiRequestModal";

export const onInteraction = async (
  interaction: Interaction
): Promise<void> => {
  try {
    if (interaction.isCommand()) {
      for (const Command of CommandList) {
        if (interaction.commandName === Command.data.name) {
          await Command.run(interaction);
          break;
        }
      }
    }
    else if(interaction.isButton()){
      await apiRequest(interaction)
    }
    else if (interaction.isModalSubmit()){
      await apiRequestModal(interaction)
    }
  } catch (err) {
    console.log("onInteraction event", err);
  }
};