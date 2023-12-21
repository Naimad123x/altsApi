import {
  Collection,
  CommandInteraction,
  Message,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

export interface SlashCommand {
  data:
    SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
  run: (interaction: CommandInteraction) => Promise<void> | Promise<Message>;
}

export interface BotEvent {
  name: string,
  once?: boolean | false,
  execute: (...args) => void
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, SlashCommand>
  }
}