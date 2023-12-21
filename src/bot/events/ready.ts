import { REST } from "@discordjs/rest";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v10";
import { CommandList } from "../commands/_CommandList";
import { Client } from "discord.js";

export const onReady = async (client: Client): Promise<void> => {
  try {
    const rest = new REST({version: "10"}).setToken(
      process.env.TOKEN as string
    );

    const commandData: {
      name: string;
      description?: string;
      type?: number;
      options?: APIApplicationCommandOption[];
    }[] = [];

    CommandList.forEach((command) =>
      commandData.push(
        command.data.toJSON() as {
          name: string;
          description?: string;
          type?: number;
          options?: APIApplicationCommandOption[];
        }
      )
    );
    await rest.put(
      Routes.applicationGuildCommands(
        client.user?.id || "missing token",
        "1079397130961174548"
      ),
      {body: commandData}
    );
    console.log(client.user.tag, "Bot has connected to Discord!");
  } catch (err) {
    console.log("onReady event", err);
  }
}